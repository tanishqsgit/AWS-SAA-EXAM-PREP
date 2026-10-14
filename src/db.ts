import {openDB} from 'idb';
import type {Progress,Question} from './types';
import {dateLocal} from './logic';
const db=openDB('saa-study-studio',1,{upgrade(d){d.createObjectStore('state');d.createObjectStore('banks');}});
export const emptyProgress=():Progress=>({format:1,attempts:[],personal:{bookmarks:[],notes:{},mistakes:{},startDate:dateLocal(),dailyMinutes:180,extraMinutes:0,completedTasks:[],practiceAnswers:{},practiceHistory:{}}});
export async function getProgress(){return (await (await db).get('state','progress') as Progress|undefined)||emptyProgress();}
export async function saveProgress(p:Progress){await (await db).put('state',p,'progress');}
export async function saveBank(version:string,qs:Question[]){await (await db).put('banks',qs,version);}
