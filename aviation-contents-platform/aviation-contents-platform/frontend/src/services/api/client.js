const BASE=import.meta.env.VITE_API_URL||'/api';
export class ApiError extends Error{constructor(status,message,details){super(message);this.status=status;this.details=details}}
async function req(path,{method='GET',body,form}={}){let r;
  try{r=await fetch(BASE+path,{method,credentials:'include',headers:body?{'Content-Type':'application/json'}:undefined,body:form||(body?JSON.stringify(body):undefined)})}
  catch{throw new ApiError(0,'Cannot reach the server. Is the API running?')}
  const d=await r.json().catch(()=>({}));if(!r.ok)throw new ApiError(r.status,d.error||'Request failed',d.details);return d}
const qs=o=>{const p=new URLSearchParams();Object.entries(o||{}).forEach(([k,v])=>v!==''&&v!=null&&p.set(k,v));const s=p.toString();return s?'?'+s:''};
export const api={
  register:b=>req('/auth/register',{method:'POST',body:b}),login:b=>req('/auth/login',{method:'POST',body:b}),logout:()=>req('/auth/logout',{method:'POST'}),me:()=>req('/auth/me'),
  listStories:q=>req('/stories'+qs(q)),myStories:q=>req('/stories/mine'+qs(q)),getStory:slug=>req('/stories/'+encodeURIComponent(slug)),
  createStory:b=>req('/stories',{method:'POST',body:b}),updateStory:(id,b)=>req('/stories/'+id,{method:'PUT',body:b}),deleteStory:id=>req('/stories/'+id,{method:'DELETE'}),
  setStatus:(id,status)=>req('/stories/'+id+'/status',{method:'PATCH',body:{status}}),getProfile:u=>req('/users/'+encodeURIComponent(u)),
  listMagazines:()=>req('/magazines'),createReport:b=>req('/reports',{method:'POST',body:b}),
  uploadMedia:files=>{const f=new FormData();files.forEach(x=>f.append('files',x));return req('/media',{method:'POST',form:f})},
  dashStats:()=>req('/dashboard/stats'),dashContent:q=>req('/dashboard/content'+qs(q)),listReports:q=>req('/reports'+qs(q)),setReportStatus:(id,status)=>req('/reports/'+id,{method:'PATCH',body:{status}})};
