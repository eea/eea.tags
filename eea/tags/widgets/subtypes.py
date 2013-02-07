""" Overrides default keywords widget
"""
from zope.interface import implements
from archetypes.schemaextender.interfaces import ISchemaModifier, \
    IBrowserLayerAwareExtender
from eea.tags.browser.interfaces import IEEATagsLayer


class SchemaModifier(object):
    """ EEA Tags keywords widget
    """
    implements(ISchemaModifier, IBrowserLayerAwareExtender)
    layer = IEEATagsLayer

    def __init__(self, context):
        self.context = context

    def fiddle(self, schema):
        """ Modify schema
        """
        if 'subject' in schema:
            xfield = schema['subject']
            xfield.widget.macro = 'eea.tags'
            xfield.widget.helper_js = ('++resource++eea.tags.js',)
            xfield.widget.helper_css = ('++resource++eea.tags.css',)
