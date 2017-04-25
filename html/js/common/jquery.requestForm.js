// Generated by CoffeeScript 1.6.1
(function() {
  // 在chosen基础上添加添加tag样式的插件。未找到结果也可以添加选项
  $.fn.extend({
	  tagStyle: function(){
			
			// get the chosen object
		   var select = $(this);
		    var chosen = select.data('chosen');
		
		    // Bind the keyup event to the search box input
		    chosen.search_field.on('keyup', function(e)
		    {
		        // if we hit Enter and the results list is empty (no matches) add the option
		        if (e.which == 13 && chosen.dropdown.find('li.no-results').length > 0)
		        {
		            var option = $("<option>").val(this.value).text(this.value);
		           
		            // add the new option
		            select.append(option);
		            // automatically select it
		            select.find(option).prop('selected', true);
		            // trigger the update
		            select.trigger("liszt:updated");
		        }
		    });
	    
		}
  });

  $.fn.extend({
    requestForm: function(options) {
      var settings;
      settings = {
        currentWrapper: '',
        ajaxUrl: '',
        addRules: function() {
            return {};
        },
        afterRenderFunction: function() {
          return {};
        }
      };
      settings = $.extend(settings, options);
      return this.each(function() {
        var _this = this;
        return $(this).disable({
          ajaxUrl: options.ajaxUrl,
          enableOnAjaxComplete: true,
          ajaxData: {
            baseObjectId: $("#initialID").attr('value')
          },
          ajaxCallback: function(data) {
            var $page;
            $page = $(data);
            $page.appendTo("body");
            $page.modal('show').on('hidden', function() {
              return $page.remove();
            });
            $page.find('form').validate({
              submitHandler: function(form) {
                return $(form).ajaxSubmit({
                  type: 'POST',
                  data: {
                    baseObjectId: $("#initialID").attr('value')
                  },
                  success: function(data) {
                    addInfo_return(_this, data);
                    disable_restore();
                    return $page.modal('hide');
                  }
                });
              }
            });
            settings.addRules();
            return settings.afterRenderFunction();
          }
        });
      });
    }
  });

  $.fn.extend({
    simpleRequestForm: function(options) {
      var settings;
      settings = {
        currentWrapper: '',
        ajaxUrl: '',
        submitCallBack: function(data) {
          return window.location.reload();
        },
        addRules: function() {
          return {};
        },
        afterRenderFunction: function() {
          return {};
        }
      };
      settings = $.extend(settings, options);
      return this.each(function() {
        var _this = this;
        return $(this).disable({
          ajaxUrl: options.ajaxUrl,
          enableOnAjaxComplete: true,
          ajaxCallback: function(data) {
            var $page;
            $page = $(data);
            $page.appendTo("body");
            $page.modal('show').on('hidden', function() {
              return $page.remove();
            });
            $page.find('form').validate({
              submitHandler: function(form) {
                return $(form).ajaxSubmit({
                  type: 'POST',
                  success: function(data) {
                    settings.submitCallBack(data);
                    return $page.modal('hide');
                  }
                });
              }
            });
            settings.addRules();
            return settings.afterRenderFunction();
          }
        });
      });
    }
  });

}).call(this);