""" Macros
"""
from Products.Five.browser import BrowserView
try:
    from zope.browserpage import viewpagetemplatefile
    ViewPageTemplateFile = viewpagetemplatefile.ViewPageTemplateFile
except ImportError:
    # BBB
    from zope.app.pagetemplate.viewpagetemplatefile import ViewPageTemplateFile

class Tags(BrowserView):
    """ EEA Tags macros
    """
    template = ViewPageTemplateFile('keywords.pt')

    __call__ = template

    def __getitem__(self, key):
        return self.template.macros[key]

    @property
    def macros(self):
        """ Template macros
        """
        return self.template.macros
