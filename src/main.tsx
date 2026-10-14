import React from 'react';import {createRoot} from 'react-dom/client';import Login from './Login';import './style.css';
createRoot(document.getElementById('root')!).render(<React.Fragment><Login/></React.Fragment>);
if(import.meta.env.PROD&&location.protocol!=='study:'&&'serviceWorker' in navigator)window.addEventListener('load',()=>{void navigator.serviceWorker.register('/sw.js');});
