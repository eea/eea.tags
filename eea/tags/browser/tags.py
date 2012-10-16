""" Tags
"""
import json
from zope.publisher.browser import BrowserView

class QueryTags(BrowserView):
    """ Allowed/selected tags
    """
    def __call__(self):
        tags = {'all': [], 'selected': []}

        fieldname = self.request.get('fieldname', 'subject')
        field = self.context.getField(fieldname)
        if not field:
            return json.dumps(tags)

        value = field.getAccessor(self.context)()
        allowed = self.context.collectKeywords(
            fieldname, field.accessor, field.widget.vocab_source)


        tags['all'] = [{'id': allow, 'name': allow} for allow in allowed]
        tags['selected'] = [{'id': item, 'name': item} for item in value]

        return json.dumps(tags)
