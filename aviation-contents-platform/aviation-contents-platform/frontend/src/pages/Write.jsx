import {useState,useEffect} from 'react';import {Link,useNavigate,useParams} from 'react-router-dom';import {useApp} from '../context/AppContext';import {useAuth} from '../context/AuthContext';import {api} from '../services/api/client';import {TY} from '../data/constants';import {slugify,textToHtml,htmlToText,mediaUrl} from '../utils';
const KEY={body:'text'};
export default function Write(){const {slug}=useParams(),{user}=useAuth(),{toast}=useApp(),nav=useNavigate();
const [id,setId]=useState(null),[f,setF]=useState({title:'',slug:'',excerpt:'',text:'',type:'news',category:'',tags:'',coverUrl:''}),[man,setMan]=useState(false),[E,setE]=useState({}),[busy,setBusy]=useState(false),[up,setUp]=useState(false),[load,setLoad]=useState(!!slug);
useEffect(()=>{if(!slug)return;api.getStory(slug).then(({story:s})=>{setId(s.id);setMan(true);setF({title:s.title,slug:s.slug,excerpt:s.excerpt,text:htmlToText(s.body),type:s.type,category:s.category,tags:(s.tags||[]).join(', '),coverUrl:s.coverUrl||''})}).catch(e=>toast(e.message)).finally(()=>setLoad(false))},[slug,toast]);
const set=k=>e=>{const v=e.target.value;setF(p=>({...p,[k]:v,...(k==='title'&&!man?{slug:slugify(v)}:{})}));if(k==='slug')setMan(true)};
const words=f.text.trim()?f.text.trim().split(/\s+/).length:0,read=Math.max(1,Math.ceil(words/220));
const pick=async e=>{const file=e.target.files[0];e.target.value='';if(!file)return;const bad=m=>setE(x=>({...x,cover:m}));
  if(!/^image\/(jpeg|png|webp|gif)$/.test(file.type))return bad('Use a JPG, PNG, WebP or GIF image.');if(file.size>8*1024*1024)return bad('Image must be under 8 MB.');
  setUp(true);setE(x=>({...x,cover:''}));try{const d=await api.uploadMedia([file]);setF(p=>({...p,coverUrl:d.files[0].url}))}catch(x){bad(x.message)}finally{setUp(false)}};
const go=async status=>{const e={};if(f.title.trim().length<8)e.title='Title must be at least 8 characters.';if(f.excerpt.trim().length<20)e.excerpt='Excerpt must be at least 20 characters.';if(f.text.trim().length<60)e.text='Body must be at least 60 characters.';if(f.category.trim().length<2)e.category='Choose a category.';
  setE(e);if(Object.keys(e).length)return toast('Please fix the highlighted fields.');
  const body={title:f.title.trim(),excerpt:f.excerpt.trim(),body:textToHtml(f.text),type:f.type,category:f.category.trim(),tags:f.tags.split(',').map(x=>x.trim()).filter(Boolean),status,...(f.slug.trim()?{slug:f.slug.trim()}:{}),...(f.coverUrl?{coverUrl:f.coverUrl}:{})};
  setBusy(true);try{const {story}=id?await api.updateStory(id,body):await api.createStory(body);
    toast(story.status==='published'?'Story published.':story.status==='pending'?'Submitted for editorial review.':'Draft saved.');nav(story.status==='published'?'/article/'+story.slug:'/my-content')}
  catch(x){const d=x.details||{};setE(Object.fromEntries(Object.entries(d).map(([k,v])=>[KEY[k]||k,v[0]])));toast(x.message)}finally{setBusy(false)}};
const Er=({k})=><div className="er">{E[k]}</div>;if(load)return <div className="w"><div className="sk" style={{height:400,margin:'30px 0'}}/></div>;
return <div className="w" style={{paddingTop:30}}><h2 className="t">{id?'Edit':'Write a'} <span>Story</span></h2><div className="ed"><form noValidate onSubmit={e=>e.preventDefault()}>
<label htmlFor="ti">Title</label><input className="f" id="ti" value={f.title} onChange={set('title')}/><Er k="title"/>
<label htmlFor="sl">URL slug (auto-generated, editable)</label><input className="f" id="sl" value={f.slug} onChange={set('slug')}/><Er k="slug"/>
<label htmlFor="ex">Excerpt</label><textarea className="f" id="ex" rows={2} value={f.excerpt} onChange={set('excerpt')}/><Er k="excerpt"/>
<label htmlFor="bo">Story body (blank line = new paragraph)</label><textarea className="f" id="bo" rows={12} value={f.text} onChange={set('text')}/><Er k="text"/>
<div className="mt" style={{marginTop:6}}>{words} words · {read} min read</div></form>
<aside><div className="pv"><b>Publishing</b>
<label htmlFor="ty">Content type</label><select className="f" id="ty" value={f.type} onChange={set('type')}>{Object.entries(TY).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select>
<label htmlFor="ca">Category</label><input className="f" id="ca" value={f.category} onChange={set('category')}/><Er k="category"/>
<label htmlFor="tg">Tags (comma separated)</label><input className="f" id="tg" value={f.tags} onChange={set('tags')}/>
<label htmlFor="im">Featured image</label>{f.coverUrl&&<img src={mediaUrl(f.coverUrl)} alt="Featured" style={{width:'100%',borderRadius:6,marginBottom:8}}/>}
<input id="im" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={pick} disabled={up}/>{up&&<div className="mt">Uploading…</div>}{f.coverUrl&&<button className="btn" style={{marginTop:8}} onClick={()=>setF(p=>({...p,coverUrl:''}))}>Remove image</button>}<Er k="cover"/>
<div className="row"><button className="btn g" disabled={busy||up} onClick={()=>go('published')}>{busy?'Saving…':'Publish Story'}</button><button className="btn" disabled={busy||up} onClick={()=>go('draft')}>Save Draft</button><Link className="btn" to="/my-content">Cancel</Link></div>
<div className="mt" style={{marginTop:10}}>Publishing as <b style={{color:'var(--tx)'}}>{user.displayName}</b> (set by the server from your session)</div></div>
<div className="pv" style={{marginTop:14}}><b>Live preview</b><h3 style={{margin:'8px 0'}}>{f.title||'Untitled'}</h3><div style={{color:'var(--tx2)',fontSize:14}}>{f.text.split(/\n\n+/).filter(Boolean).map((p,i)=><p key={i}>{p}</p>)}</div></div></aside></div></div>}
