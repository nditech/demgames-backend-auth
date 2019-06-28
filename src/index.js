import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth from './Auth';
import jwtDecode from 'jwt-decode';

const auth0=new Auth();
let state={};

window.setState=(changes)=>{
    state = Object.assign({},state,changes);
    ReactDOM.render(<App {...state}/>, document.getElementById('root'));
}

let player_given_name;
let player_family_name;
let player_email;
let player_username;
let player_picture;
let player_gender;

if(auth0.isAuthenticated()===true){
    player_given_name=auth0.getProfile().given_name;
    player_family_name=auth0.getProfile().family_name;
    player_username=auth0.getProfile().nickname;
    player_email=auth0.getProfile().email;
    player_picture=auth0.getProfile().picture;
    player_gender=auth0.getProfile().gender;

    console.log(auth0.getProfile());
}
else
{
    player_given_name="";
    player_family_name="";
    player_email="";
    player_username="";
    player_picture="";
    player_gender="";
}

let initialState = {
    given_name:player_given_name,
    family_name:player_family_name,
    username:player_username,
    email:player_email,
    picture:player_picture,
    gender:player_gender,
    location:window.location.pathname.replace(/^\/?|\/$/g,""),
    auth0
};

window.setState(initialState);

serviceWorker.unregister();
