import {useState} from 'react';import {Link,useNavigate} from 'react-router-dom';import {useAuth} from '../context/AuthContext';
export default function Register(){const {register}=useAuth(),nav=useNavigate(),[f,setF]=useState({displayName:'',username:'',email:'',password:'',confirm:'',terms:false}),[E,setE]=useState({}),[busy,setBusy]=useState(false);
const set=k=>e=>setF({...f,[k]:k==='terms'?e.target.checked:e.target.value});
const submit=async e=>{e.preventDefault();const v={};if(f.displayName.trim().length<2)v.displayName='Enter your display name.';if(!/^[a-zA-Z0-9_]{3,24}$/.test(f.username))v.username='3-24 letters, numbers or underscores.';if(!/^\S+@\S+\.\S+$/.test(f.email))v.email='Enter a valid email address.';
  if(f.password.length<8)v.password='Use at least 8 characters.';if(f.confirm!==f.password)v.confirm='Passwords do not match.';if(!f.terms)v.terms='You must accept the terms and community guidelines.';
  setE(v);if(Object.keys(v).length)return;setBusy(true);
  try{await register({displayName:f.displayName.trim(),username:f.username,email:f.email.trim(),password:f.password,terms:true});nav('/',{replace:true})}
  catch(x){const d=x.details||{};setE({...Object.fromEntries(Object.entries(d).map(([k,m])=>[k,m[0]])),form:x.message})}finally{setBusy(false)}};
const Fld=({k,label,type='text',ac})=><><label htmlFor={k}>{label}</label><input className="f" id={k} type={type} autoComplete={ac} value={f[k]} onChange={set(k)}/><div className="er">{E[k]}</div></>;
return <form className="auth" onSubmit={submit} noValidate><h2>Create your account</h2><p style={{color:'var(--tx2)',margin:0}}>Publish stories under your own name.</p>
<Fld k="displayName" label="Display name" ac="name"/><Fld k="username" label="Unique username" ac="username"/><Fld k="email" label="Email address" type="email" ac="email"/><Fld k="password" label="Password" type="password" ac="new-password"/><Fld k="confirm" label="Confirm password" type="password" ac="new-password"/>
<label style={{display:'flex',gap:8,alignItems:'center'}}><input type="checkbox" checked={f.terms} onChange={set('terms')}/>I agree to the Terms of Use and Community Guidelines</label><div className="er">{E.terms}</div>
<div className="er" role="alert">{E.form}</div><button className="btn g" style={{width:'100%',marginTop:10}} disabled={busy}>{busy?'Creating…':'Create Account'}</button>
<p style={{color:'var(--tx2)',fontSize:14}}>Already a member? <Link to="/login" style={{color:'var(--sky)'}}>Sign in</Link></p></form>}
