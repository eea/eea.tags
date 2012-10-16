""" Overrides default keywords widget
"""
from zope.interface import implements
from Products.CMFCore.utils import getToolByName
from archetypes.schemaextender.interfaces import ISchemaModifier

class SchemaModifier(object):
    """ EEA Tags keywords widget
    """
    implements(ISchemaModifier)

    def __init__(self, context):
        self.context = context

    def fiddle(self, schema):
        """ Modify schema
        """
        if 'subject' not in schema:
            return

        qtool = getToolByName(self.context, 'portal_quickinstaller', None)
        if not qtool:
            return

        if not qtool.isProductInstalled('eea.tags'):
            return

        xfield = schema['subject'].copy()
        xfield.widget.macro = 'eea.tags'
        xfield.widget.helper_js = ('++resource++eea.tags.js',)
        xfield.widget.helper_css = ('++resource++eea.tags.css',)
        schema['subject'] = xfield
