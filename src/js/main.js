(

  function init() {

    $(document).ready(function(){
      go(stickNav);
      go(scrollSmooth);
      go(enableFormValidate);
      go(enhanceForm);
    });

    function stickNav() {
      $('.nav-wrapper').sticky({topSpacing:0, zIndex:10000});
    }

    function scrollSmooth() {
      $('.nav-wrapper a').smoothScroll();
    }

    function enableFormValidate() {
      $.validate();
    }

    function enhanceForm() {
      var loader = $('#loader');
      $('#js').val(true);
      $('#contact-form')
        .submit(submitForm);

      function submitForm(event) {
        loader.show();
        event.preventDefault();
        var form=$(this);
        var formData=form.serialize()+'&submit=ok';
        return $.post(form.attr('action'), formData)
          .done(function() {
            form.remove();
            $('#success').show();
          }).fail(function() {
            form.remove();
            $('#error').show();
          }).always(function() {
            loader.hide();
          });
      }
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
