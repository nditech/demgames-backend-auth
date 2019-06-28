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
           middle_name:this.props.middle_name||null,
           family_name:this.props.family_name,
           username:this.props.username,
           picture:this.props.picture,
           gender:this.props.gender,
           city:this.props.city||null,
           country:this.props.country||null,
           program:this.props.program||null,
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
       
        switch(e.target.name)
        {
            case "given_name":
                this.setState({
                    given_name:sc
                })
                break;
            case "middle_name":
                this.setState({
                    middle_name:sc
                })
                break;
            case "family_name":
                this.setState({
                    family_name:sc
                })
                break;
            case "username":
                    this.setState({
                        username:sc
                    })
                    break;
            case "gender":
                    this.setState({
                        gender:sc
                    })
                    break;
            case "program":
                    this.setState({
                        program:sc
                    })
                    break;
            case "city":
                    this.setState({
                        city:sc
                    })
                    break;
            case "country":
                    this.setState({
                        country:sc
                    })
                    break;
            default:
                break;
        }
   }

   handleSubmit(e){
      e.preventDefault();                      
      const url ="http://localhost:3001/updateplayer";
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
            console.log(data);
            if(data===200)
            {
                alert("Successful");
            }
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
                        <h2>Hi {this.res()},  this is your profile Page  </h2>                                                               
                        <p> 
                            <li>First name is {this.state.given_name}.</li>
                            <li>Family name is {this.state.family_name}.</li>
                            <li>Gender {this.state.gender}.</li>
                            <li>Current score is {this.state.current}.</li>
                            <li>Latest score is {this.state.score}.</li>
                            <li>Overall total is {this.state.total}</li>
                            <li>Rank among your program is {this.state.program_rank}</li>
                            <li>Rank among all participants is {this.state.total_rank}</li>
                        </p>
                        <label>Id 
                                <input type="text" name="player_id" value={this.state.player_id} defaultValue='' onChange={this.handleChange}/> <br/>
                        </label>                                
                        <label>First name 
                                <input type="text" name="given_name" value={this.state.given_name} defaultValue='' onChange={this.handleChange}/> <br/>
                        </label> 
                        <label>Middle name 
                                <input type="text" name="middle_name" value={this.state.middle_name} defaultValue='' onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Family name 
                                <input type="text" name="family_name" value={this.state.family_name} defaultValue='' onChange={this.handleChange}/> <br/>
                        </label> 
                        <label>User name 
                                <input type="text" name="username" value={this.state.username} defaultValue='' onChange={this.handleChange}/> <br/>
                        </label> 
                        <label>Gender 
                                <input type="text" name="gender" value={this.state.gender} defaultValue='' onChange={this.handleChange}/> <br/>
                        </label>     
                        <label>Program 
                                <input type="text" name="program" value={this.state.program} defaultValue='' onChange={this.handleChange}/> <br/>
                        </label> 
                        <label>City 
                                <input type="text" name="city" value={this.state.city} defaultValue='' onChange={this.handleChange}/> <br/>
                        </label>    
                        <label>Country 
                                <input type="text" name="country" value={this.state.country} defaultValue='' onChange={this.handleChange}/> <br/>
                        </label>     
                        <label>email 
                                <input type="text" name="email" value={this.state.email} defaultValue='' onChange={this.handleChange}/> <br/>
                        </label>           
                        <button type="submit">Update Profile</button>
                        <div>
                             <button onClick={this.props.auth0.logout}>Log out</button>
                        </div>
                    </form>
                        
                </div>
        )
    }
}

export default Game;