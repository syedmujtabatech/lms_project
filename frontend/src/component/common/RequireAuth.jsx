import React, { useContext } from 'react';
import { AuthContext } from '../Context'; 
import { Navigate } from 'react-router-dom';
export const RequireAuth = ({children}) => {
  const {user} = useContext(AuthContext);
  
  if(!user){
    console.log('user k pas agya mh');
    return <Navigate to={'/account/login'}/>
  }
  return children;
}

export default RequireAuth;
