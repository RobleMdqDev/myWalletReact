import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { rutaAPI } from '../../config/Config'
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import SignForm from './SignForm';
import "./login.css";

export default  function Login (props) {

	//HOOK PARA ESTADO DE FORMULARIO 
    const [formMood, setFormMood] = useState("/login");
    
                              
    // HOOK PARA INICIAR SESIÓN

    const [loginForm, setLoginForm] = useState({
        user: "",
        pass: ""
    });

    // HOOK PARA REGISTRO

    const [signForm, setSignForm] = useState({
      user: "",
      email:"",
      pass:""
  });

    // HOOK PARA MENSAJE DE ALERTA

    const [loginAlert, setLoginAlert] = useState();

	// CAPTURAMOS CAMBIOS EN MOOD

	const handleMood = (e)=>{
		setFormMood(e);
		setLoginAlert();
	}

    // CAPTURAR CAMBIOS DEL FORMULARIO

    const handleForm = e => {

      if(formMood === "/login"){
        setLoginForm({            
          ...loginForm,
          [e.target.name]: e.target.value 		  
      })      
      }else{
        setSignForm({            
          ...signForm,
          [e.target.name]: e.target.value          
      })
	  console.log(signForm);
      }

    }
	
	// EJECUTAMOS SUBMIT
    const loginDiv = document.querySelector(".formulario");
    
    let query = {};
        
	if (formMood === "/login") {
        query = loginForm;

    }else{
        query = signForm;
    }

	const handleLogin = async e => {
        e.preventDefault();
        console.log({query: query});
        
        const respuesta = await loginAPI(query, formMood);
        if(respuesta.status !== 200){

           
            setLoginAlert(
               <p className="text-danger alert alert-danger">{respuesta.message}</p>
            );
            if(loginDiv){
              loginDiv.classList.add("vibra");
              setTimeout(()=>{
                loginDiv.classList.remove("vibra");
              }, 500);
            }

            document.querySelector("form").reset();
                        
            
        }else{
			
             if (formMood === "/login") {
               setLoginAlert(
                 <p className='text-success alert alert-success'>
                   LOGIN SUCCESS!
                 </p>
               );
               localStorage.setItem("ACCESS_TOKEN", respuesta.token.token);
               localStorage.setItem("USER", respuesta.user);
               localStorage.setItem("USER_ID", respuesta.token.user_id[0].id);
              console.log(respuesta);
               			   
               setTimeout(() => {
                 window.location.href = "/";
               }, 1000);
             } else {
               setLoginAlert(
                 <p className='text-success alert alert-success'>
                   REGISTRO EXITOSO!
                 </p>
               );
               setTimeout(() => {
                 window.location.href = "/";
               }, 1000);
             }

			 loginDiv.classList.add("agrandar");
            setTimeout(()=>{
              loginDiv.classList.remove("agrandar");
            }, 500);                     
			
            
        }   
              
         
    }

    

	// HOOK que contiene el formulario
    const [form, setForm] = useState();
        
    useEffect(() => {
      if(formMood === "/login"){
        
        setForm(<LoginForm form={handleForm} login={handleLogin} mood={handleMood} loginAlert={loginAlert}/>)
                
      }else{
     
        setForm(<SignForm form={handleForm} login={handleLogin} mood={handleMood} loginAlert={loginAlert}/>)
        
      }      
    },[formMood, query, loginAlert]);   
	

	return(
		<>
			<div className="login">
				{form}
			</div>
		</>
	);

}

// PETICIÓN POST LOGIN

const loginAPI = async (data, formMood) => {

    const respuesta = await axios.post(rutaAPI+formMood, data)
    .then( res =>{
            
            return res.data;
			
    }).catch( err => {
           
           return err;
    })
    console.log({respuestaAPI: respuesta});
    
    return respuesta
    
}

