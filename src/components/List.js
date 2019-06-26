import React, { Component } from 'react';
//import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import '../App.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class List extends Component {
  
    constructor(props){
        super(props);
        this.state={
            user:[{
                id:"", firstName:"", middleName:"", lastName:"",userName:"", email:"", dateOfBirth:new Date(),
                gender:"", country:"", city:"", program:""
            }]
        };

          this.simpleTable=this.simpleTable.bind(this);

    }
   

    componentDidMount() {
        this.pool();
        this.pool1();        
    }

    pool(){

        fetch('http://10.50.64.5:8800/users')
        //.then(res=>res.json())
        .then(data=>console.log(data));          
    }

    pool1(){
        fetch('http://10.50.64.5:8800/list')
        .then((res) =>res.json())
        .then((data)=>{                                                     
               const Str2=JSON.stringify(JSON.parse(JSON.stringify(data)));
               const bObj2=JSON.parse(Str2);
               const newUSER=JSON.parse(JSON.stringify(bObj2)); 
               console.log(newUSER);                             
               this.setState(prevState=>({
                    user:prevState.user.concat(newUSER)
               }))
               console.log(JSON.stringify(JSON.parse(JSON.stringify(this.state.user))));                 
        });        
        console.log(this.state.user);
    }

    simpleTable(){
       
       return(
                <Paper><Table>
                    <TableHead>
                        <TableRow>
                        <TableCell align="right">Id</TableCell>
                        <TableCell align="right">Last Name</TableCell>
                        <TableCell align="right">First Name</TableCell>
                        <TableCell align="right">Gender</TableCell>
                        <TableCell align="right">Country</TableCell>
                        <TableCell align="right">Program</TableCell>
                        </TableRow>
                    </TableHead>
                <TableBody>
                    {
                        this.state.user.map(row => (
                        <TableRow key={row.id}>
                            <TableCell align="right">{row.id}</TableCell>
                            <TableCell align="right">{row.lastName}</TableCell>
                            <TableCell align="right">{row.firstName}</TableCell>
                            <TableCell align="right">{row.gender}</TableCell>
                            <TableCell align="right">{row.country}</TableCell>
                            <TableCell align="right">{row.program}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table></Paper>
            );       
   } 
   render() {             
      return (
      <div className="App">
            <div>
                {this.simpleTable()} 
            </div>            
      </div>
    );
  }
}

export default List;
