import React, {Component} from 'react';
import Auth from "../Auth";

class Game extends Component{
   constructor(props){
       super(props);
       this.state={
           current:0,
           score:0,
           play_id:null,
           player_id:null,
           game_id:null,
           email:this.props.email||null,
           player_id:null,
           given_name:this.props.given_name,
           family_name:this.props.family_name,
           username:this.props.username,
           picture:this.props.picture,
           gender:this.props.gender,
           total:0,
           program_rank:null,
           total_rank:null
       }

       this.handleChange=this.handleChange.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
       this.res=this.res.bind(this);
   }
   
   componentDidMount(){
    if(this.props.email!==null)
    {        
        const encodedValue1 = encodeURIComponent(this.props.email); 
        fetch(`http://localhost:3001/selectPlayerProfile`, {
            method: 'post',        
            headers: {
              "Content-Type": "Application/json",
              "Accept":"application/json"
            },
            body: JSON.stringify(this.state)
          })
          .then((res) => res.json())      
          .then((data)=>{
              console.log(data);
              this.setState({              
                  play_id:data[0].play_id,
                  player_id:data[0].player_id,
                  game_id:data[0].game_id,
                  username:data[0].username,
                  score:data[0].score,
                  total:data[0].total,
                  gender:data[0].gender,
                  city:data[0].city,
                  country:data[0].country,
                  program:data[0].program,
                  program_rank:data[0].program_rank,
                  total_rank:data[0].total_rank,
                  email:data[0].email
              });
          })
          .catch((error)=>console.log(error))  
    }
   }

   handleChange(e){
       e.preventDefault();
       const sc=e.target.value;
       this.setState({
           current:sc           
        }
       );      
   }

   handleSubmit(e){
        e.preventDefault();               
        this.setState({            
            total:Number(this.state.current)+Number(this.state.total),
            score:this.state.current
        }
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
   
   res() {
        if(this.props.given_name!=='undefined')    
            return(this.props.given_name);
        else
            return ('');
   }

    render(){
        
        return (

                <div>                       
                        <form className="playerScore" onSubmit={this.handleSubmit}>      
                         Do you want to go to <a href="/profile">Profile page</a> <a href="/admin">Admin Page</a> 
                        <h2>Hi {this.res()},  this is your game Page  </h2>                      
                                         
                        <p>Your stat is as follows 
                            <li>Current score is {this.state.current}.</li>
                            <li>Latest score is {this.state.score}.</li>
                            <li>Overall total is {this.state.total}</li>
                            <li>Rank among your program is {this.state.program_rank}</li>
                            <li>Rank among all participants is {this.state.total_rank}</li>
                        </p>
                        <div>
                             <h1>Here is the game space </h1>
                        </div>
                                
                        <label>Game score 
                                <input type="text" name="score" value={this.state.current} defaultValue='0' onChange={this.handleChange}/> <br/>
                        </label> 
                                             
                        <button type="submit">Save</button>

                        <div>
                             <button onClick={this.props.auth0.logout}>Log out</button>
                        </div>
                    </form>
                        
                </div>
        )
    }
}

export default Game;