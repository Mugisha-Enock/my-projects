import {useMemo} from 'react';import {Link,useParams} from 'react-router-dom';import DOMPurify from 'dompurify';import {useApp} from '../context/AppContext';import {useAuth} from '../context/AuthContext';import {useFetch} from '../hooks/useFetch';import {api} from '../services/api/client';
import Cover from '../components/Cover';import Card from '../components/Card';import {Loading,Err} from '../components/Status';import {TY} from '../data/constants';import {norm} from '../data/normalize';import {ft,ini} from '../utils';
export default function Article(){const {slug}=useParams(),{toast}=useApp(),{user}=useAuth(),{data,loading,error,reload}=useFetch(()=>api.getStory(slug),[slug]);
const s=useMemo(()=>data&&norm(data.story),[data]),rel=useMemo(()=>(data?.related||[]).map(norm),[data]),html=useMemo(()=>s?DOMPurify.sanitize(s.body):'',[s]);
if(loading)return <Loading h={500}/>;if(error)return <Err m={error==='Story not found'?'This story does not exist or is not published.':error} retry={reload}/>;
const a=s.author,copy=()=>navigator.clipboard?.writeText(location.href).then(()=>toast('Link copied.'),()=>toast('Copy failed. Copy it from the address bar.'));
const share=()=>navigator.share?navigator.share({url:location.href}).catch(()=>{}):toast('Sharing is not supported here. Use Copy link.');
const report=async()=>{if(!user)return toast('Sign in to report content.');const d=prompt('Briefly, what is wrong with this story?');if(d===null)return;try{await api.createReport({storyId:s.id,reason:'other',details:d});toast('Report received. A moderator will review it.')}catch(e){toast(e.message)}};
return <div className="w"><div className="art"><div className="bc"><Link to="/">Magazine</Link> / <Link to={'/explore/'+s.type}>{TY[s.type]}</Link> / {s.cat}</div>
<span className="pill">{s.cat}</span><h1>{s.title}</h1><p style={{color:'var(--tx2)',fontSize:19}}>{s.excerpt}</p>
<div className="mt" style={{margin:'16px 0'}}><span className="av">{ini(a.name)}</span><Link to={'/author/'+a.user} style={{color:'var(--tx)'}}><b>{a.name}</b></Link> · {ft(s.at)} · {s.read} min read · {s.views.toLocaleString()} views{s.status!=='published'&&<span className="st dr">{s.status.toUpperCase()} PREVIEW</span>}</div>
<div style={{borderRadius:8,overflow:'hidden',marginBottom:24}}><Cover s={s} h="360px"/></div>
{s.type==='video'&&s.videoUrl&&<p><a href={s.videoUrl} target="_blank" rel="noopener noreferrer" style={{color:'var(--sky)'}}>Watch the video →</a></p>}
<div className="bd" dangerouslySetInnerHTML={{__html:html}}/>
<div className="fl" style={{marginTop:20}}>{s.tags.map(t=><span key={t} className="chip">#{t}</span>)}</div>
<div className="row"><button className="btn" onClick={copy}>Copy link</button><button className="btn" onClick={share}>Share</button><button className="btn" onClick={report}>Report content</button></div>
<div className="box"><span className="av" style={{width:52,height:52,fontSize:18}}>{ini(a.name)}</span><div><b><Link to={'/author/'+a.user}>{a.name}</Link></b> <span className="mt">@{a.user}</span><div style={{color:'var(--tx2)',fontSize:14}}>{a.bio}</div></div></div></div>
{rel.length>0&&<><h2 className="t" style={{marginTop:30}}>Related <span>stories</span></h2><div className="grid g3" style={{marginBottom:50}}>{rel.map(r=><Card key={r.id} s={r}/>)}</div></>}</div>}
