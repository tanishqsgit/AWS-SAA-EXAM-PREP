import {describe,it,expect} from 'vitest';
import {correct,finish,firstAttempts,remaining,score,validateImport,questionSchema,revision,domains} from '../src/logic';
import type {Attempt,Question} from '../src/types';
import fs from 'node:fs';
const bank:Question[]=Array.from({length:10},(_,i)=>JSON.parse(fs.readFileSync(`src/data/paper-${String(i+1).padStart(2,'0')}.json`,'utf8'))).flat();
const paper=bank.filter(q=>q.paperId==='paper-01');
const a:Attempt={id:'attempt-1',paperId:'paper-01',bankVersion:paper[0].version,questions:paper,startedAt:100000,deadline:100000+130*60000,durationMinutes:130,answers:{},flags:[],times:{},firstAttempt:true,position:0};
const personal={bookmarks:[],notes:{},mistakes:{},startDate:'2026-10-13',dailyMinutes:180,extraMinutes:0,completedTasks:[],practiceAnswers:{},practiceHistory:{}};
describe('complete bank',()=>{
 it('has ten fixed papers, 650 unique IDs and unique scenario text',()=>{expect(bank).toHaveLength(650);expect(new Set(bank.map(q=>q.id)).size).toBe(650);expect(new Set(bank.map(q=>q.scenario)).size).toBe(650);for(let p=1;p<=10;p++)expect(bank.filter(q=>q.paperId===`paper-${String(p).padStart(2,'0')}`)).toHaveLength(65);});
 it('has exact scored and unscored domain allocations in every paper',()=>{for(let p=1;p<=10;p++){const qs=bank.filter(q=>q.paperId===`paper-${String(p).padStart(2,'0')}`);domains.forEach((d,i)=>{expect(qs.filter(q=>q.domain===d&&q.scored)).toHaveLength([15,13,12,10][i]);expect(qs.filter(q=>q.domain===d&&!q.scored)).toHaveLength([4,4,4,3][i]);});expect(qs.filter(q=>q.type==='multiple')).toHaveLength(8);expect(qs.some(q=>q.scored&&q.type==='multiple')).toBe(true);}});
 it('validates all selection counts, IDs, references and explanations',()=>{for(const q of bank){expect(questionSchema.safeParse(q).success,q.id).toBe(true);expect(q.validation.source).toBe('checked');expect(q.validation.editorial).toBe('reviewed');expect(q.options.every(o=>o.explanation.length>40)).toBe(true);}});
});
describe('scoring',()=>{
 it('uses exact sets with no partial or negative credit',()=>{const q=bank.find(q=>q.type==='multiple')!;expect(correct(q,[...q.correct].reverse())).toBe(true);expect(correct(q,[q.correct[0]])).toBe(false);expect(correct(q,[q.correct[0],q.correct[0]])).toBe(false);const wrong=q.options.find(o=>!q.correct.includes(o.id))!.id;expect(correct(q,[...q.correct,wrong])).toBe(false);expect(correct(q,[q.correct[0],wrong])).toBe(false);expect(correct(q)).toBe(false);});
 it('separates the 50 scored from all 65 and counts unanswered as wrong',()=>{expect(score(a,true)).toEqual({n:50,right:0});expect(score(a)).toEqual({n:65,right:0});const perfect={...a,answers:Object.fromEntries(paper.map(q=>[q.id,q.correct]))};expect(score(perfect,true)).toEqual({n:50,right:50});expect(score(perfect)).toEqual({n:65,right:65});});
});
describe('deadline and analytics',()=>{
 it('keeps the deadline through serialization, background time and restoration',()=>{const restored=JSON.parse(JSON.stringify(a));expect(remaining(restored,a.startedAt+60_000)).toBe(129*60_000);expect(remaining(restored,a.deadline+200_000)).toBe(0);expect(finish(restored,'expired',a.deadline+999_999).submittedAt).toBe(a.deadline);expect(finish(a,'manual',a.deadline+123).submittedAt).toBe(a.deadline);});
 it('retakes cannot inflate first-attempt trends or revision priorities',()=>{const original=finish(a,'manual',a.startedAt+60_000),retake=finish({...a,id:'attempt-2',firstAttempt:false,startedAt:a.deadline+1000,deadline:a.deadline+1000+130*60000,answers:Object.fromEntries(paper.map(q=>[q.id,q.correct]))},'manual',a.deadline+2000);expect(firstAttempts([original,retake])).toEqual([original]);expect(revision([original,retake])).toEqual(revision([original]));});
});
describe('portable progress',()=>{
 const p={format:1 as const,attempts:[a],personal};
 it('round trips valid exports including historical snapshots',()=>{expect(validateImport(JSON.parse(JSON.stringify(p)))).toEqual(p);});
 it('rejects malformed, hostile and inconsistent data before saving',()=>{for(const payload of [{...p,format:2},{...p,unexpected:true},{...p,attempts:[a,a]},{...p,attempts:[{...a,answers:{[paper[0].id]:['UNKNOWN']}}]},{...p,attempts:[{...a,deadline:a.deadline+1}]},{...p,attempts:[{...a,firstAttempt:false}]},{...p,attempts:[{...a,questions:paper.map((q,i)=>i===0?{...q,references:['javascript:alert(1)']}:q)}]},{...p,personal:{...personal,startDate:'2026-02-31'}},{...p,attempts:[{...a,questions:paper.map((q,i)=>i===0?{...q,correct:['NOPE']}:q)}]}])expect(()=>validateImport(payload)).toThrow();});
});
