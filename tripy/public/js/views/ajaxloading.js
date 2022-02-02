$.ajaxSetup({
    beforeSend: function() {
       $('#general-ajax-load').fadeIn();
    },
    complete: function() {
       $('#general-ajax-load').fadeOut();
    },
    success: function() {
       $('#general-ajax-load').fadeOut();
    }
   });