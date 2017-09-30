(

  function init() {

    $(document).ready(function(){
      go(stickNav);
      go(scrollSmooth);
    });

    function stickNav() {
      $('.nav-wrapper').sticky({topSpacing:0});
    }

    function scrollSmooth() {
      $('.nav-wrapper a').smoothScroll();
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
