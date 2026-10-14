import {z} from 'zod';
export const PASSWORD_ITERATIONS=600000;
export function normalizeEmail(input:string){return z.string().email('Enter a valid email address.').max(254).parse(input.trim().toLowerCase());}
export function validatePassword(value:string){if(value.length<8||value.length>128)throw Error('Use a password between 8 and 128 characters.');}
export async function hashPassword(password:string,salt:Uint8Array){const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);const bits=await crypto.subtle.deriveBits({name:'PBKDF2',salt:salt as BufferSource,iterations:PASSWORD_ITERATIONS,hash:'SHA-256'},key,256);return Array.from(new Uint8Array(bits),b=>b.toString(16).padStart(2,'0')).join('');}
export function equalHash(a:string,b:string){let diff=a.length^b.length;for(let i=0;i<Math.max(a.length,b.length);i++)diff|=(a.charCodeAt(i)||0)^(b.charCodeAt(i)||0);return diff===0;}
