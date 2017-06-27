var setIntervalWithContext = function(code,delay,context){
 return setInterval(function(){
  code.call(context)
 },delay) 
}



function SlideUpper(image, config) {
	
	this.image = image;
	this.numOfSlices = config.numOfSlices;
	this.vertical = config.vertical;
	this.isVertical = false;
	this.currentOffSet = 0;
	this.offSet = 0;
	
	this.width = image.width;
	this.height = image.height;
	this.offSet = this.height / this.numOfSlices;

	this.slideUp = function() {
		this.currentOffSet = this.currentOffSet + this.offSet;
		if (this.currentOffSet >= this.height)
			this.currentOffSet = 0;
		
		var cssStr = "-" + this.currentOffSet + "px";
		$(this.image).parent(".content").css("top", cssStr);
		
	}
	
	this.doWork = function() {
		return setIntervalWithContext(this.slideUp, 500, this);
	}
	
}


(function ( $ ) {
	$.fn.slideup = function(config) {
		
		var cfg = { 
			fadeInDelay: 5000, 
			fadeOutDelay: 2000,
			nextImageDelay: 10000,
			showMethod: 'fadeIn',
			hideMethod: 'slideUp'
		}
		
		if (config) {
			cfg = config;
		}
		
		this.each( function() {
			var imageArr = $(this).find('img');
			if (imageArr) {
				
				imageArr.each( function() {
					var work;
					var su;
					$(this).wrap("<div class='container'><div class='content'></div></div>");
					$(this).mouseover(function(){
						//$(this).parent(".content").css("top", "-300px");
						if (!su) {
							su = new SlideUpper(this, { numOfSlices : 20, vertical: true });
						}
						work = su.doWork();
					});
					
					$(this).mouseout(function(){
						clearInterval(work);
					});
				});
		
			}
		});
	}
}( jQuery ));
