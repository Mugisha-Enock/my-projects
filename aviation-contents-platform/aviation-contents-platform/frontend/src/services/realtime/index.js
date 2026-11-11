import {io} from 'socket.io-client';
// Same-origin by default (Vite proxy in dev). Set VITE_SOCKET_URL when the API is on another domain.
let socket;const get=()=>socket||(socket=io(import.meta.env.VITE_SOCKET_URL||undefined,{withCredentials:true,reconnectionDelayMax:10000}));
export const rt={
  on(event,fn){const s=get();s.on(event,fn);return()=>s.off(event,fn)},
  status(fn){const s=get(),up=()=>fn('connected'),down=()=>fn('reconnecting');fn(s.connected?'connected':'connecting');
    s.on('connect',up);s.on('disconnect',down);s.on('connect_error',down);return()=>{s.off('connect',up);s.off('disconnect',down);s.off('connect_error',down)}}};
