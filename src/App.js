import React, {Component} from 'react';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import Main from './components/Main';
import Admin from './components/Admin';
import Game from './components/Game';
import List from './components/List2';
import NotFound from './components/NotFound';
import Callback from './components/Callback';
import Register from './components/Register2';
import ListGames from './components/ListGames';
import ListQuestions from './components/ListQuestions';
import ListChoices from './components/ListChoices';
import Profile from './components/Profile';

class App extends Component{
  constructor(props) {
    super(props);
    this.state={
        given_name:this.props.given_name,
        family_name:this.props.family_name,
        email:this.props.email,
        username:this.props.username,
        location:this.props.location,
        auth0:this.props.auth0
      };
  }

  render(){
      let mainComponent;
      console.log(this.state.location);
      switch(this.state.location){
        case "":
            mainComponent=<Main {...this.state}/>
            break;
        case "Home":
            mainComponent=<Main {...this.state}/>
            break;
        case "Profile":
            mainComponent=this.props.auth0.isAuthenticated()?<Profile exact {...this.state}/>:<NotFound/>;
            break;
        case "Admin":
            mainComponent=this.props.auth0.isAuthenticated()?<Admin exact {...this.state}/>:<NotFound/>;
            break;
        case "admin":
            mainComponent=this.props.auth0.isAuthenticated()?<Admin exact {...this.state}/>:<NotFound/>;
            break;
        case "Register":
            mainComponent=this.props.auth0.isAuthenticated()?<Register exact {...this.state}/>:<NotFound/>;
            break;  
        case "List":
            mainComponent=this.props.auth0.isAuthenticated()?<List exact {...this.state}/>:<NotFound/>;
            break;    
        case "list":
            mainComponent=this.props.auth0.isAuthenticated()?<List exact {...this.state}/>:<NotFound/>;
            break;  
        case "Admin":
            mainComponent=this.props.auth0.isAuthenticated()?<Admin exact {...this.state}/>:<NotFound/>;
            break;
        case "game":
            mainComponent=this.props.auth0.isAuthenticated()?<Game exact {...this.state}/>:<NotFound/>;
            break;
        case "ListGames":
            mainComponent=this.props.auth0.isAuthenticated()?<ListGames exact {...this.state}/>:<NotFound/>;
            break;
        case "ListQuestions":
            mainComponent=this.props.auth0.isAuthenticated()?<ListQuestions exact {...this.state}/>:<NotFound/>;
            break;
        case "ListChoices":
            mainComponent=this.props.auth0.isAuthenticated()?<ListChoices exact {...this.state}/>:<NotFound/>;
            break;
        case "callback":
            mainComponent=<Callback {...this.state}/>;
            break;
        default:
            mainComponent=<NotFound />
      }
      return (
          <div className="App">

            <header className="App-header">
                    
              <img src="" className="App-logo" alt="logo" />
              <h2>{this.props.given_name+" "+this.props.family_name}</h2> 
              </header>
              {mainComponent}         
          </div>       
      );
  }
}

export default App;
