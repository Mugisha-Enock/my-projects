import {useState,useMemo} from 'react';import {Link} from 'react-router-dom';import {useApp} from '../context/AppContext';import {useFetch} from '../hooks/useFetch';import {api} from '../services/api/client';import {Loading,Err} from '../components/Status';import {fd} from '../utils';
const ST=['draft','pending','published','archived'];
export default function Dashboard(){const {toast}=useApp(),[fs,setFs]=useState(''),stats=useFetch(()=>api.dashStats(),[]),content=useFetch(()=>api.dashContent({status:fs}),[fs]),reps=useFetch(()=>api.listReports({status:'open'}),[]);
const act=async(fn,msg)=>{try{await fn();toast(msg);content.reload();stats.reload();reps.reload()}catch(e){toast(e.message)}};
if(stats.loading)return <Loading/>;if(stats.error)return <Err m={stats.error} retry={stats.reload}/>;const s=stats.data;
const cards=[['Total publications',s.total],['Published',s.published],['Drafts',s.drafts],['Pending review',s.pending],['Contributors',s.contributors],['Open reports',s.openReports]];
return <div className="w" style={{paddingTop:30,paddingBottom:50}}><h2 className="t">Publishing <span>Dashboard</span></h2>
<div className="grid g3">{cards.map(([l,n])=><div className="stat" key={l}><b>{n}</b>{l}</div>)}</div>
<h3 style={{margin:'30px 0 12px'}}>Content management</h3><div className="fl">{['',...ST].map(x=><button key={x} className={'chip '+(fs===x?'on':'')} onClick={()=>setFs(x)}>{x||'All'}</button>)}</div>
{content.error?<Err m={content.error} retry={content.reload}/>:<div className="sc"><table><thead><tr><th>Title</th><th>Author</th><th>Updated</th><th>Status</th></tr></thead><tbody>
{(content.data?.items||[]).map(c=><tr key={c.id}><td><Link to={'/article/'+c.slug} style={{color:'var(--sky)'}}>{c.title}</Link></td><td>@{c.author?.username}</td><td>{fd(c.updatedAt)}</td>
<td><select className="f" style={{width:'auto',padding:'4px 8px'}} value={c.status} aria-label="Status" onChange={e=>act(()=>api.setStatus(c.id,e.target.value),'Status updated.')}>{ST.map(x=><option key={x}>{x}</option>)}</select></td></tr>)}</tbody></table></div>}
<h3 style={{margin:'30px 0 12px'}}>Reported content</h3>
{reps.data?.items?.length?<div className="sc"><table><thead><tr><th>Story</th><th>Reason</th><th>Details</th><th>Action</th></tr></thead><tbody>{reps.data.items.map(r=><tr key={r.id}><td>{r.story?<Link to={'/article/'+r.story.slug} style={{color:'var(--sky)'}}>{r.story.title}</Link>:'(deleted)'}</td><td>{r.reason}</td><td>{r.details}</td>
<td><button className="btn" onClick={()=>act(()=>api.setReportStatus(r.id,'resolved'),'Report resolved.')}>Resolve</button> <button className="btn" onClick={()=>act(()=>api.setReportStatus(r.id,'dismissed'),'Report dismissed.')}>Dismiss</button></td></tr>)}</tbody></table></div>:<p style={{color:'var(--tx2)'}}>No open reports.</p>}
<h3 style={{margin:'30px 0 12px'}}>Recent activity</h3>{s.recent.map(r=><div key={r.id} className="mt" style={{padding:'4px 0'}}>{fd(r.updatedAt)} · <b style={{color:'var(--tx)'}}>{r.title}</b> by @{r.author?.username} ({r.status})</div>)}</div>}
