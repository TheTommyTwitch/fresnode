$(document).ready(function() {
  var $postButton = $('.postButton');
  $postButton.on('click', function() {
    $('#overlay').css('visibility', 'visible');
  });

  var $nevermindButton = $('.nevermindButton');
  $nevermindButton.on('click', function() {
    $('#overlay').css('visibility', 'hidden');
  });
});
