window.fbAsyncInit = function() {
    // Setup da SDK do Facebook
    FB.init({
      appId      : '629064844149855',
      cookie     : true,
      xfbml      : true, 
      version    : 'v2.8'
    });
    
    // Checar se o usuário está logado
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            getUserData();
        }
    });
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.11';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function facebookLogin() {
    FB.login(function (response) {
        if (response.authResponse) {
            getUserData();
        } else {
            document.getElementById('status').innerHTML = 'Processo de Log-in cancelado';
        }
    }, {scope: 'email'});
}

function getUserData(){
    FB.api('/me', {locale: 'en_US', fields: 'id,first_name,last_name,email,link,gender,locale,picture'},
    function (response) {
        document.getElementById('fbLink').setAttribute("onclick","facebookLogout()");
        document.getElementById('fbLink').innerHTML = '<span class="fa fa-facebook"></span> Sair';
        document.getElementById('status').innerHTML = 'Obrigado por logar, ' + response.first_name + '!';
        document.getElementById('userData').innerHTML = '<p><b>ID Facebook:</b> '+response.id+'</p><p><b>Nome:</b> '+response.first_name+' '+response.last_name+'</p><p><b>Email:</b> '+response.email+'</p><p><b>Genêro:</b> '+response.gender+'</p><p><b>Localização:</b> '+response.locale+'</p><p><b>Foto:</b> <img src="'+response.picture.data.url+'"/></p><p><b>Perfil do facebook:</b> <a target="_blank" href="'+response.link+'">click to view profile</a></p>';
    });
}

function facebookLogout() {
    FB.logout(function() {
        document.getElementById('fbLink').setAttribute("onclick","fbLogin()");
        document.getElementById('fbLink').innerHTML = '<span class="fa fa-facebook"></span> Log-in com Facebook';
        document.getElementById('status').innerHTML = 'Log-out realizado com sucesso.';
         document.getElementById('userData').innerHTML = '';
    });
}