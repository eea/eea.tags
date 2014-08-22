/* EEA Tags JS */
if(!window.EEA){
  var EEA = {'version': 'eea.tags'};
}

EEA.Tags = function(context, options){
  var self = this;
  self.context = context;

  self.settings = {
    baseUrl: '',
    tokenDelimiter: "\n",
    hintText: "Start typing to get some tags suggestions",
    searchingText: "Searching...",
    noResultsText: "No results"
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
    jQuery.getJSON(self.settings.baseUrl + 'eea.tags.json', {fieldname: fieldname}, function(data){
      self.update(data);
    });

  },

  update: function(tags){
    var self = this;
    self.tags = tags.all;
    var existingTags = [];

    // Handle new tags
    var prePopulate = jQuery('textarea[name*=_keywords]', self.context);
    if(prePopulate.length){
      prePopulate = prePopulate.val().split('\n');
      jQuery.each(prePopulate, function(index){
        var val = jQuery.trim(this);
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
      .attr('name', self.wid + ":lines")
      .val(existingTags.join('\n'))
      .appendTo(self.context);

    self.widget.tokenInput(self.tags, {
      theme: 'facebook',
      allowNewTokens: self.allowNewTokens,
      tokenValue: 'name',
      tokenDelimiter: self.settings.tokenDelimiter,
      hintText: self.settings.hintText,
      searchingText: self.settings.searchingText,
      noResultsText: self.settings.noResultsText,
      preventDuplicates: true,
      prePopulate: self.prePopulate,
      onAdd: function(item) {
        var context = self.widget[0];
          var current_tags = context.value.split('\n');
          var new_tag_name = item.name;
          if (current_tags.indexOf(new_tag_name) === -1) {
              context.value += "\n" + new_tag_name;
          }
      },
      onDelete: function(item) {
          var context = self.widget[0];
          var tokens = context.value.split('\n');
          var item_name = item.name;
          var i, length, token, output = [];
          for (i = 0, length = tokens.length; i < length; i += 1) {
              token = tokens[i];
              if (token !== item_name) {
                output.push(token);
              }
          }
          context.value = output.join('\n');
      }
    });

  }
};

// eeatags jQuery plugin
jQuery.fn.eeatags = function(options){
  options = options || {};
  return this.each(function(){
    var context = jQuery(this).addClass('eea-tags');

    var config = {};
    if(options){
      jQuery.extend(config, options);
    }

    var messages = jQuery('.eea-tags-i18n', context);
    config.baseUrl = jQuery('.baseUrl', messages).text();
    config.hintText = jQuery('.hintText', messages).text();
    config.searchingText = jQuery('.searchingText', messages).text();
    config.noResultsText = jQuery('.noResultsText', messages).text();

    var tags = new EEA.Tags(context, config);
    context.data('EEATags', tags);
  });
};

// On document ready
jQuery(document).ready(function(){
  var widgets = jQuery('.ArchetypesKeywordWidget, .ArchetypesTagsWidget');
  if(!widgets.length){
    return;
  }

  widgets.eeatags();
});
