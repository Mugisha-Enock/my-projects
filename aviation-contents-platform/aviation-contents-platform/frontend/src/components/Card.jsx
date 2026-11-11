import {Link} from 'react-router-dom';import Cover from './Cover';import {TY} from '../data/constants';import {fd,ini} from '../utils';
export const By=({s})=><Link to={'/author/'+s.author.user} className="mt"><span className="av" style={{width:22,height:22,fontSize:9}}>{ini(s.author.name)}</span>{s.author.name}</Link>;
export default function Card({s}){return <article className="cd"><Link to={'/article/'+s.slug}><Cover s={s}/></Link><div className="cb">
<span className="ci">{s.cat} · {TY[s.type]}</span><h3><Link to={'/article/'+s.slug}>{s.title}</Link></h3><p>{s.excerpt}</p>
<div className="mt"><By s={s}/></div><div className="mt">{fd(s.at)} · {s.read} min read · {s.views.toLocaleString()} views</div>
<Link className="act" to={'/article/'+s.slug}>Read Story →</Link></div></article>}
