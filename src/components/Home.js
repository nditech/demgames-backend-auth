import React, {Component} from 'react';
import Auth from '../Auth';

class Main extends Component{
    constructor(props){
        super(props);
        this.state={    
               
        }
        this.handleMe=this.handleMe.bind(this);
    }
    handleMe(){
        this.props.auth0.login();
    }
    render(){
        
        return (
            <div>
                <p>
                    Welcome {this.props.name}! Game page without authentication? please <a href="/game">Click here</a> else  
                </p> 
                {
                    !this.props.auth0.isAuthenticated() &&
                    <button onClick={this.handleMe}>Please log in</button>

                }
                <div>
                {
                    this.props.auth0.isAuthenticated() &&
                    <button onClick={this.props.auth0.logout}>Log out</button>
                }
                </div>
            </div>
        );
    }
}

export default Main;