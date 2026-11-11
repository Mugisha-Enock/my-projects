import {useState,useEffect,useCallback,useRef,useMemo} from 'react';import {useParams,useNavigate,useSearchParams} from 'react-router-dom';import {api} from '../services/api/client';import {rt} from '../services/realtime';
import Card from '../components/Card';import {Err} from '../components/Status';import {TY} from '../data/constants';import {norm} from '../data/normalize';
export default function Explore(){const {type=''}=useParams(),nav=useNavigate(),[sp]=useSearchParams(),seq=useRef(0);
const [q,setQ]=useState(sp.get('q')||''),[dq,setDq]=useState(q),[cat,setCat]=useState(''),[cats,setCats]=useState([]),[st,setSt]=useState({items:[],page:1,pages:1,loading:true,error:null});
useEffect(()=>{const t=setTimeout(()=>setDq(q),300);return()=>clearTimeout(t)},[q]);
const load=useCallback(async page=>{const id=++seq.current;setSt(s=>({...s,loading:true,error:null}));
  try{const d=await api.listStories({q:dq,type,category:cat,page,limit:9});if(id!==seq.current)return;setSt(s=>({items:page===1?d.items:[...s.items,...d.items],page:d.page,pages:d.pages,loading:false,error:null}));setCats(c=>[...new Set([...c,...d.items.map(i=>i.category)])])}
  catch(e){if(id===seq.current)setSt(s=>({...s,loading:false,error:e.message}))}},[dq,type,cat]);
useEffect(()=>{load(1)},[load]);
useEffect(()=>rt.on('story:new',s=>{if((!type||s.type===type)&&(!cat||s.category===cat)&&!dq)setSt(p=>p.items.some(x=>x.id===s.id)?p:{...p,items:[s,...p.items]})}),[type,cat,dq]);
const items=useMemo(()=>st.items.map(norm),[st.items]);
return <div className="w" style={{paddingTop:30}}><h2 className="t">Explore <span>Stories</span></h2>
<input className="f" placeholder="Search by title or keyword…" value={q} onChange={e=>setQ(e.target.value)} aria-label="Search stories"/>
<div className="fl" style={{marginTop:14}}>{['','news','photo','video','tech'].map(x=><button key={x} className={'chip '+(x===type?'on':'')} onClick={()=>nav(x?'/explore/'+x:'/explore')}>{x?TY[x]:'All'}</button>)}
<select className="f" style={{width:'auto',borderRadius:20}} value={cat} onChange={e=>setCat(e.target.value)} aria-label="Category"><option value="">All categories</option>{cats.map(c=><option key={c}>{c}</option>)}</select></div>
{st.error?<Err m={st.error} retry={()=>load(1)}/>:<>
{items.length>0&&<div className="grid g3">{items.map(s=><Card key={s.id} s={s}/>)}</div>}
{st.loading&&<div className="grid g3">{[0,1,2].map(i=><div key={i} className="sk" style={{height:300}}/>)}</div>}
{!st.loading&&!items.length&&<p style={{padding:'60px 0',textAlign:'center',color:'var(--tx2)'}}>No stories match your filters. Try a different keyword or category.</p>}
{!st.loading&&st.page<st.pages&&<p style={{textAlign:'center',marginTop:20}}><button className="btn" onClick={()=>load(st.page+1)}>Load more</button></p>}</>}</div>}
