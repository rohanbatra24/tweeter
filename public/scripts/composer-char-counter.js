$(document).ready(function() {
  // --- our code goes here ---

  // $('textArea').on('change', (event) => {
  //   console.log(event.type);
  // });

  // $('textArea').on('keydown', function() {
  //   console.log(event.type); //The this keyword is a reference to the button
  // });

  // $('textArea').on('keyup', function() {
  //   console.log(event.type); //The this keyword is a reference to the button
  // });

  // $('textArea').on('blur', function() {
  //   console.log(event.type); //The this keyword is a reference to the button
  // });

  $('textArea').on('keyup', function() {
    let counter = 140 - $(this).val().length;
    $(this).parent().siblings()[1].innerHTML = counter;
    if ($(this).parent().siblings()[1].innerHTML <= 0) {
      $('.counter').addClass('counter-color');
    } else {
      $('.counter').removeClass('counter-color');
    }
  });
});

// can we combine js and jquery
// this keyword
// does all logic have to be inside one callback?
// best way to apply css in this case
// name positioning on main page
