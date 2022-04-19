
window.fbAsyncInit = function () {
  FB.init({
    appId: '549168336541671',
    cookie: true,
    xfbml: true,
    version: 'v10.0'
  });

  FB.AppEvents.logPageView();

};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) { return; }
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkLoginState() {
  FB.login(function (response) {
    // console.log(response.authResponse.userID);
    if (response.status === 'connected') {
      console.log('connected');

      facebookLogin()
    }
  }, { scope: 'email' });
}

function facebookLogin() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
  console.log('Welcome!  Fetching your information.... ');
  FB.api(
    '/me',
    'GET',
    { "fields": "id,email,first_name,last_name,picture" },
    function (response) {
      // Insert your code here
      if (response) {
        console.log('getting facebook info successfully')
        console.log('facebook_id: '+response.id)
        console.log('email: '+response.email)
        console.log('firstName: '+response.first_name)
        console.log('lastName: '+response.last_name)
        FB.api(
          "/me/friendlists",
          function (response1) {
            if (response1 && !response1.error) {
              console.log('firends list: '+response1)

            }
          }
      );
      }
    }
  );
}
