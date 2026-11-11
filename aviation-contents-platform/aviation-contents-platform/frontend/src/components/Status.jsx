export const Loading=({h=300})=><div className="w"><div className="sk" style={{height:h,margin:'30px 0'}}/></div>;
export const Err=({m,retry})=><div className="w" style={{padding:'60px 20px',textAlign:'center'}}><h3>Something went wrong</h3><p style={{color:'var(--tx2)'}}>{m}</p>{retry&&<button className="btn" onClick={retry}>Try again</button>}</div>;
