""" Keywords widget
"""
from Products.Archetypes.Widget import KeywordWidget

class TagsWidget(KeywordWidget):
    """ Tags Widget
    """
    _properties = KeywordWidget._properties.copy()
    _properties.update({
        'macro' : "eea.tags",
        'helper_js': ('++resource++eea.tags.js',),
        'helper_css': ('++resource++eea.tags.css',),
    })
