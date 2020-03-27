// function to create character counter

$(document).ready(function() {
  $('textArea').on('input', function() {
    let counter = 140 - $(this).val().length;

    const $form = $(this).parent().parent();

    const $counter = $('.counter', $form);

    $counter.text(counter);

    if (counter < 0) {
      $('.counter').addClass('counter-color');
    } else {
      $('.counter').removeClass('counter-color');
    }
  });
});
