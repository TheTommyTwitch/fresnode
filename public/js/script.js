$(document).ready(function() {
  var $postButton = $('.postButton');
  $postButton.on('click', function() {
    $('#overlay').css('visibility', 'visible');
  });

  var $nevermindButton = $('.nevermindButton');
  $nevermindButton.on('click', function() {
    $('#overlay').css('visibility', 'hidden');
  });


  //Firebase setup --------------------------------------
  //Put messages into database
  var user = '';
  var date = Date.now();
  var myFirebaseRef = new Firebase("https://fresnode.firebaseio.com/");
  $('#submitButton').on('click', function(e) {
    myFirebaseRef.push({
      name: user,
      message: document.querySelector('#textContent').value,
      time: date
    });
    $('#overlay').css('visibility', 'hidden');
    $('.textContent').value = '';
  });

  //Get data from database and append to page
  myFirebaseRef.on("value", function(snapshot) {
    var data = snapshot.val();
    for (var i = 0; i < data.length; i++) {
      var name = data[i].name;
      var message = data[i].message;
      createPostElements(name, message);
    }
  });

  // Facebook Auth -------------------------------------
  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
      $('.loginDiv').hide();


    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
      $postButton.hide();
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
      $postButton.hide();
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId: '1168535836494565',
      cookie: true, // enable cookies to allow the server to access
      // the session
      xfbml: true, // parse social plugins on this page
      version: 'v2.2' // use version 2.2
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      user = response.name;
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }
});

//functions to create dom elements for the posts

var createPostElements = function(name, message) {
  var container = document.querySelector('.container');
  var postBody = document.querySelector('.postBody');
  var post = document.createElement('div');
  post.className = 'post';
  postBody.appendChild(post);

  var postDiv = document.createElement('div');
  postDiv.className = 'newPost';
  post.appendChild(postDiv);

  var nameText = document.createElement('div');
  nameText.className = 'nameText';
  post.appendChild(nameText);
  var nameP = document.createElement('p');
  nameText.appendChild(nameP);
  nameP.innerHTML = 'Posted By: ' + name;

  var newPost = post.appendChild(postDiv);
  postText = document.createElement('p');
  postText.className = 'postText';
  newPost.appendChild(postText);
  postText.innerHTML = message;
};
