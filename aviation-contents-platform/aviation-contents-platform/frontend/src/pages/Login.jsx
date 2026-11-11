import {useState} from 'react';import {Link,useNavigate,useLocation} from 'react-router-dom';import {useAuth} from '../context/AuthContext';
export default function Login(){const {login}=useAuth(),nav=useNavigate(),loc=useLocation(),[f,setF]=useState({identifier:'',password:''}),[show,setShow]=useState(false),[err,setErr]=useState(''),[busy,setBusy]=useState(false);
const submit=async e=>{e.preventDefault();if(!f.identifier.trim()||!f.password)return setErr('Enter your email or username and your password.');setBusy(true);setErr('');
  try{await login({identifier:f.identifier.trim(),password:f.password});nav(loc.state?.from||'/',{replace:true})}catch(x){setErr(x.message)}finally{setBusy(false)}};
return <form className="auth" onSubmit={submit} noValidate><h2>Sign in</h2><p style={{color:'var(--tx2)',margin:0}}>Welcome back to Aviation Contents.</p>
<label htmlFor="id">Email or username</label><input className="f" id="id" autoComplete="username" value={f.identifier} onChange={e=>setF({...f,identifier:e.target.value})}/>
<label htmlFor="pw">Password</label><div style={{display:'flex',gap:8}}><input className="f" id="pw" type={show?'text':'password'} autoComplete="current-password" value={f.password} onChange={e=>setF({...f,password:e.target.value})}/><button type="button" className="btn" onClick={()=>setShow(s=>!s)}>{show?'Hide':'Show'}</button></div>
<div className="er" role="alert" style={{marginTop:10}}>{err}</div><button className="btn g" style={{width:'100%',marginTop:14}} disabled={busy}>{busy?'Signing in…':'Sign In'}</button>
<p style={{color:'var(--tx2)',fontSize:14}}>New here? <Link to="/register" style={{color:'var(--sky)'}}>Create an account</Link></p></form>}
