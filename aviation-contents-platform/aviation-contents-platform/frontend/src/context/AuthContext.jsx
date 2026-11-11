import {createContext,useContext,useState,useEffect,useMemo} from 'react';import {api} from '../services/api/client';
const A=createContext();export const useAuth=()=>useContext(A);
export function AuthProvider({children}){const [user,setUser]=useState(null),[loading,setL]=useState(true);
  useEffect(()=>{api.me().then(d=>setUser(d.user)).catch(()=>{}).finally(()=>setL(false))},[]);
  const v=useMemo(()=>({user,loading,
    login:async b=>{const d=await api.login(b);setUser(d.user);return d.user},register:async b=>{const d=await api.register(b);setUser(d.user);return d.user},
    logout:async()=>{await api.logout().catch(()=>{});setUser(null)}}),[user,loading]);
  return <A.Provider value={v}>{children}</A.Provider>}
