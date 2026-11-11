import {useState,useEffect} from 'react';import {Link,NavLink,Outlet,useNavigate,useLocation} from 'react-router-dom';
import {PL} from '../data/constants';import {useApp} from '../context/AppContext';import {useAuth} from '../context/AuthContext';import {ini} from '../utils';
const cl=({isActive})=>isActive?'on':'';
export default function Layout(){const [open,setOpen]=useState(false),nav=useNavigate(),{toasts}=useApp(),{user,logout}=useAuth(),loc=useLocation();
useEffect(()=>{setOpen(false);window.scrollTo(0,0)},[loc.pathname]);
return <>
<header><div className="w hd">
<Link className="logo" to="/"><svg viewBox="0 0 64 64" dangerouslySetInnerHTML={{__html:PL}}/>Aviation <b>Contents</b></Link>
<nav className={open?'open':''} aria-label="Main"><NavLink end className={cl} to="/">Magazine</NavLink><NavLink end className={cl} to="/explore">Explore</NavLink><NavLink className={cl} to="/explore/photo">Photos</NavLink><NavLink className={cl} to="/explore/video">Videos</NavLink>
{user&&<NavLink className={cl} to="/my-content">My Content</NavLink>}{user&&['editor','admin'].includes(user.role)&&<NavLink className={cl} to="/dashboard">Dashboard</NavLink>}
{user&&<button className="lk" onClick={async()=>{await logout();nav('/')}}>Sign out</button>}</nav>
<span className="sp"/>
<input className="sr" type="search" placeholder="Search stories…" aria-label="Search" onKeyDown={e=>e.key==='Enter'&&nav('/explore?q='+encodeURIComponent(e.target.value))}/>
<Link className="btn g" to="/write">Write a Story</Link>
{user?<Link to={'/author/'+user.username} className="av" title={user.displayName}>{ini(user.displayName)}</Link>:<Link className="btn" to="/login">Sign In</Link>}
<button className="mb" aria-label="Menu" onClick={()=>setOpen(o=>!o)}>Menu</button></div></header>
<main><Outlet/></main>
<footer><div className="w"><div className="row"><Link to="/">About</Link><Link to="/">Contact</Link><Link to="/">Community Guidelines</Link><Link to="/">Privacy Policy</Link><Link to="/">Terms of Use</Link></div>© 2026 Aviation Contents</div></footer>
<div id="toast" role="status" aria-live="polite">{toasts.map(t=><div className="ts" key={t.id}><span>{t.m}</span>{t.href&&<Link to={t.href} style={{color:'var(--sky)'}}>{t.label}</Link>}</div>)}</div></>}
