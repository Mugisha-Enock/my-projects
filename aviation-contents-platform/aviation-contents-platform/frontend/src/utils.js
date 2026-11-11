export const fd=t=>new Date(t).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
export const ft=t=>fd(t)+', '+new Date(t).toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'});
export const ini=n=>(n||'?').split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase();
export const slugify=t=>t.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
export const textToHtml=t=>t.trim().split(/\n\n+/).map(p=>'<p>'+esc(p).replace(/\n/g,'<br>')+'</p>').join('');
export const htmlToText=h=>{const d=new DOMParser().parseFromString(h||'','text/html'),ps=[...d.body.children].map(e=>e.textContent);return(ps.length?ps:[d.body.textContent]).join('\n\n')};
const A=import.meta.env.VITE_API_URL||'';
export const mediaUrl=u=>!u?'':/^https?:/.test(u)?u:(/^https?:/.test(A)?new URL(A).origin:'')+u;
