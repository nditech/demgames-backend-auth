import React, { Component } from 'react';
import moment from 'moment';

import '../App.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class RemoveUser extends Component {
  
    constructor(props){
        super(props);
        this.state={
            user:[{
                id:"",
                firstName:"",
                middleName:"",
                lastName:"",
                userName:"",
                email:"",
                dateOfBirth:new Date(),
                gender:"",
                country:"",
                city:"",
                program:""
            }],
            updateUser:{
                id:null,
                firstName:null,
                middleName:null,
                lastName:null,
                userName:null,
                email:"",
                dateOfBirth:new Date(),
                gender:null,
                country:null,
                city:null,
                program:null
            },
            useridI:null         
        }
        this.handleSearch=this.handleSearch.bind(this);
        this.pool=this.pool.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
        this.handleChangeS = this.handleChangeS.bind(this);      
    }

    componentDidMount() {
        this.pool();        
     }

    handleSearch(event){
        event.preventDefault();   
        console.log("The value being searched is :" + this.state.useridI);
        this.state.user.map(
            (element) => {
                console.log("The value being searched is :" + this.state.useridI+" "+element.id);
                if(element.id===this.state.useridI) {
                           
                     this.setState(
                    {
                        updateUser: element},
                             ()=>{
                                   console.log(this.state.updateUser.id+"    "+this.state.useridI+"  "+element.id);                                   
                                 }
                    )                  
                }
                else
                 console.log("Value not found");
            }
        );
        console.log(this.state.updateUser.id)  
    }

    pool(){
        fetch('/users')
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

    handleDate(date){       
        this.setState(prevState=>({
                updateUser:{
                    dateOfBirth:date,
                    firstName:prevState.updateUser.firstName,
                    id:prevState.updateUser.id,
                    middleName:prevState.updateUser.middleName, 
                    lastName:prevState.updateUser.lastName,
                    userName:prevState.updateUser.userName,
                    email:prevState.updateUser.email,
                    gender:prevState.updateUser.gender,
                    country:prevState.updateUser.country,
                    city:prevState.updateUser.city,
                    program:prevState.updateUser.program
                }
        }),
        ()=>{
            console.log(this.state.updateUser.dateOfBirth);
        }
        )
    }

    handleChange(event) { 
        event.preventDefault();
          
        switch(event.target.name){
            case "userid":
            {
                this.setState({
                    updateUser:{
                        id:event.target.value
                    }},
                    ()=>{
                        console.log("value"+this.state.updateUser.id)
                    }
                );
                break;
            }
            case "firstName":
            {   
                var firstName=event.target.value;    
                this.setState(prevState => ({
                    updateUser:{
                        firstName:firstName,
                        id:prevState.updateUser.id,
                        middleName:prevState.updateUser.middleName, 
                        lastName:prevState.updateUser.lastName,
                        userName:prevState.updateUser.userName,
                        email:prevState.updateUser.email,
                        gender:prevState.updateUser.gender,
                        dateOfBirth:prevState.updateUser.dateOfBirth,
                        country:prevState.updateUser.country,
                        city:prevState.updateUser.city,
                        program:prevState.updateUser.program
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updateUser.firstName)
                    }
                );
                break;
            }
            case "middleName":
            {   
                var middleName=event.target.value;    
                this.setState(prevState => ({
                    updateUser:{
                        middleName:middleName,
                        id:prevState.updateUser.id,
                        firstName:prevState.updateUser.firstName, 
                        lastName:prevState.updateUser.lastName,
                        userName:prevState.updateUser.userName,
                        email:prevState.updateUser.email,
                        gender:prevState.updateUser.gender,
                        dateOfBirth:prevState.updateUser.dateOfBirth,
                        country:prevState.updateUser.country,
                        city:prevState.updateUser.city,
                        program:prevState.updateUser.program
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updateUser.middleName)
                    }
                );
                break;
            }
            case "lastName":
            {   
                var lastName=event.target.value;    
                this.setState(prevState => ({
                    updateUser:{
                        lastName:lastName,
                        id:prevState.updateUser.id,
                        middleName:prevState.updateUser.middleName, 
                        firstName:prevState.updateUser.firstName,
                        userName:prevState.updateUser.userName,
                        email:prevState.updateUser.email,
                        gender:prevState.updateUser.gender,
                        dateOfBirth:prevState.updateUser.dateOfBirth,
                        country:prevState.updateUser.country,
                        city:prevState.updateUser.city,
                        program:prevState.updateUser.program
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updateUser.lastName)
                    }
                );
                break;
            }
            case "userName":
            {   
                var userName=event.target.value;    
                this.setState(prevState => ({
                    updateUser:{
                        userName:userName,
                        id:prevState.updateUser.id,
                        middleName:prevState.updateUser.middleName, 
                        firstName:prevState.updateUser.firstName,
                        lastName:prevState.updateUser.lastName,
                        email:prevState.updateUser.email,
                        gender:prevState.updateUser.gender,
                        dateOfBirth:prevState.updateUser.dateOfBirth,
                        country:prevState.updateUser.country,
                        city:prevState.updateUser.city,
                        program:prevState.updateUser.program
                    }}),
                    ()=>{
                        console.log("New Value :"+this.state.updateUser.userName)
                    }
                );
                break;
            }
            case "email":
            {
                var email=event.target.value;
                this.setState(prevState => ({
                    updateUser:{
                        email:email,
                        id:prevState.updateUser.id,
                        firstName:prevState.updateUser.firstName, 
                        middleName:prevState.updateUser.middleName, 
                        lastName:prevState.updateUser.lastName,
                        userName:prevState.updateUser.userName,
                        gender:prevState.updateUser.gender,
                        dateOfBirth:prevState.updateUser.dateOfBirth,
                        country:prevState.updateUser.country,
                        city:prevState.updateUser.city,
                        program:prevState.updateUser.program
                    }}),
                    ()=>{
                            console.log("New Value :"+this.state.updateUser.email)
                        }
                );
                break;                
            }
            case "gender":
            {
                var gender=event.target.value;           
                this.setState(prevState => ({
                    updateUser:{
                        gender:gender,
                        id:prevState.updateUser.id,
                        firstName:prevState.updateUser.firstName, 
                        middleName:prevState.updateUser.middleName, 
                        lastName:prevState.updateUser.lastName,
                        userName:prevState.updateUser.userName,
                        email:prevState.updateUser.email,
                        dateOfBirth:prevState.updateUser.dateOfBirth,
                        country:prevState.updateUser.country,
                        city:prevState.updateUser.city,
                        program:prevState.updateUser.program
                    }}),
                    ()=>{
                            console.log('New Value :' +this.state.updateUser.gender);
                            var genderRadio=this.refs.gender;

                            if (gender==='Male')
                            {  
                                 genderRadio.nodeValue='Male';
                                console.log("Gender"+genderRadio.nodeValue+genderRadio.checked);                             
                                genderRadio.checked=true;
                                console.log("Gender"+genderRadio.nodeValue+genderRadio.checked);
                            }
                            else if (gender==='Female')
                            {   genderRadio.nodeValue='Female';
                                console.log("Gender"+genderRadio.nodeValue+genderRadio.checked);                             
                                genderRadio.checked=true;
                                console.log("Gender"+genderRadio.nodeValue+genderRadio.checked);
                            }
                            else
                            {   genderRadio.nodeValue='Other';
                                console.log("Gender"+genderRadio.nodeValue+genderRadio.checked);                             
                                genderRadio.checked=true;
                                console.log("Gender"+genderRadio.nodeValue+genderRadio.checked);                               
                            }

                        }
                );
                break;                
            }
            case "country":
            {
                var country=event.target.value;
                var countryInput=document.getElementsByName('country');
                countryInput.select=country;                    
                this.setState(prevState => ({
                    updateUser:{
                        country:country,
                        id:prevState.updateUser.id,
                        firstName:prevState.updateUser.firstName, 
                        middleName:prevState.updateUser.middleName, 
                        lastName:prevState.updateUser.lastName,
                        userName:prevState.updateUser.userName,
                        gender:prevState.updateUser.gender,
                        dateOfBirth:prevState.updateUser.dateOfBirth,
                        program:prevState.updateUser.program,
                        city:prevState.updateUser.city,
                        email:prevState.updateUser.email
                    }}),
                    ()=>{
                            console.log("New Value :"+this.state.updateUser.city)
                        }
                );
                break;                
            }
            case "city":
            {
                var city=event.target.value;
                this.setState(prevState => ({
                    updateUser:{
                        city:city,
                        id:prevState.updateUser.id,
                        firstName:prevState.updateUser.firstName, 
                        middleName:prevState.updateUser.middleName, 
                        lastName:prevState.updateUser.lastName,
                        userName:prevState.updateUser.userName,
                        gender:prevState.updateUser.gender,
                        dateOfBirth:prevState.updateUser.dateOfBirth,
                        country:prevState.updateUser.country,
                        program:prevState.updateUser.program,
                        email:prevState.updateUser.email
                    }}),
                    ()=>{
                            console.log("New Value :"+this.state.updateUser.city)
                        }
                );
                break;                
            }
            case "program":
            {
                var program=event.target.value;
                this.setState(prevState => ({
                    updateUser:{
                        program:program,
                        id:prevState.updateUser.id,
                        firstName:prevState.updateUser.firstName, 
                        middleName:prevState.updateUser.middleName, 
                        lastName:prevState.updateUser.lastName,
                        userName:prevState.updateUser.userName,
                        gender:prevState.updateUser.gender,
                        dateOfBirth:prevState.updateUser.dateOfBirth,
                        country:prevState.updateUser.country,
                        city:prevState.updateUser.city,
                        email:prevState.updateUser.email
                    }}),
                    ()=>{
                            console.log("New Value :"+this.state.updateUser.program)
                        }
                );
                break;                
            }
            case "dateOfBirth":
            {
                var dateOfBirth=event.target.value;
                this.setState(prevState => ({
                    updateUser:{
                        dateOfBirth:dateOfBirth,
                        id:prevState.updateUser.id,
                        firstName:prevState.updateUser.firstName, 
                        middleName:prevState.updateUser.middleName, 
                        lastName:prevState.updateUser.lastName,
                        userName:prevState.updateUser.userName,
                        gender:prevState.updateUser.dateOfBirth,
                        program:prevState.updateUser.program,
                        country:prevState.updateUser.country,
                        city:prevState.updateUser.city,
                        email:prevState.updateUser.email
                    }}),
                    ()=>{
                            console.log("New Value :"+this.state.updateUser.program)
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
   handleClearForm(){
    this.state={
        user:[{
            id:"",
            firstName:"",
            middleName:"",
            lastName:"",
            userName:"",
            email:"",
            dateOfBirth:new Date(),
            gender:"",
            country:"",
            city:"",
            program:""
        }],
        updateUser:{
            id:null,
            firstName:null,
            middleName:null,
            lastName:null,
            userName:null,
            email:"",
            dateOfBirth:new Date(),
            gender:null,
            country:null,
            city:null,
            program:null
        },
        useridI:null
   }
}

   handleChangeS(event) { 
    event.preventDefault();
    var valId=event.target.value;
    switch(event.target.name){
        case "useridI":
        {
            this.setState(
                {
                    useridI:valId
                },
                ()=>{
                    console.log("value"+this.state.useridI)
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
              
       const url ="/deleteplayer";
       fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "Application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify(this.state.updateUser),
        mode:'cors'
      })
      .then((res) => res.json())      
      .then((data)=>{console.log(data)})
      .catch((error)=>console.log(error))     
      
    }
           
   render() {
      const {email} = this.props;
      return (
            <div className="App">
            <div>
                <form className="playerForm" onSubmit={this.handleSubmit} >
                        <label>Search by Player Id 
                            <input type="text" name="useridI" value={this.state.useridI||''} onChange={this.handleChangeS}/> <br/>
                        </label>
                        <label>Player Id 
                            <input type="text" name="userid" readOnly value={this.state.updateUser.id||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>First name 
                            <input type="text" name="firstName" onKeyDown={this.handleKeyDown} value={this.state.updateUser.firstname||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Middle name 
                            <input type="text" name="middleName" value={this.state.updateUser.middlename||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Last name 
                            <input type="text" name="lastName" value={this.state.updateUser.lastname||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>User name 
                            <input type="text" name="userName" value={this.state.updateUser.username||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>email 
                            <input type="text" name="email" value={this.state.updateUser.email||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Gender 
                            <input type="radio" ref="gender" name="gender" value={this.state.updateUser.gender} checked={this.state.updateUser.gender==='Female'} onChange={this.handleChange}/> Female
                            <input type="radio" ref="gender" name="gender" value={this.state.updateUser.gender} checked={this.state.updateUser.gender==='Male'}  onChange={this.handleChange}  /> Male 
                            <input type="radio" ref="gender" name="gender" value={this.state.updateUser.gender} checked={this.state.updateUser.gender==='Other'}  onChange={this.handleChange} /> Other  
                            <br/>
                        </label>
                        <label>Date of Birth 
                        <DatePicker name="dateOfBirth" onChange={this.handleDate} value={(moment(this.state.updateUser.dateOfBirth).format('MM-DD-YYYY'))}  isClearable={true} dateFormat="MM/dd/yyyy" placeholderText="MM/dd/yyyy"/> <br/>
                        </label>
                        <label> Country
                        <select name="country" value={this.state.updateUser.country} onChange={this.handleChange} >
                                <option value="Afghanistan">Afghanistan</option><option value="Albania">Albania</option><option value="Algeria">Algeria</option>
                                <option value="Andorra">Andorra</option><option value="Angola">Angola</option><option value="AntiguaandBarbuda">Antigua and Barbuda</option>
                                <option value="Argentina">Argentina</option><option value="Armenia">Armenia</option><option value="Australia">Australia</option>                      
                                <option value="Afghanistan">Afghanistan</option><option value="Azerbaijan">Azerbaijan</option><option value="Bahamas">Bahamas</option>
                                <option value="Bahrain">Bahrain</option><option value="Bangladesh">Bangladesh</option><option value="Barbados">Barbados</option>
                                <option value="Belarus">Belarus</option><option value="Belgium">Belgium</option><option value="Belize">Belize</option>
                                <option value="Benin">Benin</option><option value="Bhutan">Bhutan</option><option value="Bolivia">Bolivia</option>
                                <option value="BosniaandHerzegovina">Bosnia and Herzegovina</option><option value="Botswana">Botswana</option><option value="Brazil">Brazil</option>
                                <option value="Brunei">Brunei</option><option value="Bulgaria">Bulgaria</option><option value="BurkinaFaso">Burkina Faso</option>                       
                                <option value="Burundi">Burundi</option><option value="CaboVerde">Cabo Verde</option><option value="Cambodia">Cambodia</option>
                                <option value="Cameroon">Cameroon</option><option value="Canada">Canada</option><option value="CentralAfricanRepublic">Central African Republic</option>
                                <option value="Chad">Chad</option><option value="Chile">Chile</option><option value="China">China</option>
                                <option value="Colombia">Colombia</option><option value="Comoros">Comoros</option><option value="Democratic Republic of the Congo">Congo, Democratic Republic of the</option>
                                <option value="Republic of the Congo">Congo, Republic of the</option><option value="CostaRica">Costa Rica</option><option value="Côted’Ivoire">Côte d’Ivoire</option>
                                <option value="Croatia">Croatia</option><option value="Cuba">Cuba</option><option value="Cyprus">Cyprus</option>
                                <option value="CzechRepublic">Czech Republic</option><option value="Denmark">Denmark</option><option value="Djibouti">Djibouti</option>
                                <option value="Dominica">Dominica</option><option value="DominicanRepublic">Dominican Republic</option><option value="EastTimor">East Timor</option>
                                <option value="Ecuador">Ecuador</option><option value="Egypt">Egypt</option><option value="ElSalvador">El Salvador</option>
                                <option value="EquatorialGuinea">Equatorial Guinea</option><option value="Eritrea">Eritrea</option><option value="Estonia">Estonia</option>
                                <option value="Eswatini">Eswatini</option><option value="Ethiopia">Ethiopia</option><option value="Fiji">Fiji</option>
                                <option value="Finland">Finland</option><option value="France">France</option><option value="Gabon">Gabon</option>                       
                                <option value="Gambia">Gambia</option><option value="Georgia">Georgia</option><option value="Germany">Germany</option>
                                <option value="Ghana">Ghana</option><option value="Greece">Greece</option><option value="Grenada">Grenada</option>
                                <option value="Guatemala">Guatemala</option><option value="Guinea">Guinea</option><option value="GuineaBissau">Guinea-Bissau</option>

                                <option value="Guyana">Guyana</option><option value="Haiti">Haiti</option><option value="Honduras">Honduras</option>
                                <option value="Hungary">Hungary</option><option value="Iceland">Iceland</option><option value="India">India</option>
                                <option value="Indonesia">Indonesia</option><option value="Iran">Iran</option><option value="Iraq">Iraq</option>                       
                                <option value="Ireland">Ireland</option><option value="Israel">Israel</option><option value="Italy">Italy</option>
                                <option value="Jamaica">Jamaica</option><option value="Japan">Japan</option><option value="Jordan">Jordan</option>
                                <option value="Kazakhstan">Kazakhstan</option><option value="Kenya">Kenya</option><option value="Kiribati">Kiribati</option>

                                <option value="NorthKorea">Korea, North</option><option value="SouthKorea">Korea, North</option><option value="Kosovo">Kosovo</option>
                                <option value="Kuwait">Kuwait</option><option value="Kyrgyzstan">Kyrgyzstan</option><option value="Laos">Laos</option>
                                <option value="Latvia">Latvia</option><option value="Lebanon">Lebanon</option><option value="Lesotho">Lesotho</option>                       
                                <option value="Liberia">Liberia</option><option value="Libya">Libya</option><option value="Liechtenstein">Liechtenstein</option>
                                <option value="Lithuania">Lithuania</option><option value="Luxembourg">Luxembourg</option><option value="Madagascar">Madagascar</option>
                                <option value="Malawi">Malawi</option><option value="Maldives">Maldives</option><option value="Mali">Mali</option>
                                <option value="Malta">Malta</option><option value="MarshallIslands">Marshall Islands</option><option value="Mauritania">Mauritania</option>
                                <option value="Mauritius">Mauritius</option><option value="Mexico">Mexico</option><option value="Micronesia">Micronesia, Federated States of</option>
                                <option value="Moldova">Moldova</option><option value="Monaco">Monaco</option><option value="Mongolia">Mongolia</option>                       
                                <option value="Montenegro">Montenegro</option><option value="Morocco">Morocco</option><option value="Mozambique">Mozambique</option>
                                <option value="Myanmar">Myanmar</option><option value="Namibia">Namibia</option><option value="Nauru">Nauru</option>
                                <option value="Nepal">Nepal</option><option value="Netherlands">Netherlands</option><option value="NewZealand">New Zealand</option>
                                <option value="Nicaragua">Nicaragua</option><option value="Niger">Niger</option><option value="Nigeria">Nigeria</option>
                                <option value="NorthMacedonia">Macedonia, North</option><option value="Norway">Norway</option><option value="Oman">Oman</option>
                                <option value="Pakistan">Pakistan</option><option value="Palau">Palau</option><option value="Panama">Panama</option>                       
                                <option value="PapuaNewGuinea">Papua New Guinea</option><option value="Paraguay">Paraguay</option><option value="Peru">Peru</option>
                                <option value="Philippines">Philippines</option><option value="Poland">Poland</option><option value="Portugal">Portugal</option>
                                <option value="Qatar">Qatar</option><option value="Romania">Romania</option><option value="Russia">Russia</option><option value="Rwanda">Rwanda</option>
                       
                                <option value="SaintKittsandNevis">Saint Kitts and Nevis</option><option value="SaintLucia">Saint Lucia</option><option value="SaintVincentandtheGrenadines">Saint Vincent and the Grenadines</option>
                                <option value="Samoa">Samoa</option><option value="SanMarino">San Marino</option><option value="SaoTomeandPrincipe">Sao Tome and Principe</option>
                                <option value="SaudiArabia">Saudi Arabia</option><option value="Senegal">Senegal</option><option value="Serbia">Serbia</option>                       
                                <option value="Seychelles">Seychelles</option><option value="SierraLeone">Sierra Leone</option><option value="Singapore">Singapore</option>
                                <option value="Slovakia">Slovakia</option><option value="Slovenia">Slovenia</option><option value="SolomonIslands">Solomon Islands</option>
                                <option value="Somalia">Somalia</option><option value="SouthAfrica">South Africa</option><option value="Spain">Spain</option>
                                <option value="SriLanka">Sri Lanka</option><option value="Sudan">Sudan</option><option value="SouthSudan">Sudan, South</option>
                                <option value="Suriname">Suriname</option><option value="Sweden">Sweden</option><option value="Switzerland">Switzerland</option>
                                <option value="Syria">Syria</option><option value="Taiwan">Taiwan</option><option value="Tajikistan">Tajikistan</option>                       
                                <option value="Tanzania">Tanzania</option><option value="Thailand">Thailand</option><option value="Togo">Togo</option>
                                <option value="Tonga">Tonga</option><option value="TrinidadandTobago">Trinidad and Tobago</option><option value="Tunisia">Tunisia</option>
                                <option value="Turkey">Turkey</option><option value="Turkmenistan">Turkmenistan</option><option value="Tuvalu">Tuvalu</option>
                                <option value="Uganda">Uganda</option><option value="Ukraine">Ukraine</option><option value="UnitedArabEmirates">United Arab Emirates</option>
                                <option value="UnitedKingdom">United Kingdom</option><option value="UnitedStates">United States</option><option value="Uruguay">Uruguay</option>
                                <option value="Uzbekistan">Uzbekistan</option><option value="Vanuatu">Vanuatu</option><option value="VaticanCity">Vatican City</option>                       
                                <option value="Venezuela">Venezuela</option><option value="Vietnam">Vietnam</option><option value="Yemen">Yemen</option>
                                <option value="Zambia">Zambia</option><option value="Zimbabwe">Zimbabwe</option>
                        </select>
                        </label>
                        <br/>
                        <label>City 
                            <input type="text" name="city" value={this.state.updateUser.city||''} onChange={this.handleChange}/> <br/>
                        </label>
                       
                        <label>Program 
                            <input type="text" name="program" value={this.state.updateUser.program||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <br/>
                        <label>
                        <button
                            className="btn btn-link float-left"
                            onClick={this.handleClearForm}>Clear
                        </button>
                        <input type="button" name="Delete" onClick={this.handleSearch} value="Search"/>                        
                        <button type="submit">Delete</button>                                        
                        </label>
                </form>
            </div>            
      </div>
    );
  }
}

export default RemoveUser;
