const {app,BrowserWindow,protocol,net,shell}=require('electron');
const path=require('node:path');
const {pathToFileURL}=require('node:url');
const fs=require('node:fs');
if(process.env.SAA_DESKTOP_TEST==='1'&&process.env.SAA_DESKTOP_TEST_DATA){fs.mkdirSync(process.env.SAA_DESKTOP_TEST_DATA,{recursive:true});app.setPath('userData',process.env.SAA_DESKTOP_TEST_DATA);}
protocol.registerSchemesAsPrivileged([{scheme:'study',privileges:{standard:true,secure:true,supportFetchAPI:true,corsEnabled:true}}]);
app.setAppUserModelId('com.tanishq.saa-study-studio');
const single=app.requestSingleInstanceLock();
if(!single)app.quit();
let window;
const allowedExternal=url=>{try{const u=new URL(url);return u.protocol==='https:'&&['aws.amazon.com','docs.aws.amazon.com','github.com'].includes(u.hostname);}catch{return false;}};
const openExternal=url=>{if(allowedExternal(url))void shell.openExternal(url);};
async function createWindow(){
 window=new BrowserWindow({width:1320,height:900,minWidth:390,minHeight:650,show:false,title:'AWS SAA Study Studio',backgroundColor:'#f6f7f3',webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true,webSecurity:true}});
 window.removeMenu();window.webContents.setWindowOpenHandler(({url})=>{openExternal(url);return {action:'deny'};});
 window.webContents.on('will-navigate',(event,url)=>{const u=new URL(url);if(u.protocol!=='study:'||u.host!=='app'){event.preventDefault();openExternal(url);}});
 window.webContents.session.setPermissionRequestHandler((_webContents,_permission,callback)=>callback(false));
 window.once('ready-to-show',()=>{if(process.env.SAA_DESKTOP_TEST!=='1')window.show();});await window.loadURL('study://app/');
}
app.on('second-instance',()=>{if(window){if(window.isMinimized())window.restore();window.focus();}});
app.whenReady().then(async()=>{
 const root=path.resolve(__dirname,'../dist');
 protocol.handle('study',async request=>{
  try{const url=new URL(request.url);if(url.host!=='app')return new Response('Not found',{status:404});const pathname=decodeURIComponent(url.pathname);const relative=pathname==='/'?'index.html':pathname.replace(/^\/+/, '');const target=path.resolve(root,relative);if(target!==root&&!target.startsWith(root+path.sep))return new Response('Forbidden',{status:403});if(!fs.existsSync(target)||!fs.statSync(target).isFile())return new Response('Not found',{status:404});const result=await net.fetch(pathToFileURL(target).toString());const headers=new Headers(result.headers);headers.set('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'");return new Response(result.body,{status:result.status,headers});}catch{return new Response('Invalid request',{status:400});}
 });await createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)void createWindow();});
});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
