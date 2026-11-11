import {Routes,Route,Link} from 'react-router-dom';
import Layout from './components/Layout';import RequireAuth from './components/RequireAuth';import Home from './pages/Home';import Explore from './pages/Explore';import Article from './pages/Article';
import Author from './pages/Author';import MyContent from './pages/MyContent';import Write from './pages/Write';import Login from './pages/Login';import Register from './pages/Register';import Dashboard from './pages/Dashboard';
const NF=()=><div className="w" style={{padding:'80px 20px',textAlign:'center'}}><h2>Page not found</h2><Link to="/" style={{color:'var(--sky)'}}>Back to the magazine</Link></div>;
const G=({children,roles})=><RequireAuth roles={roles}>{children}</RequireAuth>;
export default function App(){return <Routes><Route element={<Layout/>}>
<Route index element={<Home/>}/><Route path="explore" element={<Explore/>}/><Route path="explore/:type" element={<Explore/>}/>
<Route path="article/:slug" element={<Article/>}/><Route path="author/:username" element={<Author/>}/><Route path="login" element={<Login/>}/><Route path="register" element={<Register/>}/>
<Route path="my-content" element={<G><MyContent/></G>}/><Route path="write" element={<G><Write/></G>}/><Route path="write/:slug" element={<G><Write/></G>}/>
<Route path="dashboard" element={<G roles={['editor','admin']}><Dashboard/></G>}/><Route path="*" element={<NF/>}/></Route></Routes>}
