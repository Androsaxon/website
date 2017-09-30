(

  function init() {

    $(document).ready(function(){
      go(stickNav);
      go(scrollSmooth);
      go(enableFormValidate);
    });

    function stickNav() {
      $('.nav-wrapper').sticky({topSpacing:0});
    }

    function scrollSmooth() {
      $('.nav-wrapper a').smoothScroll();
    }

    function enableFormValidate() {
      $.validate();
    }

    function go(fn) {
      try {
        fn();
      } catch (e) {
        //
      }
    }
  }

)();
