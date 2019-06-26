import React, { Component } from 'react';
import '../App.css';

class UpdateChoice extends Component {  
    constructor(props){
        super(props);
        this.state={
            choices:[{
                id:"",
                questionid:"",
                choicestatement:"",
                choicedescription:"",
                weight:"",
                answer:0
            }],
            updatechoices:{
                id:"",
                questionid:"",
                choicestatement:"",
                choicedescription:"",
                weight:"",
                answer:0
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
        this.state.choices.map((element) => {
            if(element.id===this.state.questionidI) {                           
                this.setState(
                        {
                            updatechoices: element
                        },
                        ()=>{
                                                                                                                                            
                            }
                )                  
            }
            else
                console.log("Value not found");
        }
        );
        console.log(this.state.updatechoices.id)  
    }

    pool(){
        fetch('http://localhost:3001/listchoices')
        .then((res) =>res.json())
        .then((data)=>{                                                    
               const Str2=JSON.stringify(JSON.parse(JSON.stringify(data)));
               const bObj2=JSON.parse(Str2);
               const newChoices=JSON.parse(JSON.stringify(bObj2)); 
               console.log(newChoices);                             
               this.setState(prevState=>({
                    choices:prevState.choices.concat(newChoices)
               }))
               console.log(JSON.stringify(JSON.parse(JSON.stringify(this.state.choices))));                 
        });        
        console.log(this.state.choices);
    }

    handleChange(event) { 
        event.preventDefault();          
        switch(event.target.name){
            case "choiceid":
            {
                this.setState({
                    updatechoice:{
                        id:event.target.value
                    }},
                    ()=>{
                        console.log("value"+this.state.updatechoices.id)
                    }
                );
                break;
            }
            case "questionid":
            {   
                var questionid=event.target.value;    
                this.setState(prevState => ({
                    updatechoices:{
                        questionid:questionid,
                        id:prevState.updatechoices.id,
                        choicestatement:prevState.updatechoices.choicestatement,
                        choicedescription:prevState.updatechoices.choicedescription,
                        weight:prevState.updatechoices.weight,
                        answer:prevState.updatechoices.answer                        
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updatechoices)
                    }
                );
                break;
            }
            case "choicestatement":
            {   
                var choicestatement=event.target.value;    
                this.setState(prevState => ({
                    updatechoices:{
                        choicestatement:choicestatement,
                        id:prevState.updatechoices.id,
                        questionid:prevState.updatechoices.questionid,
                        choicedescription:prevState.updatechoices.choicedescription,
                        weight:prevState.updatechoices.weight,
                        answer:prevState.updatechoices.answer  
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updatechoices)
                    }
                );
                break;
            }
            case "choicedescription":
            {   
                var choicedescription=event.target.value;    
                this.setState(prevState => ({
                    updatechoices:{
                        choicedescription:choicedescription,
                        id:prevState.updatechoices.id,
                        questionid:prevState.updatechoices.questionid,
                        choicestatement:prevState.updatechoices.choicestatement,
                        weight:prevState.updatechoices.weight,
                        answer:prevState.updatechoices.answer  
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updatechoices)
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
                        choicedescription:choicedescription,
                        id:prevState.updatechoices.id,
                        questionid:prevState.updatechoices.questionid,
                        choicestatement:prevState.updatechoices.choicestatement,
                        answer:prevState.updatechoices.answer  
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updateQuestion)
                    }
                );
                break;
            }
            case "answer":
            {
                var answer=event.target.value;
                this.setState(prevState => ({
                    updateQuestion:{
                        answer:answer,
                        id:prevState.updatechoices.id,
                        questionid:prevState.updatechoices.questionid,
                        choicestatement:prevState.updatechoices.choicestatement,
                        weight:prevState.updatechoices.weight,
                        choicedescription:prevState.updatechoices.choicedescription  
                    }}),
                    ()=>{
                            console.log("New Value :"+this.state.updatechoices)
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
       const url ="http://localhost:3001/updatechoices";
       fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "Application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify(this.state.updatechoices),
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
                        <label>Search by Choice id 
                            <input type="text" name="choiceidI" value={this.state.choiceidI||''} onChange={this.handleChangeS}/> <br/>
                        </label>
                        <label>Choice Id 
                            <input type="text" name="choiceid" readOnly value={this.state.updatechoices.choiceid||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Question Id 
                            <input type="text" name="questionid" onKeyDown={this.handleKeyDown} value={this.state.updatechoices.questionid||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Choice statement
                            <input type="text" name="choicestatement" value={this.state.updatechoices.choicestatement||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>weight
                            <input type="text" name="weight" value={this.state.updatechoices.weight||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Choice description 
                            <input type="text" name="choicedescription" value={this.state.updatechoices.choicedescription||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Answer 
                            <input type="text" name="answer" value={this.state.updatechoices.answer||''} onChange={this.handleChange}/> <br/>
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

export default UpdateChoice;