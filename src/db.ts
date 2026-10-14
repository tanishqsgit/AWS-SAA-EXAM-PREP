import {openDB} from 'idb';
import type {Progress,Question} from './types';
import {dateLocal} from './logic';
export const db=openDB('saa-study-studio',2,{upgrade(d){if(!d.objectStoreNames.contains('state'))d.createObjectStore('state');if(!d.objectStoreNames.contains('banks'))d.createObjectStore('banks');if(!d.objectStoreNames.contains('accounts'))d.createObjectStore('accounts',{keyPath:'email'});}});
export const emptyProgress=():Progress=>({format:1,attempts:[],personal:{bookmarks:[],notes:{},mistakes:{},startDate:dateLocal(),dailyMinutes:180,extraMinutes:0,completedTasks:[],practiceAnswers:{},practiceHistory:{}}});
export async function getProgress(key='progress'){return (await (await db).get('state',key) as Progress|undefined)||emptyProgress();}
export async function saveProgress(p:Progress,key='progress'){await (await db).put('state',p,key);}
export async function saveBank(version:string,qs:Question[]){await (await db).put('banks',qs,version);}
