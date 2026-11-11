import {Navigate,useLocation} from 'react-router-dom';import {useAuth} from '../context/AuthContext';
export default function RequireAuth({children,roles}){const {user,loading}=useAuth(),loc=useLocation();
  if(loading)return <div className="w"><div className="sk" style={{height:200,margin:'40px 0'}}/></div>;
  if(!user)return <Navigate to="/login" state={{from:loc.pathname}} replace/>;
  if(roles&&!roles.includes(user.role))return <div className="w" style={{padding:'80px 20px',textAlign:'center'}}><h2>Not allowed</h2><p style={{color:'var(--tx2)'}}>Your account does not have access to this page.</p></div>;
  return children}
