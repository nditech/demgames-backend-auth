import React, { Component } from 'react';
import '../App.css';

class UpdateQuestion extends Component {
  
    constructor(props){
        super(props);
        this.state={
            questions:[{
                    id:"",
                    gameid:"",
                    difficulty_level:"",
                    question_statement:"",
                    weight:"",
                    explanation:"",
                    isitmedia:""
            }],
            updateQuestion:{
                    id:"",
                    gameid:"",
                    difficulty_level:"",
                    question_statement:"",
                    weight:"",
                    explanation:"",
                    isitmedia:""
            },
            questionidI:null         
        }
        this.handleSearch=this.handleSearch.bind(this);
        this.pool=this.pool.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
        this.handleChangeS = this.handleChangeS.bind(this);      
    }

    componentDidMount() {
        this.pool();
        
    }

    handleSearch(event){
        event.preventDefault();                
        this.state.questions.map((element) => {
            if(element.id===this.state.questionidI) {                           
                this.setState(
                        {
                            updateQuestion: element
                        },
                        ()=>{
                                                                                                                                            
                            }
                )                  
            }
            else
                console.log("Value not found");
        }
        );
        console.log(this.state.updateQuestion.id)  
    }

    pool(){
        fetch('/listquestions')
        .then((res) =>res.json())
        .then((data)=>{                                                    
               const Str2=JSON.stringify(JSON.parse(JSON.stringify(data)));
               const bObj2=JSON.parse(Str2);
               const newQuestion=JSON.parse(JSON.stringify(bObj2)); 
               console.log(newQuestion);                             
               this.setState(prevState=>({
                questions:prevState.questions.concat(newQuestion)
               }))
               console.log(JSON.stringify(JSON.parse(JSON.stringify(this.state.questions))));                 
        });        
        console.log(this.state.questions);
    }

    handleChange(event) { 
        event.preventDefault();          
        switch(event.target.name){
            case "questionid":
            {
                this.setState({
                    updateQuestion:{
                        id:event.target.value
                    }},
                    ()=>{
                        console.log("value"+this.state.updateQuestion.id)
                    }
                );
                break;
            }
            case "gameid":
            {   
                var gameid=event.target.value;    
                this.setState(prevState => ({
                    updateQuestion:{
                        gameid:gameid,
                        id:prevState.updateUser.id,
                        difficulty_level:prevState.updateQuestion.difficulty_level,
                        question_statement:prevState.updateQuestion.question_statement,
                        weight:prevState.updateQuestion.weight,
                        explanation:prevState.updateQuestion.explanation,
                        isitmedia:prevState.updateQuestion.isitmedia
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updateQuestion)
                    }
                );
                break;
            }
            case "difficulty_level":
            {   
                var difficulty_level=event.target.value;    
                this.setState(prevState => ({
                    updateQuestion:{
                        difficulty_level:difficulty_level,
                        id:prevState.updateQuestion.id,
                        gameid:prevState.updateQuestion.gameid,
                        question_statement:prevState.updateQuestion.question_statement,
                        weight:prevState.updateQuestion.weight,
                        explanation:prevState.updateQuestion.explanation,
                        isitmedia:prevState.updateQuestion.isitmedia
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updateQuestion)
                    }
                );
                break;
            }
            case "question_statement":
            {   
                var question_statement=event.target.value;    
                this.setState(prevState => ({
                    updateQuestion:{
                        question_statement:question_statement,
                        id:prevState.updateQuestion.id,
                        gameid:prevState.updateQuestion.gameid,
                        difficulty_level:prevState.updateQuestion.difficulty_level,
                        weight:prevState.updateQuestion.weight,
                        explanation:prevState.updateQuestion.explanation,
                        isitmedia:prevState.updateQuestion.isitmedia
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updateQuestion)
                    }
                );
                break;
            }
            case "weight":
            {   
                var weight=event.target.value;    
                this.setState(prevState => ({
                    updateQuestion:{
                        weight:weight,
                        id:prevState.updateQuestion.id,
                        gameid:prevState.updateQuestion.gameid,
                        difficulty_level:prevState.updateQuestion.difficulty_level,
                        question_statement:prevState.updateQuestion.question_statement,
                        explanation:prevState.updateQuestion.explanation,
                        isitmedia:prevState.updateQuestion.isitmedia
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updateQuestion)
                    }
                );
                break;
            }
            case "explanation":
            {
                var explanation=event.target.value;
                this.setState(prevState => ({
                    updateQuestion:{
                        explanation:explanation,
                        id:prevState.updateQuestion.id,
                        gameid:prevState.updateQuestion.gameid,
                        difficulty_level:prevState.updateQuestion.difficulty_level,
                        question_statement:prevState.updateQuestion.question_statement,
                        isitmedia:prevState.updateQuestion.isitmedia
                    }}),
                    ()=>{
                            console.log("New Value :"+this.state.updateQuestion)
                        }
                );
                break;                
            }
            case "isitmedia":
            {
                var isitmedia=event.target.value;                
                this.setState(prevState => ({
                    updateQuestion:{
                        isitmedia:isitmedia,
                        id:prevState.updateQuestion.id,
                        gameid:prevState.updateQuestion.gameid,
                        difficulty_level:prevState.updateQuestion.difficulty_level,
                        question_statement:prevState.updateQuestion.question_statement,
                        explanation:prevState.updateQuestion.explanation
                    }}),
                    ()=>{
                            console.log('New Value :' + this.state.updateQuestion.isitmedia);                            
                        }
                );
                break;                
            }
            default:
            {
                console.log("Found it");
                break;
            }
        }             
   }

   handleChangeS(event) { 
    event.preventDefault();
    var val=event.target.value;
    switch(event.target.name){
        case "questionidI":
        {
            this.setState(
                {
                    questionidI:event.target.value
                },
                ()=>{
                    console.log("value"+this.state.questionidI)
                }
            );
            break;
        }                
        default:
        {
                console.log("Found it");
        }
    }                   
   }

   handleSubmit(event) 
   {           
       event.preventDefault();    
       const url ="/updatequestions";
       fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "Application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify(this.state.updateQuestion),
        mode:'cors'
      })
      .then((res) => res.json())      
      .then((data)=>{console.log(data)})
      .catch((error)=>console.log(error))     
      
    }           
   render() {
    
      return (
            <div className="App">
            <div>
                <form className="questionForm" onSubmit={this.handleSubmit} >
                        <label>Search by question id 
                            <input type="text" name="questionidI" value={this.state.questionidI||''} onChange={this.handleChangeS}/> <br/>
                        </label>
                        <label>Question Id 
                            <input type="text" name="questionid" readOnly value={this.state.updateQuestion.id||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Game Id 
                            <input type="text" name="gameid" onKeyDown={this.handleKeyDown} value={this.state.updateQuestion.gameid||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Difficulty level 
                            <input type="text" name="difficulty_level" value={this.state.updateQuestion.difficulty_level||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Question statement
                            <input type="text" name="question_statement" value={this.state.updateQuestion.question_statement||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>weight
                            <input type="text" name="weight" value={this.state.updateQuestion.weight||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Explanation 
                            <input type="text" name="explanation" value={this.state.updateQuestion.explanation||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>is it media 
                            <input type="radio" name="isitmedia" value={this.state.updateQuestion.isitmedia} checked={this.state.updateQuestion.isitmedia==='0'} onChange={this.handleChange}/> No
                            <input type="radio" name="isitmedia" value={this.state.updateQuestion.isitmedia} checked={this.state.updateQuestion.isitmedia==='1'}  onChange={this.handleChange}  /> Yes                             
                            <br/>
                        </label>                        
  
                        <label>
                        <button
                            className="btn btn-link float-left"
                            onClick={this.handleClearForm}>Clear
                        </button>
                        <input type="button" name="update" onClick={this.handleSearch} value="Search"/>                        
                        <button type="submit">Update</button>                                        
                        </label>
                </form>
            </div>            
      </div>
    );
  }
}

export default UpdateQuestion;