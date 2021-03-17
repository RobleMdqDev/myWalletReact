import React from 'react'
import "./login.css";

export default function LoginForm ({form, login, mood, loginAlert}){
    
      
    const handleLogin =(e)=>{
        e.preventDefault();
        login(e);
    };


    return (
      <div className='formulario login-dark'>
        
        <form
          id='login'
          onChange={form}
          onSubmit={(e) => {
            handleLogin(e);
          }}>
          <h2 className='text-light'>Log-in</h2>
          <hr className="bg-light"/>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              name='user'
              placeholder='Username'
            />
          </div>

          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              name='pass'
              placeholder='Password'
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-primary btn-block' type='submit'>
              Log In
            </button>
          </div>
          <div>{loginAlert}</div>
          <a
          className="mb-3"
          href='#/'
          onClick={() => {
            mood("/signin");
          }}>
          Sign Up!
        </a>
        
        </form>        
      </div>
    );
}

