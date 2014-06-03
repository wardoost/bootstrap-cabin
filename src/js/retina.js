/* jQuery Retina Plugin with callback function */

( function( $ )
{
	'use strict';

	$.fn.retina = function( options )
	{
		var settings = {
			selector:		'img',
			// Check for data-retina attribute. If exists, swap out image
			dataRetina: false,
			// Suffix to append to image file name
			suffix: "@2x",
			// Retina classes
			retinaOnClass: 'retina-on',
			retinaOffClass: 'retina-off',
			// Check if image exists before swapping out
			checkIfImageExists: true,
			// Callback function if custom logic needs to be applied to image file name
			customFileNameCallback: "",
			// Callback function and parameters when all images are activated
			completeCallback: null,
			completeCallbackParameter: null,
			// Name of possible attribute with path to the retina image
			retinaDataAttr: 'data-retina'
		};

		if(options){
      jQuery.extend(settings,options);
    }

		isTargetValid = function( element )
		{
			return $( element ).prop( 'tagName' ).toLowerCase() == 'img';
		};

		console.log('langte: ' + $(selector).length);

		// Begin to iterate over the jQuery collection that the method was called on
    return this.each(function () {
      
      // Cache `this`
      var $this = $(this);
      
      if( !isTargetValid( this ) ) {

				if(window.devicePixelRatio > 1.2){

					var newImageSrc = '';

      		// Get data-retina attribute
      		if(settings.dataRetina && $obj.attr(settings.retinaDataAttr)){
      			newImageSrc = $obj.attr(settings.retinaDataAttr);
      		}
      		if(settings.suffix){
        	// If there is a data-retina attribute, suffix that. Otherwise, suffix the primary image
        		if(!newImageSrc){
        			newImageSrc = $obj.attr('src');
        		}
        	}

        	if(settings.suffix){
						// Get filename sans extension
						var baseFileName = newImageSrc.replace(/.[^.]+$/,'');
						var baseFileExtension = newImageSrc.replace(/^.*\./,'');

						newImageSrc = baseFileName + settings.suffix + '.' + baseFileExtension;
					}

					if(settings.customFileNameCallback){
						newImageSrc = settings.customFileNameCallback($obj);
					}

					$obj.addClass(settings.retinaOffClass);

					if(settings.checkIfImageExists && newImageSrc){
						$.ajax({url: newImageSrc, type: "HEAD", success: function() {
							$obj.attr('src',newImageSrc);
							$obj.removeClass(settings.retinaOffClass);
							$obj.addClass(settings.retinaOnClass);

							if($totalImgs - 1 == index && Modernizr.touch){
								if (typeof $callback == "function") settings.completeCallback(settings.completeCallbackParameter);
							}
						}});
					}else if(newImageSrc){
						$obj.attr('src',newImageSrc);
						$obj.removeClass(settings.retinaOffClass);
						$obj.addClass(settings.retinaOnClass);

						if($totalImgs - 1 == index && Modernizr.touch){
							if (typeof $callback == "function") settings.completeCallback(settings.completeCallbackParameter);
						}
					}
				} else if (completeCallback){
					if($totalImgs - 1 == index){
						if (typeof $callback == "function") settings.completeCallback(settings.completeCallbackParameter);
					}
				}
			}
	});
};
})( jQuery, window, document );