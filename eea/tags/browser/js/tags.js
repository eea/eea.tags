/* EEA Tags JS */

jQuery.fn.eeatags = function(options){
  var settings = {};
  return this.each(function(){

    if(options){
      jQuery.extend(settings, options);
    }

    var self = jQuery(this).addClass('eea-tags');
    self.wid = jQuery('[id*=keywords]', self).attr('id');

    self.prePopulate = [];
    var prePopulate = jQuery('select[name*=existing]', self);
    if(prePopulate.length){
      var selected = prePopulate.val();
      jQuery.each(selected !== null ? selected : [], function(index){
        var item = {id: this, name: this};
        self.prePopulate.push(item);
      });
    }else{
      prePopulate = jQuery('input[type=checkbox]:checked', self);
      jQuery.each(prePopulate, function(index){
        var context = jQuery(this);
        var item = {id: context.val(), name: context.val()};
        self.prePopulate.push(item);
      });
    }

    // Handle new tags
    prePopulate = jQuery('textarea[name*=_keywords]', self);
    if(prePopulate.length){
      prePopulate = prePopulate.val().split('\n');
      jQuery.each(prePopulate, function(index){
        var val = this.trim();
        if(val){
          var item = {id: val, name: val};
          self.prePopulate.push(item);
        }
      });
    }

    self.tags = [];
    var tags = jQuery('select[name*=existing]', self);
    if(tags.length){
      jQuery.each(jQuery('option', tags), function(index){
        var context = jQuery(this);
        var item = {id: context.val(), name: context.val()};
        self.tags.push(item);
      });
    }else{
      tags = jQuery('input[type=checkbox]', self);
      jQuery.each(tags, function(index){
        var context = jQuery(this);
        var item = {id: context.val(), name: context.val()};
        self.tags.push(item);
      });
    }

    // Cleanup
    jQuery('[name*=keywords]', self).parent().remove();
    jQuery('#existingTagsSection', self).remove();
    jQuery('#newTagsSection', self).remove();

    // Add new keywords widget
    self.widget = jQuery('<textarea>')
      .attr('rows', '4')
      .attr('id', self.wid)
      .attr('name', self.wid + ":lines").appendTo(self);

    self.widget.tokenInput(self.tags, {
      theme: 'facebook',
      allowNewTokens: true,
      tokenValue: 'name',
      tokenDelimiter: '\n',
      hintText: "Start typing to get some tags suggestions",
      searchingText: "Searching...",
      noResultsText: 'Tag not found. Press "Enter" to add it',
      preventDuplicates: true,
      prePopulate: self.prePopulate
    });

  });

};

jQuery(document).ready(function(){
  var widgets = jQuery('.ArchetypesKeywordWidget');
  if(!widgets.length){
    return;
  }

  widgets.eeatags();
});
