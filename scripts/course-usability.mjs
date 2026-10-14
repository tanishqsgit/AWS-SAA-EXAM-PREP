import fs from 'node:fs/promises';
const files=[['src/StudyCourse.tsx',[
["import {useEffect,useState} from 'react';", "import {useEffect,useState} from 'react';import {glossary} from './course/glossary';"],
["[topicIndex,setTopicIndex]=useState(0)","[topicIndex,setTopicIndex]=useState(Math.max(0,chapters.find(c=>c.id===learning.lastChapter)?.topics.findIndex(t=>t.id===learning.lastTopic)??0))"],
["save({lastChapter:id});", "save({lastChapter:id,lastTopic:chapters.find(c=>c.id===id)?.topics[0].id});"],
["setTopicIndex(index);setMode('Read');", "setTopicIndex(index);save({lastTopic:c.topics[index].id});setMode('Read');"],
["<div className=\"course-layout\">", "<CourseGlossary/><div className=\"course-layout\">"],
]],['src/course/progress-schema.ts',[
["lastChapter:chapter,simpleMode", "lastChapter:chapter,lastTopic:topic.optional(),simpleMode"],
]],['src/course/index.ts',[
["if(!knownChapters.has(p.lastChapter)||", "if(p.lastTopic&&!knownTopics.has(p.lastTopic))throw Error('Unknown last course topic');if(!knownChapters.has(p.lastChapter)||"],
]]];const prepared=[];for(const [file,replacements] of files){let t=await fs.readFile(file,'utf8');for(const [a,b] of replacements){if(!t.includes(a))throw Error('Missing '+file+' usability anchor');t=t.replace(a,b);}prepared.push([file,t]);}for(const [file,t] of prepared)await fs.writeFile(file,t);
