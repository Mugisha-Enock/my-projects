import {useState,useEffect,useCallback} from 'react';
export function useFetch(fn,deps){const [s,set]=useState({data:null,loading:true,error:null}),[n,setN]=useState(0);
  useEffect(()=>{let live=true;set(p=>({...p,loading:true,error:null}));fn().then(d=>live&&set({data:d,loading:false,error:null}),e=>live&&set({data:null,loading:false,error:e.message}));return()=>{live=false}},[...deps,n]);
  const setData=useCallback(d=>set(p=>({...p,data:typeof d==='function'?d(p.data):d})),[]),reload=useCallback(()=>setN(x=>x+1),[]);
  return {...s,reload,setData}}
