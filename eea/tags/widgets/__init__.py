""" Custom AT widgets
"""
from Products.Archetypes.Registry import registerWidget
from eea.tags.widgets.keywords import TagsWidget

def register():
    """ Register custom AT widgets
    """
    registerWidget(
        TagsWidget,
        title='EEA Tags',
        description=('A Google+/Facebook like replacement '
                     'for the Plone keywords widget'),
        used_for=('Products.Archetypes.Field.LinesField',)
    )
