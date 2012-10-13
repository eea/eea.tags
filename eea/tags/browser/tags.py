""" Tags
"""
import json
from zope.publisher.browser import BrowserView
#from redomino.autocompletetags.config import SELECT_SIZE

class QueryTags(BrowserView):
    """ Query all tags
    """
    def __call__(self):
        #query = self.request.get('q')
        fieldname = self.request.get('fieldname', 'subject').split('-')[-1]
        field = self.context.getField(fieldname)
        value = field.getAccessor(self.context)()
        allowed = self.context.collectKeywords(
            fieldname, field.accessor, field.widget.vocab_source)

        tags = {}
        tags['all'] = [{'id': item, 'name': item} for item in allowed]
        tags['selected'] = [{'id': item, 'name': item} for item in value]

        return json.dumps(tags)
