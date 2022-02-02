AOS.init({
	duration : 800,
	easing : 'slide',
	once : false
});

jQuery(document)
		.ready(
				function($) {

					"use strict";

					var uAgent = navigator.userAgent.toLocaleLowerCase();
/*
					var s_uId = document.getElementById("s_id"), id;
					id = s_uId.getAttribute("data-prodnumber");

					var s_auth = document.getElementById("s_auth"), authority;
					authority = s_auth.getAttribute("data-prodnumber");
*/
					var mobilePhone = new Array('iphone', 'ipod', 'ipad',
							'android', 'blackberry', 'windows ce', 'nokia',
							'webos', 'opera mini', 'sonyericsson',
							'opera mobi', 'iemobile', 'windows phone');
					var isMobile = false;

					for (var i = 0; i < mobilePhone.length; ++i) {
						if (uAgent.indexOf(mobilePhone[i]) > -1) {
							isMobile = true;

							$('#col-20').prop('disable', true);
							
							
							break;
						}
					}

					if (isMobile) {
						$("#text-center admin_login").hide();
						$('h3.regular-font-size.text-uppercase.mb-3').hide();
						// 하단 검은 창
						$('.quick-contact-info.view').hide();
						$('#date-countdown-text').hide();
						$('#date-countdown').hide();
					}

					$("#nav-back").click(function(){
						history.back();
					});
					$(document).on('click', '.nav_meet_li', function () {
					if($(".hideMenu").css("display") == "none"){  
						$(".hideMenu").attr("style", "display : block !important"); 
					  }else{
						$(".hideMenu").attr("style", "display : none !important");
					  }
					});
					$(document).on('click', '.nav_dialry_li', function () {
						if($(".hideMenu2").css("display") == "none"){  
							$(".hideMenu2").attr("style", "display : block !important"); 
						  }else{
							$(".hideMenu2").attr("style", "display : none !important");
						  }
						});
						$(document).on('click', '.nav_profile_li', function () {
							if($(".hideMenu3").css("display") == "none"){  
								$(".hideMenu3").attr("style", "display : block !important"); 
							  }else{
								$(".hideMenu3").attr("style", "display : none !important");
							  }
							});

					Date.prototype.format = function(f) {
						if (!this.valueOf()) return " ";
					 
						var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
						var d = this;
						 
						return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
							switch ($1) {
								case "yyyy": return d.getFullYear();
								case "yy": return (d.getFullYear() % 1000).zf(2);
								case "MM": return (d.getMonth() + 1).zf(2);
								case "dd": return d.getDate().zf(2);
								case "E": return weekName[d.getDay()];
								case "HH": return d.getHours().zf(2);
								case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
								case "mm": return d.getMinutes().zf(2);
								case "ss": return d.getSeconds().zf(2);
								case "a/p": return d.getHours() < 12 ? "오전" : "오후";
								default: return $1;
							}
						});
					};
					 
					String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
					String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
					Number.prototype.zf = function(len){return this.toString().zf(len);};
					

					var siteMenuClone = function() {

						$('.js-clone-nav')
								.each(
										function() {
											var $this = $(this);
											$this.clone().attr('class',
													'site-nav-wrap').appendTo(
													'.site-mobile-menu-body');
											
										});

						setTimeout(
								function() {

									var counter = 0;
									$('.site-mobile-menu .has-children')
											.each(
													function() {
														var $this = $(this);

														$this
																.prepend('<span class="arrow-collapse collapsed">');

														$this
																.find(
																		'.arrow-collapse')
																.attr(
																		{
																			'data-toggle' : 'collapse',
																			'data-target' : '#collapseItem'
																					+ counter,
																		});

														$this
																.find('> ul')
																.attr(
																		{
																			'class' : 'collapse',
																			'id' : 'collapseItem'
																					+ counter,
																		});

														counter++;

													});

								}, 1000);

						$('body').on(
								'click',
								'.arrow-collapse',
								function(e) {
									var $this = $(this);
									if ($this.closest('li').find('.collapse')
											.hasClass('show')) {
										
										$this.removeClass('active');
									} else {
										$this.addClass('active');
									}

									e.preventDefault();

								});

						$(window).resize(function() {
							var $this = $(this), w = $this.width();

							if (w > 768) {
								if ($('body').hasClass('offcanvas-menu')) {
									$('body').removeClass('offcanvas-menu');
								}
							}
						})

						$('body').on('click', '.js-menu-toggle', function(e) {
							var $this = $(this);
							e.preventDefault();
							if ($('body').hasClass('offcanvas-menu')) {
								$('body').removeClass('offcanvas-menu');
								/*var scrollPosition = [
									  self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
									  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
									];*/
								var html = jQuery('html');
								var scrollPosition = html.data('scroll-position');
								html.css('overflow', html.data('previous-overflow'));
								window.scrollTo(0,0);
								//window.scrollTo(scrollPosition[0], scrollPosition[1]);
								$this.removeClass('active');
							} else {
								$('body').addClass('offcanvas-menu');
								$('html, body').animate({
					                scrollTop : 0
					            }, 400);
								/*var scrollPosition = [
									  self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
									  self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
									];*/
								var html = jQuery('html'); // it would make more sense to apply this to body, but IE7 won't have that
								html.data('scroll-position', scrollPosition);
								html.data('previous-overflow', html.css('overflow'));
								html.css('overflow', 'hidden');
								window.scrollTo(0,0);
								//window.scrollTo(scrollPosition[0], scrollPosition[1]);
								$this.addClass('active');
							}
						})

						// click outisde offcanvas
						$(document)
								.mouseup(
										function(e) {
											var container = $(".site-mobile-menu");
											if (!container.is(e.target)
													&& container.has(e.target).length === 0) {
												if ($('body').hasClass(
														'offcanvas-menu')) {
													$('body').removeClass(
															'offcanvas-menu');
													
															var html = jQuery('html');
															var scrollPosition = html.data('scroll-position');
															html.css('overflow', html.data('previous-overflow'));
															window.scrollTo(0, 0);
												}
											}
											
										});
					};
					siteMenuClone();

					var sitePlusMinus = function() {
						$('.js-btn-minus')
								.on(
										'click',
										function(e) {
											e.preventDefault();
											if ($(this).closest('.input-group')
													.find('.form-control')
													.val() != 0) {
												$(this)
														.closest('.input-group')
														.find('.form-control')
														.val(
																parseInt($(this)
																		.closest(
																				'.input-group')
																		.find(
																				'.form-control')
																		.val()) - 1);
											} else {
												$(this).closest('.input-group')
														.find('.form-control')
														.val(parseInt(0));
											}
										});
						$('.js-btn-plus')
								.on(
										'click',
										function(e) {
											e.preventDefault();
											$(this)
													.closest('.input-group')
													.find('.form-control')
													.val(
															parseInt($(this)
																	.closest(
																			'.input-group')
																	.find(
																			'.form-control')
																	.val()) + 1);
										});
					};
					// sitePlusMinus();

					var siteSliderRange = function() {
						$("#slider-range").slider(
								{
									range : true,
									min : 0,
									max : 500,
									values : [ 75, 300 ],
									slide : function(event, ui) {
										$("#amount").val(
												"$" + ui.values[0] + " - $"
														+ ui.values[1]);
									}
								});
						$("#amount").val(
								"$"
										+ $("#slider-range")
												.slider("values", 0)
										+ " - $"
										+ $("#slider-range")
												.slider("values", 1));
					};
					// siteSliderRange();

					var siteMagnificPopup = function() {
						$('.image-popup').magnificPopup({
							type : 'image',
							closeOnContentClick : true,
							closeBtnInside : false,
							fixedContentPos : true,
							mainClass : 'mfp-no-margins mfp-with-zoom', // class
							// to
							// remove
							// default
							// margin
							// from
							// left
							// and
							// right
							// side
							gallery : {
								enabled : true,
								navigateByImgClick : true,
								preload : [ 0, 1 ]
							// Will preload 0 - before current, and 1 after the
							// current image
							},
							image : {
								verticalFit : true
							},
							zoom : {
								enabled : true,
								duration : 300
							// don't foget to change the duration also in CSS
							}
						});

						$('.popup-youtube, .popup-vimeo, .popup-gmaps')
								.magnificPopup({
									disableOn : 0,
									type : 'iframe',
									mainClass : 'mfp-fade',
									removalDelay : 160,
									preloader : false,

									fixedContentPos : false
								});
					};
					siteMagnificPopup();

					var siteCarousel = function() {
						if ($('.nonloop-block-13').length > 0) {
							$('.nonloop-block-13')
									.owlCarousel(
											{
												center : false,
												items : 1,
												loop : true,
												stagePadding : 0,
												autoplay : true,
												margin : 20,
												nav : true,
												dots : true,
												navText : [
														'<span class="icon-arrow_back">',
														'<span class="icon-arrow_forward">' ],
												responsive : {
													600 : {
														margin : 20,
														stagePadding : 0,
														items : 1
													},
													1000 : {
														margin : 20,
														stagePadding : 0,
														items : 2
													},
													1200 : {
														margin : 20,
														stagePadding : 0,
														items : 3
													}
												}
											});
						}

						if ($('.nonloop-block-14').length > 0) {
							$('.nonloop-block-14')
									.owlCarousel(
											{
												center : false,
												items : 1,
												loop : true,
												stagePadding : 0,
												autoplay : true,
												margin : 20,
												nav : true,
												dots : true,
												navText : [
														'<span class="icon-arrow_back">',
														'<span class="icon-arrow_forward">' ],
												responsive : {
													600 : {
														margin : 20,
														stagePadding : 0,
														items : 1
													},
													1000 : {
														margin : 20,
														stagePadding : 0,
														items : 2
													}

												}
											});
						}

						if ($('.nonloop-block-15').length > 0) {
							$('.nonloop-block-15')
									.owlCarousel(
											{
												center : false,
												items : 1,
												loop : true,
												stagePadding : 0,
												autoplay : true,
												margin : 20,
												nav : true,
												dots : true,
												navText : [
														'<span class="icon-arrow_back">',
														'<span class="icon-arrow_forward">' ],
												responsive : {
													600 : {
														margin : 20,
														stagePadding : 0,
														items : 1,
														nav : false,
														dots : true
													},
													1000 : {
														margin : 20,
														stagePadding : 0,
														items : 2,
														nav : true,
														dots : true
													},
													1200 : {
														margin : 20,
														stagePadding : 0,
														items : 3,
														nav : true,
														dots : true
													}
												}
											});
						}

						if ($('.slide-one-item').length > 0) {
							$('.slide-one-item')
									.owlCarousel(
											{
												center : false,
												items : 1,
												loop : true,
												stagePadding : 0,
												margin : 0,
												autoplay : true,
												pauseOnHover : false,
												animateOut : 'fadeOut',
												animateIn : 'fadeIn',
												nav : true,
												navText : [
														'<span class="icon-arrow_back">',
														'<span class="icon-arrow_forward">' ]
											});
						}
					};
					siteCarousel();

					var siteStellar = function() {
						$(window).stellar({
							responsive : false,
							parallaxBackgrounds : true,
							parallaxElements : true,
							horizontalScrolling : false,
							hideDistantElements : false,
							scrollProperty : 'scroll'
						});
					};
					siteStellar();

					var siteDatePicker = function() {

						if ($('.datepicker').length > 0) {
							$('.datepicker').datepicker();
						}

					};
					siteDatePicker();

					var windowScrolled = function() {

						$(window)
								.scroll(
										function() {

											var $w = $(this), st = $w
													.scrollTop(), navbar = $('.js-site-navbar');

											if (st > 100) {
												navbar.addClass('scrolled');
											} else {
												navbar.removeClass('scrolled');
											}

										})

					}
					windowScrolled();

				});