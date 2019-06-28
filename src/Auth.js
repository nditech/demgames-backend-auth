// src/Auth/Auth.js
/* eslint no-restricted-globals: */
import auth0 from 'auth0-js';
//import jwtDecode from "jwt-decode";
import jwtDecode from 'jwt-decode';
const LOGIN_SUCCESS_PAGE="/game";
const LOGIN_FAILURE_PAGE="/";

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: 'dev-berhanu.auth0.com',
    clientID: 'ARTmPuBx9c06PNsE8zVAKeiFJnYis213',
    redirectUri: 'http://localhost:3000/callback',
    audience:'https://dev-berhanu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile email address'
  });

  constructor() {
    this.login = this.login.bind(this);
  }

  login() {
    this.auth0.authorize({
      prompt:'login'});
  }

  logout() {
    // Remove tokens and expiry time
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    location.pathname= LOGIN_FAILURE_PAGE;
  }

  signup(){
    //var newUser=1;
    this.auth0.signup({ 
        connection: 'berhanu-auth0-db-connection', 
        email: 'Berhanub@gmail.com', 
        password: null,
        username: null
    }, function (err) { 
       if (err) return alert('Something went wrong: ' + err.message); 
         return alert('success signup without login!') 
    });    
  }
  
  handleAuthentication(){
    this.auth0.parseHash((error, authResults)=>{
        if(authResults && authResults.accessToken && authResults.idToken){
          let expiresAt=JSON.stringify((authResults.expiresIn)*1000+new Date().getTime());
          localStorage.setItem("access_token", authResults.accessToken);
          localStorage.setItem("id_token",authResults.idToken);
          localStorage.setItem("expires_at", expiresAt);
          location.hash="";
          location.pathname=LOGIN_SUCCESS_PAGE;
        } else if (error){
          location.pathname=LOGIN_FAILURE_PAGE;
          console.log(error);
        }
    });
  }

  isAuthenticated(){
    let expiresAt=JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime()<expiresAt;
  }

  getProfile(){
    if(localStorage.getItem("id_token")){
      return jwtDecode(localStorage.getItem("id_token"));
    }
  }
}




