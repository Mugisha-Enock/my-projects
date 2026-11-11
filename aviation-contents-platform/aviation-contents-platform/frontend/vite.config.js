import {defineConfig} from 'vite';import react from '@vitejs/plugin-react';
// Dev proxy: the browser talks only to :5173, so cookies and Socket.IO work with no CORS setup.
const api='http://localhost:5000';
export default defineConfig({plugins:[react()],server:{proxy:{'/api':api,'/uploads':api,'/socket.io':{target:api,ws:true}}}});
