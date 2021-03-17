import Router from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';

import jwtDecode from 'jwt-decode';

import Login from './components/login/Login';

function App() {

  const auth = getAccessToken();

  if(!auth){
    return(
      <Login />
    )
  }

  return (
           
    <Router />
   
  );
}

export default App;

// FUNCION PARA VALIDAR TOKEN

const getAccessToken = ()=>{
  const accessToken = localStorage.getItem("ACCESS_TOKEN");  
  const user = localStorage.getItem("USER");

  if(!accessToken || accessToken === "null" ||     
     !user || user === "null"
  ){
    return false;
  }

  const metaToken = jwtDecode(accessToken);    
  
  if ( tokenExpira(accessToken, metaToken) || metaToken.user !== user) {
    return false
  }else{
    return true;
  }
}

// FUNCION PARA VERIFICAR FECHA DE EXPIRACION TOKEN

const tokenExpira = (accessToken, metaToken)=>{

  const seconds = 60;
  
  const { exp } = metaToken;
  console.log(metaToken);
  const now = (Date.now()+seconds) / 1000;

  // console.log("now: ", now, "exp: ", exp);

  return exp < now;

}