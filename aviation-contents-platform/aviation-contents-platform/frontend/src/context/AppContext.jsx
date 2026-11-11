import {createContext,useContext,useState,useEffect,useCallback,useMemo} from 'react';import {rt} from '../services/realtime';
const C=createContext();export const useApp=()=>useContext(C);
export function AppProvider({children}){const [toasts,setT]=useState([]),[conn,setConn]=useState('connecting');
  const toast=useCallback((m,href,label)=>{const id=Math.random();setT(t=>[...t,{id,m,href,label}]);setTimeout(()=>setT(t=>t.filter(x=>x.id!==id)),5000)},[]);
  useEffect(()=>rt.status(setConn),[]);
  useEffect(()=>rt.on('story:new',s=>toast('A new aviation story has been published.','/article/'+s.slug,'Open')),[toast]);
  const v=useMemo(()=>({toasts,conn,toast}),[toasts,conn,toast]);return <C.Provider value={v}>{children}</C.Provider>}
