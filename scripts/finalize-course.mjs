import fs from 'node:fs/promises';
const changes=[['src/StudyCourse.tsx',[
["const quiz=chapterQuestions(c,questions),draft=learning.drafts[c.id];","const quiz=chapterQuestions(c,questions),draft=learning.drafts[c.id];"],
["const complete=c.topics.filter", "const reviewQuiz=result?.questions||quiz;const complete=c.topics.filter"],
["answers:structuredClone(draft.answers),total:quiz.length", "answers:structuredClone(draft.answers),questions:structuredClone(quiz),total:quiz.length"],
["{quiz.map((q,i)=><details", "{reviewQuiz.map((q,i)=><details"],
]],['src/course/index.ts',[
["if(a.version!=='2026.10.14-v1')", "if(a.version!=='2026.10.14-v1'&&!a.questions)"],
["const qs=chapterQuestions(c,bank);if(a.total", "const qs=a.questions||chapterQuestions(c,bank);if(new Set(qs.map(q=>q.id)).size!==qs.length)throw Error('Duplicate historical chapter question');if(a.total"],
]]];
const prepared=[];for(const [file,replacements] of changes){let content=await fs.readFile(file,'utf8');for(const [from,to] of replacements){if(!content.includes(from))throw Error(`Missing ${file} integration anchor`);content=content.replace(from,to);}prepared.push([file,content]);}for(const [file,content] of prepared)await fs.writeFile(file,content);
