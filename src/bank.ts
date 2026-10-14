import type {Question} from './types';
const files=import.meta.glob('./data/paper-*.json',{eager:true,import:'default'});
export const bankVersion='2026.10.13-v1';
export const questions=Object.values(files).flat() as Question[];
export const paperIds=Array.from({length:10},(_,i)=>`paper-${String(i+1).padStart(2,'0')}`);
export const eligible=(q:Question)=>q.validation.editorial!=='flagged';
export function paper(id:string){return questions.filter(q=>q.paperId===id&&eligible(q));}
