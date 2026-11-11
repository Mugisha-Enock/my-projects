// Maps an API story to the shape the UI components use.
export const hueOf=id=>{let h=0;for(const c of String(id))h=(h*31+c.charCodeAt(0))%360;return h};
export const norm=s=>({id:s.id,slug:s.slug,title:s.title,excerpt:s.excerpt,body:s.body,type:s.type,cat:s.category,tags:s.tags||[],status:s.status,
  at:new Date(s.publishedAt||s.createdAt).getTime(),upd:new Date(s.updatedAt||s.createdAt).getTime(),read:s.readingTime||1,views:s.views||0,hue:hueOf(s.id),
  coverUrl:s.coverUrl,videoUrl:s.videoUrl,gallery:s.gallery||[],
  author:{id:s.author?.id,name:s.author?.displayName||'Unknown',user:s.author?.username||'',bio:s.author?.bio||'',joined:s.author?.createdAt}});
