import fs from 'node:fs/promises';
const changes=[['src/App.tsx',[
["import {useEffect,useRef,useState} from 'react';","import {useEffect,useRef,useState} from 'react';\nimport StudyCourse from './StudyCourse';\nimport {validateLearning} from './course';"],
["type View='Dashboard'|", "type View='Study course'|'Dashboard'|"],
["(['Dashboard','Practice papers','Practice','21-day plan','Library','Data & sources'] as View[])","(['Dashboard','Study course','Practice papers','Practice','21-day plan','Library','Data & sources'] as View[])"],
["['◫','▤','◎','▦','▧','⚙'][i]","['◫','▥','▤','◎','▦','▧','⚙'][i]"],
["const imported=validateImport(JSON.parse(await file.text()));","const imported=validateImport(JSON.parse(await file.text()));validateLearning(imported.personal.learning,questions);"],
["{view==='Practice'&&<Practice", "{view==='Study course'&&<StudyCourse personal={progress.personal} update={personal}/>}\n {view==='Practice'&&<Practice"],
["<div className=\"stats-grid\"><Stat label=\"Papers completed\"", "<section className=\"course-dashboard-banner\"><div><span className=\"eyebrow\">START WITH UNDERSTANDING</span><h2>New to AWS? Learn it from the beginning.</h2><p>16 ordered chapters · 48 topics · simple stories after every topic · chapter MCQ tests</p></div><button className=\"primary\" onClick={()=>navigate('Study course')}>Continue learning · {progress.personal.learning?.completedTopics.length||0}/48 →</button></section>\n <div className=\"stats-grid\"><Stat label=\"Papers completed\""],
]],['src/logic.ts',[
["const progressSchema=z.object(","const progressSchema=z.object("],
["practiceHistory:z.record(z.object(","learning:learningSchema.optional(),practiceHistory:z.record(z.object("],
]]];
const prepared=[];for(const [file,replacements] of changes){let content=await fs.readFile(file,'utf8');for(const [from,to] of replacements){if(!content.includes(from))throw Error(`Missing integration anchor in ${file}: ${from}`);content=content.replace(from,to);}prepared.push([file,content]);}for(const [file,content] of prepared)await fs.writeFile(file,content);console.log('Course navigation, dashboard and backward-compatible progress schema integrated.');
