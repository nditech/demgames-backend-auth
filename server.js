const express = require('express');
const app2 = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');

const mysql = require('mysql');

const connectionMysql =mysql.createConnection({
    host:'localhost',
    user:'demgames',
    password:'Demgames',
    database:'demgamesDb'
  });
  
  connectionMysql.connect(function(err){
    if(err){
     console.error('error connection*******'+err.stack);
     return;
    }
    console.log('connected as id '+connectionMysql.threadId);
  });
  
  const filenameuser = './db/user.json';
  const filenamequestion  = './db/question.json';
  const fs = require('fs');
   
  // Set up the express app
  const PORT2 = 3001;
  
  // Parse incoming requests data
  app2.use(bodyParser.json());
  app2.use(bodyParser.urlencoded({ extended: true }));
  app2.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "Application/JSON");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  
  // Post question on mysql database
  app2.post('/addquestion',(req, res)=>{
      var data=req.body;
      console.log(data);    
      const id=Math.random()*100+16;
      data.id=id;
      console.log(data);  
      const sqlInsertStatement='insert into Questions SET ?';
      connectionMysql.query(sqlInsertStatement, [data], function (err, result, fields) {
            if (err) throw err;
            console.log(data);
            console.log("Number of rows affected : " + result.affectedRows);
            console.log("Number of records affected with warning : " + result.warningCount);
            console.log("Message from MySQL Server : " + result.message);               
      }); 
  })

 
  
  //Post player updates on mysql db
  app2.post('/updateplayer', (req, res) => {
    var data=req.body;
    console.log(data);
    const d= new moment('2019-04-30T20:13:00.000Z');
    const s=d.format('YYYY-MM-DD');
    
    const sqlUpdateStatement='update players set dateOfBirth="'+s+'", firstName="'+req.body.firstName+'", middleName="'+req.body.middleName+'", lastName="'+req.body.lastName+'", username="'+req.body.userName+
    '", email="'+req.body.email+'", gender="'+req.body.gender+'", country="'+req.body.country+'", city="'+req.body.city+'", program="'+req.body.program+'" where id = "'+req.body.id+'"';
    connectionMysql.query(sqlUpdateStatement, function (err, result, fields) {
          if (err) throw err;
          console.log(sqlUpdateStatement);
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message);               
    });      
  });
  
  //Post player delete on mysql db
  app2.post('/deleteplayer',(req, res) => {
    var data=req.body;
    console.log(data);
      
    const sqlDeleteStatement='Delete from players where id="'+req.body.id+'"';
    connectionMysql.query(sqlDeleteStatement, function (err, result, fields) {
          if (err) throw err;
          console.log(sqlDeleteStatement);
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message);               
    });      
  });
  
  //Post choice delete on mysql db
  app2.post('/deletechoice',(req, res) => {
    var data=req.body;
    console.log(data);
    const sqlDeleteStatement='Delete from choices where id="'+req.body.id+'"';
    connectionMysql.query(sqlDeleteStatement, function (err, result, fields) {
          if (err) throw err;
          console.log(sqlDeleteStatement);
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message);               
    });      
  });
  
  //Get players from mysql db
  app2.get('/users',(req,res)=>{
      connectionMysql.query('select * from Players',(err, data, fields)=>{
        if(err){ 
          console.log("Not Successful access");
        }else{
          console.log(JSON.stringify(data));
          res.send(JSON.stringify(data));
        }    
    }) 
  })
   //Get players from mysql db
   app2.get('/profile',(req,res)=>{
        const snd=req.query;

        connectionMysql.query("Select * from plays inner Join players on plays.player_id= players.id where players.email='"+snd.email+"'", (err, data, fields)=>{
        
        if(err){ 
            console.log("Not Successful access");
        }else{
            console.log(JSON.stringify(data));
            res.send(JSON.stringify(data));
        }    
        }) 
    })
  
  //Get specific player profile from mysql db
  app2.get('/selectPlayerProfile',(req,res)=>{
    const snd=req.query;
    console.log(req.query);
    console.log(snd.email); 
    //console.log(snd.player_id); 
    //console.log(snd.play_id); 
    console.log(snd.username);
    console.log(snd.given_name);
    console.log(snd.family_name);
    if(snd.given_name=='undefined')
        snd.given_name='';
    if(snd.family_name=='undefined')
        snd.family_name='';
  
    const sqlS="select * from plays where player_id in (select id from players where email='"+snd.email+"')";   
    connectionMysql.query(sqlS,(err, data, fields)=>
    {
        if(err){ 
          console.log("Not Successful access");        
        }
        else
        {
          if(data.length>0)
          {  
            console.log('Yes data is found');
            console.log(data[0].id);
            console.log(data[0].email);
            console.log(data[0]);
            res.send( JSON.stringify(data));
          }
          else
           {
             console.log("Executed but not found reply")
             const d= new moment('2019-04-30T20:13:00.000Z');
             const s=d.format('YYYY-MM-DD');
             const sqlInsertStatement="insert into players (`firstname`,`lastname`, `username`, `gender`, `dateofbirth`, `country`, `city`, `program`, `email`) Values ('"+snd.given_name+"','"+snd.family_name+"','"+snd.username+"','','"+s+"','','','','"+snd.email+"')";
             console.log(sqlInsertStatement);
             connectionMysql.query(sqlInsertStatement, function (err, result, fields) {
             if (err) throw err;
               console.log(snd.email);
               console.log(result.insertId);
               console.log("Number of rows affected : " + result.affectedRows);
               console.log("Number of records affected with warning : " + result.warningCount);
               console.log("Message from MySQL Server : " + result.message);   
               const sqlS="select * from plays where player_id ='"+result.insertId+"'";  
               connectionMysql.query(sqlS,(err, datanew, fields)=>
               {
                  if(err)
                  { 
                          console.log("Not Successful access");        
                  }
                  else
                  {
                     // if(datanew.length>0)                   {                    }
                    res.send( JSON.stringify(datanew));            
                  }
               }
               );            
            })
          }
        }
      })
  })
  
  //Lists all games from mysql database
  app2.get('/listgames',(req,res)=>{
    // res.set('Content-Type', 'application/json');
       
       connectionMysql.query('select * from games',(err, data, fields)=>{
         if(err){ 
           console.log("Not Successful access to games");
         }else{
           console.log(JSON.stringify(data));
           res.send(JSON.stringify(data));         
         }    
     })   
  })
  
  // List all questions from mysql
  app2.get('/listquestions',(req,res)=>{
    // res.set('Content-Type', 'application/json');     
       connectionMysql.query('select * from Questions',(err, data, fields)=>{
         if(err){ 
           console.log("Not Successful access to games");
         }else{
           console.log(JSON.stringify(data));
           res.send(JSON.stringify(data));
         }     
     })
   })
  
   // List all choices from mysql
  app2.get('/listchoices',(req,res)=>{
    // res.set('Content-Type', 'application/json');     
       connectionMysql.query('select * from choices',(err, data, fields)=>{
         if(err){ 
           console.log("Not Successful access to games");
         }else{
           console.log(JSON.stringify(data));
           res.send(JSON.stringify(data));
         }     
     })
   })
  
   //Post choices on mysql db
   app2.post('/addchoice',  (req, res) => {
    var data=req.body;
    console.log(data);
    const id=Math.random()*100+16;
    data.id=id;
    console.log(data);
   
    const sqlInsertStatement='insert into choices SET ?';
    connectionMysql.query(sqlInsertStatement, [data], function (err, result, fields) {
          if (err) throw err;
          console.log(data);
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message);               
    });      
  });
  
  //Post player on mysql db
  app2.post('/registerplayer', (req, res) => {
    var data=req.body;
    console.log(data);
    
    const d= new moment('2019-04-30T20:13:00.000Z');
    const s=d.format('YYYY-MM-DD');
    data.dateOfBirth=d.format('YYYY-MM-DD');
    console.log(data);
   
    const sqlInsertStatement='insert into players SET ?';
    connectionMysql.query(sqlInsertStatement, [data], function (err, result, fields) {
          if (err) throw err;
          console.log(data);
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message);               
    });       
  });
  
  
  app2.post('/registergame', (req, res) => {
    
    var data=req.body;
    console.log(data);
    const id=Math.random()*100+100;
    data.id=id;
    console.log(data);
    
    const sqlInsertStatement='insert into games SET ?';
    connectionMysql.query(sqlInsertStatement, [data], function (err, result, fields) {
          if (err) throw err;
          console.log(data);               
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message);                       
    });     
  });
  
  // Update question on mysql database
  app2.post('/updatequestions',(req, res)=>{
    var data=req.body;
    console.log(data);  
  
    const sqlUpdateStatement='update questions set difficulty_level="'+req.body.difficulty_level+'", question_statement="'+req.body.question_statement+'", weight="'+req.body.weight+'", explanation="'+req.body.explanation+'", isitmedia="'+req.body.isitmedia+'" where id = "'+req.body.id+'" and gameid="'+req.body.gameid+'"';
    connectionMysql.query(sqlUpdateStatement, function (err, result, fields) {
          if (err) throw err;
          console.log(sqlUpdateStatement);
          console.log("Number of rows affected : " + result.affectedRows);
          console.log("Number of records affected with warning : " + result.warningCount);
          console.log("Message from MySQL Server : " + result.message);               
    }); 
  })
  
  app2.post('/updateplayerscore',(req, res)=>{
    var data=req.body;
    console.log(data);  
  
    connectionMysql.query("select id from players where email='"+req.body.email+"'",(err, dataE, fields)=>{
      if(err){ 
        console.log("Not Successful access to games");
      }else{
          console.log(dataE);      
          const sqlUpdateStatement="update plays set score='"+data.score+"', total='"+data.total+"' where player_id ='"+ data.player_id +"' and game_id='100001'";
          console.log(sqlUpdateStatement);
          connectionMysql.query(sqlUpdateStatement, function (err, result, fields) {
              if (err) throw err;
              console.log(sqlUpdateStatement);
              console.log("Number of rows affected : " + result.affectedRows);
              console.log("Number of records affected with warning : " + result.warningCount);
              console.log("Message from MySQL Server : " + result.message);                 
          }); 
      }  
    });
  })
  
  //connectionMysql.end();
 
app2.listen(PORT2, () => console.log('Demgames server listening on port 3001!'));


