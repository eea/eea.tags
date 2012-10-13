/* EEA Tags JS */
if(!window.EEA){
  var EEA = {'version': 'eea.tags'};
}

EEA.Tags = function(context, options){
  var self = this;
  self.context = context;

  self.settings = {
    'base_url': ''
  };

  if(options){
    jQuery.extend(self.settings, options);
  }

  self.initialize();
};

EEA.Tags.prototype = {
  initialize: function(){
    var self = this;
    self.allowNewTokens = false;
    self.tags = [];
    self.wid = 'subject_keywords';

    var new_keywords = jQuery('[id*=keywords]', self.context);
    if(new_keywords.length){
        self.wid = new_keywords.attr('id');
        self.allowNewTokens = true;
    }

    var fieldname = self.wid.split('_')[0];
    jQuery.getJSON(self.settings.base_url + 'eea.tags.json', {fieldname: fieldname}, function(data){
      self.update(data);
    });

  },

  update: function(tags){
    var self = this;
    self.tags = tags['all'];
    var existingTags = [];

    // Handle new tags
    prePopulate = jQuery('textarea[name*=_keywords]', self.context);
    if(prePopulate.length){
      prePopulate = prePopulate.val().split('\n');
      jQuery.each(prePopulate, function(index){
        var val = this.trim();
        if(val && jQuery.inArray(val, existingTags) === -1){
          existingTags.push(val);
        }
      });
    }

    self.prePopulate = jQuery.map(existingTags, function(val, idx){
      return {id: val, name: val};
    });

    // Cleanup
    jQuery('[name*=keywords]', self.context).parent().remove();
    jQuery('#existingTagsSection', self.context).remove();
    jQuery('#newTagsSection', self.context).remove();

    // Add new keywords widget
    self.widget = jQuery('<textarea>')
      .attr('rows', '4')
      .attr('id', self.wid)
      .attr('name', self.wid + ":lines").appendTo(self.context);

    self.widget.tokenInput(self.tags, {
      theme: 'facebook',
      allowNewTokens: self.allowNewTokens,
      tokenValue: 'name',
      tokenDelimiter: '\n',
      hintText: "Start typing to get some tags suggestions",
      searchingText: "Searching...",
      noResultsText: self.noResultsText,
      preventDuplicates: true,
      prePopulate: self.prePopulate
    });

  }
};

// eeatags jQuery plugin
jQuery.fn.eeatags = function(options){
  options = options || {};
  return this.each(function(){
    var context = jQuery(this);
    var base_url = jQuery('.baseUrl');
    if(base_url.length){
      options['base_url'] = base_url.text() + '/';
    }
    var tags = new EEA.Tags(context, options);
    context.data('EEATags', tags);
  });
};

// On document ready
jQuery(document).ready(function(){
  var widgets = jQuery('.ArchetypesKeywordWidget');
  if(!widgets.length){
    return;
  }

  widgets.eeatags();
});
