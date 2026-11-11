import {useState} from 'react';import {PL} from '../data/constants';import {mediaUrl} from '../utils';
export default function Cover({s,h='180px'}){const [bad,setBad]=useState(false),n=s.gallery?.length||0;
return <div className="cv" style={{'--h':s.hue,height:h}} role="img" aria-label={'Cover for '+s.title}>
<svg viewBox="0 0 64 64" dangerouslySetInnerHTML={{__html:PL}}/>
{s.coverUrl&&!bad&&<img src={mediaUrl(s.coverUrl)} alt="" loading="lazy" onError={()=>setBad(true)}/>}
{s.type==='video'&&<u><svg viewBox="0 0 24 24" style={{width:20,fill:'#fff'}}><path d="M8 5l11 7-11 7z"/></svg></u>}{s.type==='photo'&&n>0&&<i>{n} photos</i>}</div>}
