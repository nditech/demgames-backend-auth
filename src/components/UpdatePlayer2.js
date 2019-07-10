import React, { Component } from 'react';
import moment from 'moment';
import '../App.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



class UpdatePlayer2 extends Component {
  
    constructor(props){
        super(props);

        this.state={
                current:0,
                score:0,
                play_id:null,
                player_id:null,
                game_id:null,
                email:this.props.email,
                player_id:null,
                firstname:this.props.given_name,
                middlename:this.props.middlename||null,
                family_name:this.props.family_name,
                username:this.props.username,
                picture:this.props.picture,
                gender:this.props.gender,
                total:0,
                program_rank:null,
                total_rank:null,
                useridI:null,
                user_email:null,
                
                searched:{
                    current:0,
                    score:0,
                    play_id:null,
                    player_id:null,
                    game_id:null,
                    email:null,
                    player_id:null,
                    firstname:null,
                    middlename:null,
                    family_name:null,
                    dateOfBirth:null,
                    username:null,
                    picture:null,
                    gender:null,
                    total:0,
                    program_rank:null,
                    total_rank:null,
                } 
        }                    
       
        this.handleSearch=this.handleSearch.bind(this);       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit  = this.handleSubmit.bind(this);
        this.handleClearForm = this.handleClearForm.bind(this);    
        this.logout=this.logout.bind(this);  
    }

    handleClearForm(){
        alert("Hello");
    }

    logout(){
        this.props.auth0.logout()
    }
    
    handleSearch(event){
        event.preventDefault();
        if(this.state.searched.user_email!==null)
        {   
            const url =`http://localhost:3001/selectPlayer`;
            fetch(url, {
                method: 'POST',
                headers: {
                  "Content-Type": "Application/json",
                  "Accept":"application/json"
                },
                body: JSON.stringify({email:this.state.user_email}),
                mode:'cors'
            })                           
            .then((res) => res.json())      
            .then((data)=>{
            console.log(data);            
            const newState = 
            {...this.state.searched, 
                    player_id:data[0].player_id,
                    firstname:data[0].firstname,
                    middlename:data[0].middlename,
                    family_name:data[0].lastname,
                    username:data[0].username,
                    email:data[0].email,
                    city:data[0].city,
                    country:data[0].country,
                    gender:data[0].gender,
                    dateOfBirth:data[0].dateOfBirth,
                    program:data[0].program
            }                   
            this.setState(
                {
                    searched:newState
                }
                ,()=> console.log("Data is pooled from server.")
            );
        })
        .catch((error)=>console.log(error))  
        }
    }


    handleChange(event) { 
        event.preventDefault();    
        var val=event.target.value;              
        switch(event.target.name){
            case "user_email":
            {   
                var val=event.target.value;                 
                this.setState(
                    {
                        user_email:val
                    }
                    ,()=> console.log(this.state.user_email)
                );
                break;
            }
            case "firstname":
            {   
                var val=event.target.value; 
                const newState = {...this.state.searched, firstname: val}   
                
                this.setState(
                    {
                        searched:newState
                    }
                    ,()=> console.log(this.state.searched.firstname)
                );
                break;
            }
            case "middlename":
            {   
                var val=event.target.value; 
                const newState = {...this.state.searched, middlename: val}   
                
                this.setState(
                    {
                        searched:newState
                    }
                    ,()=> console.log(this.state.searched.middlename)
                );
                break;
            }
            case "family_name":
            {   
                var val=event.target.value; 
                const newState = {...this.state.searched, family_name: val}   
                
                this.setState(
                    {
                        searched:newState
                    }
                    ,()=> console.log(this.state.searched.family_name)
                );
                break;
            } 
            case "username":
            {   
                var val=event.target.value; 
                const newState = {...this.state.searched, username: val}   
                
                this.setState(
                    {
                        searched:newState
                    }
                    ,()=> console.log(this.state.searched.username)
                );
                break;
            }
            case "gender":
                    {   
                        var val=event.target.value; 
                        const newState = {...this.state.searched, gender: val}   
                        
                        this.setState(
                            {
                                searched:newState
                            }
                            ,()=> console.log(this.state.searched.gender)
                        );
                        break;
                    }
            case "program":
            {   
                var val=event.target.value; 
                const newState = {...this.state.searched, program: val}   
                
                this.setState(
                    {
                        searched:newState
                    }
                    ,()=> console.log(this.state.searched.program)
                );
                break;
            }
            case "city":
            {   
                var val=event.target.value; 
                const newState = {...this.state.searched, city: val}   
                
                this.setState(
                    {
                        searched:newState
                    }
                    ,()=> console.log(this.state.searched.city)
                );
                break;
            } 
            case "country":
            {   
                var val=event.target.value; 
                const newState = {...this.state.searched, country: val}   
                
                this.setState(
                    {
                        searched:newState
                    }
                    ,()=> console.log(this.state.searched.country)
                );
                break;
            }
            case "dateOfBirth":
            {   
                var val=event.target.value; 
                const newState = {...this.state.searched, dateOfBirth: val}   
                
                this.setState(
                    {
                        searched:newState
                    }
                    ,()=> console.log(this.state.searched.dateOfBirth)
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

   handleSubmit(event) 
   {          
       event.preventDefault(); 
       const data={
                    player_id:this.state.searched.player_id,
                    given_name:this.state.searched.firstname,
                    middle_name:this.state.searched.middlename,
                    family_name:this.state.searched.family_name,
                    username:this.state.searched.username,
                    email:this.state.searched.email,
                    city:this.state.searched.city,
                    country:this.state.searched.country,
                    gender:this.state.searched.gender,
                    dateOfBirth:this.state.searched.dateOfBirth,
                    program:this.state.searched.program
        }             
       const url ="http://localhost:3001/updateplayer";
       fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "Application/json",
          "Accept":"application/json"
        },
        body: JSON.stringify(data),
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
                <form className="playerForm" onSubmit={this.handleSearch} >
                            <label>Search by Player email 
                                <input type="text" name="user_email" value={this.state.user_email||''} onChange={this.handleChange}/> <br/>
                            </label>
                            <input type="submit" value="Search"/>    
                </form>

                <div className='formParent' style={{display: 'true'}}>
                <form className="updateForm" onSubmit={this.handleSubmit}>
                        <label>Player Id 
                            <input type="text" name="player_id" value={this.state.searched.player_id||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>First name 
                            <input type="text" name="firstname" value={this.state.searched.firstname||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Middle name 
                            <input type="text" name="middlename" value={this.state.searched.middlename||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Last name 
                            <input type="text" name="family_name" value={this.state.searched.family_name||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>User name 
                            <input type="text" name="username" value={this.state.searched.username||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>email 
                            <input type="text" name="email" value={this.state.searched.email||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <label>Gender 
                            <input type="radio" name="gender" value="Female" checked={this.state.searched.gender==='Female'} onChange={this.handleChange}/> Female
                            <input type="radio" name="gender" value="Male" checked={this.state.searched.gender==='Male'}  onChange={this.handleChange}  /> Male 
                            <input type="radio" name="gender" value="Other" checked={this.state.searched.gender==='Other'}  onChange={this.handleChange} /> Other  
                            <br/>
                        </label>
                        <label>Date of Birth 
                        <DatePicker name="dateOfBirth" onChange={this.handleDate} value={(moment(this.state.searched.dateOfBirth).format('MM-DD-YYYY'))}  isClearable={true} dateFormat="MM/dd/yyyy" placeholderText="MM/dd/yyyy"/> <br/>
                        </label>
                        <label> Country
                        <select name="country" value={this.state.searched.country} onChange={this.handleChange} >
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
                            <input type="text" name="city" value={this.state.searched.city||''} onChange={this.handleChange}/> <br/>
                        </label>
                       
                        <label>Program 
                            <input type="text" name="program" value={this.state.searched.program||''} onChange={this.handleChange}/> <br/>
                        </label>
                        <br/>
                        <label>
                        <button
                            onClick={this.handleClearForm}>Clear
                        </button>                                            
                        <button type="submit">Update</button>    
                        <button onClick={this.logout}>Log out</button>                                    
                        </label>
                </form>
                </div>
            </div>            
      </div>
    );
  }
}

export default UpdatePlayer2;
