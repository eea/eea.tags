""" Testing
"""
from  plone.app.testing import PloneSandboxLayer
from  plone.app.testing import applyProfile
from  plone.app.testing import PLONE_FIXTURE
from  plone.app.testing import IntegrationTesting
from zope.configuration import xmlconfig

class EEATagsPolicy(PloneSandboxLayer):
    """ EEA Tags Testing Policy
    """
    defaultBases = (PLONE_FIXTURE,)

    def setUpZope(self, app, configurationContext):
        """ Setup Zope
        """
        import eea.tags
        xmlconfig.file('configure.zcml',
                       eea.tags,
                       context=configurationContext
                       )

    def setUpPloneSite(self, portal):
        """ Setup Plone
        """
        applyProfile(portal, 'eea.tags:default')

EEA_TAGS_FIXTURE = EEATagsPolicy()
EEA_TAGS_POLICY_INTEGRATION_TESTING = IntegrationTesting(
    bases=(EEA_TAGS_FIXTURE,),
    name="EEATags:Integration"
)
