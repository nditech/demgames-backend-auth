import React, { Component } from 'react';
import {Route, Nav, Link, BrowserRouter as Router} from "react-router-dom";
import List from './List2';
import Listq from './Listq';
import ListQuestions from './ListQuestions';
import ListChoices from './ListChoices';
import Register from './Register2';
import UpdatePlayer from './UpdatePlayer2';
import Home from './Home';
import AddGame from './AddGame';
import AddQuestion from './AddQuestion';
import RemoveQuestion from './RemoveQuestion';
import UpdateQuestion from './UpdateQuestion.js';
import UpdateChoice from './UpdateChoice.js';
import AddChoices from './AddChoices';
import Register2 from './Register2';
import ListGames from './ListGames';
import RemoveUser from './RemoveUser';
import RemoveChoice from './RemoveChoice';
import Game from './Game';
import notfound from './NotFound';
import Callback from './Callback';
import game from './Game';
import Auth from '../Auth';
import NotFound from './NotFound';
import { withRouter } from 'react-router-dom';

const auth=  new Auth();

class Admin extends Component{
   constructor(props){
       super(props);
       this.state={
           score:0,
           email:this.props.email||null,
           id:null,
           given_name:this.props.given_name,
           family_name:this.props.family_name,
           picture:this.props.picture,
           gender:this.props.gender,
           total:0,
           program_rank:null,
           total_rank:null
       }

       this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
   }
   
   componentDidMount(){
    if(this.state.email!==null)
    {
        const encodedValue = encodeURIComponent(this.state.email);       
       // const url ="http://localhost:3001/selectPlayerProfile";
        fetch(`http://localhost:3001/selectPlayerProfile?email=${encodedValue}`, {
        method: 'get',
        
        headers: {
          "Content-Type": "Application/json",
          "Accept":"application/json"
        }
      })
      .then((res) => res.json())      
      .then((data)=>{
          console.log(data.length);
          console.log(data[0].score);
          this.setState({
              score:data[0].score,
              total:data[0].total,
              program_rank:data[0].program_rank,
              total_rank:data[0].total_rank
          });
      })
      .catch((error)=>console.log(error))  
    }
   }

   handleChange(e){
       e.preventDefault();
       const sc=e.target.value;
       this.setState({
           score:sc}
       );
      
   }


   handleSubmit(e){

        e.preventDefault();
        
        this.setState({
            total:Number(this.state.score)+Number(this.state.total)}
        );
       
        const url ="http://localhost:3001/updateplayerscore";
        fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "Application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify(this.state),
        mode:'cors'
      })
      .then((res) => res.json())      
      .then((data)=>{
            
            console.log(data)
        })
      .catch((error)=>console.log(error))  
   }
    render(){
  ;      
        return (
                <div>
                        <Router>
                        <div>
                           <Link to="/Register">Register</Link> || <Link to="/List">List players</Link> || <Link to="/ListGames">List games</Link> || 
                           <Link to="/ListQuestions">List questions</Link> || <Link to="/ListChoices">List choices</Link> || <Link to="/UpdatePlayer">Update Player</Link>  
                           || <Link to="/UpdateQuestion">Update question</Link> || <Link to="/UpdateChoice">Update choice</Link> || <Link to="/AddGame">Add game</Link>
                            || <Link to="/AddQuestion">Add question</Link> || <Link to="/AddChoice">Add choice</Link> || <Link to="/RemoveUser">Remove player</Link>
                            || <Link to="/RemoveQuestion">Remove question</Link> || <Link to="/RemoveChoice">Remove choice</Link>           
                        </div>

                        <div>
                            <Route path="/Register" component={Register} />
                            <Route path="/List" component={List} />
                            <Route path="/ListGames" component={ListGames} />
                            <Route path="/ListQuestions" component={ListQuestions}/>
                            <Route path="/ListChoices" component={ListChoices}/>
                            <Route path="/UpdatePlayer" component={UpdatePlayer}/>
                            <Route path="/UpdateQuestion" component={UpdateQuestion}/>
                            <Route path="/UpdateChoice" component={UpdateChoice}/>
                            <Route path="/AddGame" component={AddGame}/>
                            <Route path="/AddQuestion" component={AddQuestion}/>
                            <Route path="/AddChoice" component={AddChoices}/>
                            <Route path="/RemoveUser" component={RemoveUser}/>
                            <Route path="/RemoveQuestion" component={RemoveQuestion}/>
                            <Route path="/RemoveChoice" component={RemoveChoice}/>

                        </div>
                        </Router>
                      
                </div>
        )
    }
}

export default Admin;