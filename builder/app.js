/* Offline-capable browser-only questionnaire editor for LimeSurvey 3.28 pilot */
'use strict';
const $ = id => document.getElementById(id);
const FIVE = ['Strongly Disagree','Disagree','Neutral','Agree','Strongly Agree'];
const SEVEN = ['Strongly Disagree','Disagree','Somewhat Disagree','Neither Agree nor Disagree','Somewhat Agree','Agree','Strongly Agree'];
const SCALE_PRESETS = {
  agreement5: FIVE,agreement7:SEVEN,
  frequency5:['Never','Rarely','Sometimes','Often','Always'],
  frequency7:['Never','Almost Never','Rarely','Sometimes','Often','Almost Always','Always'],
  importance5:['Not at all important','Slightly important','Moderately important','Very important','Extremely important'],
  satisfaction5:['Very dissatisfied','Dissatisfied','Neither satisfied nor dissatisfied','Satisfied','Very satisfied'],
  likelihood5:['Very unlikely','Unlikely','Neither likely nor unlikely','Likely','Very likely']
};
const TYPES = {A:'Numeric five-point array + Help',F:'Fully labelled array',L:'Single choice',M:'Multiple choice',T:'Long text'};
let serial=0, model, selectedId;
const uid=()=>++serial;
const qNew=(t='F')=>({id:uid(),type:t,code:'Q'+serial,text:'Please answer the following question.',help:'',mandatory:false,sub:['Statement 1','Statement 2','Statement 3'],opts: t==='F'?FIVE.slice():t==='L'?['Option 1','Option 2','Option 3']:['Option 1','Option 2','Option 3'],preset:'agreement5'});
function loadExample(){serial=0;const q1=qNew('A');q1.code='SMPNUM';q1.text='Please rate each statement about sustainable products.';q1.sub=['I prefer environmentally friendly products.','Sustainability influences my purchases.','I am willing to pay more for green products.'];q1.help=FIVE.map((s,i)=>`${i+1} = ${s}`).join('; ');
 const q2=qNew('F');q2.code='GPI';q2.text='Please indicate your agreement with the statements below.';q2.sub=['I plan to purchase green products.','I will look for sustainable alternatives.'];
 const q3=qNew('L');q3.code='AGE';q3.text='What is your age group?';q3.opts=['18–24','25–34','35–44','45 or older'];
 const q4=qNew('M');q4.code='BEHAV';q4.text='Which of these activities have you practiced?';q4.opts=['Used reusable shopping bags','Reduced plastic consumption','Recycled packaging'];
 const q5=qNew('T');q5.code='OPEN1';q5.text='What should businesses do to become more environmentally responsible?';
 model={title:'Sustainable Marketing — Builder Test',description:'An experimental survey generated using the Help Hub questionnaire builder.',welcome:'This is a demonstration survey. Do not collect real participant data.',groups:[{id:uid(),name:'Sustainability Attitudes',questions:[q1,q2]},{id:uid(),name:'About You',questions:[q3]},{id:uid(),name:'Actions and Suggestions',questions:[q4,q5]}]};selectedId=q1.id;syncFields();renderAll();}
function textEsc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function syncFields(){$('surveyTitle').value=model.title;$('surveyDesc').value=model.description;$('welcome').value=model.welcome;}
function current(){for(const g of model.groups)for(const q of g.questions)if(q.id===selectedId)return q;return null;}
function findGroup(id){return model.groups.find(g=>g.id===id);}
function renderAll(){renderGroups();renderEditor();renderPreview();renderStatus();}
function renderGroups(){const host=$('groups');host.innerHTML='';model.groups.forEach((g,gidx)=>{
 const card=document.createElement('div');card.className='group';card.innerHTML=`<div class="ghead"><input aria-label="Group name" value="${textEsc(g.name)}" data-groupname="${g.id}"><div class="gtools"><button class="mini" data-moveg="${g.id}" data-dir="-1" title="Move group up">↑</button><button class="mini" data-moveg="${g.id}" data-dir="1" title="Move group down">↓</button><button class="mini danger" data-delg="${g.id}" title="Delete group">✕</button></div></div>`;
 const list=document.createElement('div');list.className='q-list';g.questions.forEach((q,i)=>{const item=document.createElement('div');item.className='q-item'+(q.id===selectedId?' selected':'');item.innerHTML=`<button class="title" data-select="${q.id}">${textEsc(q.code)} · ${textEsc(q.text)}</button><span class="type">${textEsc(TYPES[q.type])}</span><button class="mini" data-moveq="${q.id}" data-dir="-1" title="Move question up">↑</button><button class="mini" data-moveq="${q.id}" data-dir="1" title="Move question down">↓</button><button class="mini danger" data-delq="${q.id}" title="Delete question">×</button>`;list.append(item)});
 const add=document.createElement('button');add.className='add-question';add.textContent='+ Add question to this group';add.onclick=()=>{const q=qNew('F');g.questions.push(q);selectedId=q.id;renderAll();};list.append(add);card.append(list);host.append(card);
 });
 host.querySelectorAll('[data-groupname]').forEach(el=>el.oninput=()=>{findGroup(Number(el.dataset.groupname)).name=el.value;renderPreview();renderStatus();});
 host.querySelectorAll('[data-select]').forEach(el=>el.onclick=()=>{selectedId=Number(el.dataset.select);renderAll()});
 host.querySelectorAll('[data-delq]').forEach(el=>el.onclick=()=>{for(const g of model.groups){const i=g.questions.findIndex(q=>q.id===Number(el.dataset.delq));if(i!==-1){g.questions.splice(i,1);if(selectedId===Number(el.dataset.delq))selectedId=g.questions[0]?.id??model.groups.flatMap(x=>x.questions)[0]?.id;break;}}renderAll();});
 host.querySelectorAll('[data-delg]').forEach(el=>el.onclick=()=>{if(model.groups.length===1){alert('Keep at least one question group.');return}const id=Number(el.dataset.delg);const i=model.groups.findIndex(g=>g.id===id);model.groups.splice(i,1);if(!current())selectedId=model.groups.flatMap(x=>x.questions)[0]?.id;renderAll()});
 host.querySelectorAll('[data-moveq]').forEach(el=>el.onclick=()=>{for(const g of model.groups){const i=g.questions.findIndex(q=>q.id===Number(el.dataset.moveq));const next=i+Number(el.dataset.dir);if(i!==-1&&next>=0&&next<g.questions.length){[g.questions[i],g.questions[next]]=[g.questions[next],g.questions[i]];break}}renderAll()});
 host.querySelectorAll('[data-moveg]').forEach(el=>el.onclick=()=>{const i=model.groups.findIndex(g=>g.id===Number(el.dataset.moveg));const next=i+Number(el.dataset.dir);if(next>=0&&next<model.groups.length)[model.groups[i],model.groups[next]]=[model.groups[next],model.groups[i]];renderAll()});
}
function optionEditor(q,arr,key,name){return `<div class="subhead">${name}</div><div class="optionRows">${arr.map((a,i)=>`<div class="choice-row"><span>${i+1}.</span><input value="${textEsc(a)}" data-choice="${key}" data-i="${i}" aria-label="${name} ${i+1}"><button type="button" data-remove="${key}" data-i="${i}" title="Remove choice">×</button></div>`).join('')}</div><button class="btn secondary" data-add="${key}">+ Add ${key==='opts'?'option':'statement'}</button>`;}
function renderEditor(){const host=$('questionEditor'),q=current();if(!q){host.innerHTML='<p>Add a question to begin.</p>';return;}
 let html=`<div class="editor-title"><h3>Question: ${textEsc(q.code)}</h3><span class="status">${textEsc(TYPES[q.type])}</span></div><div class="fields two"><label>Question code<input id="qCode" value="${textEsc(q.code)}" maxlength="20" autocomplete="off" aria-describedby="codeAdvice"><small id="codeAdvice" class="code-advice">Letters and numbers only; start with a letter. Example: SMP1 (not SMP 1 or SMP_1).</small><span id="codeFix"></span></label><label>Question type<select id="qType">${Object.entries(TYPES).map(([k,v])=>`<option value="${k}" ${q.type===k?'selected':''}>${textEsc(v)}</option>`).join('')}</select></label></div><label>Question text<textarea id="qText" rows="2">${textEsc(q.text)}</textarea></label><label>Question Help (optional)<textarea id="qHelp" rows="2">${textEsc(q.help)}</textarea></label><div class="checkline"><input id="qRequired" type="checkbox" ${q.mandatory?'checked':''}><label for="qRequired">Require an answer</label></div>`;
 if(q.type==='A')html+=`<div class="notice"><strong>Numeric five-point:</strong> Shows 1–5. The explanation belongs in Question Help. Add one or more statements below.</div>`;
 if(q.type==='F')html+=`<label>Response-scale template<select id="qPreset"><option value="custom">Custom / keep current labels</option>${Object.keys(SCALE_PRESETS).map(k=>`<option value="${k}" ${q.preset===k?'selected':''}>${k.replace(/(5|7)$/,' ($1-point)')}</option>`).join('')}</select></label>`;
 if(q.type==='A'||q.type==='F')html+=optionEditor(q,q.sub,'sub','Statements / subquestions');
 if(q.type==='F'||q.type==='L')html+=optionEditor(q,q.opts,'opts','Answer labels (stored codes 1, 2, 3...)');
 if(q.type==='M')html+=optionEditor(q,q.opts,'opts','Multiple-choice options');
 host.innerHTML=html;
 function bind(id,key){const el=$(id);if(el)el.addEventListener('input',()=>{q[key]=el.value;renderPreview();renderStatus();if(key==='code')host.querySelector('h3').textContent='Question: '+q.code;});}
 bind('qCode','code');
 // Offer a safe, explicit correction rather than silently renaming variable codes.
 const codeInput=$('qCode');
 const showCodeFix=()=>{const el=$('codeFix');if(!el)return;const clean=suggestCode(q.code);const bad=!CODE_PATTERN.test(q.code);const collision=allQuestions().some(other=>other!==q&&other.code.toUpperCase()===q.code.toUpperCase());
   if(!bad&&!collision){el.innerHTML='<span class="code-good">✓ Code format is valid</span>';return;}
   let candidate=uniqueCode(clean,q);
   el.innerHTML=`<span class="code-warning">Code needs attention.</span> <button type="button" class="mini" id="applyCodeFix">Use ${textEsc(candidate)}</button>`;
   $('applyCodeFix').onclick=()=>{q.code=candidate;renderAll();};
 };
 codeInput.addEventListener('input',showCodeFix);showCodeFix();
 bind('qText','text');bind('qHelp','help');$('qRequired').onchange=e=>{q.mandatory=e.target.checked;renderPreview()};$('qType').onchange=e=>{q.type=e.target.value;if(q.type==='A'&&!q.help)q.help=FIVE.map((s,i)=>`${i+1} = ${s}`).join('; ');if(q.type==='F'&&!q.opts.length)q.opts=FIVE.slice();if(q.type==='L'&&!q.opts.length)q.opts=['Option 1','Option 2'];renderAll();};
 if($('qPreset'))$('qPreset').onchange=e=>{if(SCALE_PRESETS[e.target.value]){q.opts=SCALE_PRESETS[e.target.value].slice();q.preset=e.target.value;}else q.preset='custom';renderEditor();renderPreview();renderStatus()};
 host.querySelectorAll('[data-choice]').forEach(el=>el.oninput=()=>{q[el.dataset.choice][Number(el.dataset.i)]=el.value;q.preset='custom';renderPreview();renderStatus()});
 host.querySelectorAll('[data-remove]').forEach(el=>el.onclick=()=>{q[el.dataset.remove].splice(Number(el.dataset.i),1);q.preset='custom';renderEditor();renderPreview();renderStatus()});
 host.querySelectorAll('[data-add]').forEach(el=>el.onclick=()=>{q[el.dataset.add].push('');q.preset='custom';renderEditor();renderPreview();renderStatus()});
}
function renderPreview(){const host=$('preview');host.innerHTML='';for(const g of model.groups){const gd=document.createElement('section');gd.className='pgroup';gd.innerHTML=`<h4>${textEsc(g.name)}</h4>`;for(const q of g.questions){const d=document.createElement('div');d.className='pquestion';let x=`<strong>${textEsc(q.text)}${q.mandatory?' *':''}</strong>${q.help?`<p class="help">${textEsc(q.help)}</p>`:''}`;if(q.type==='A'||q.type==='F'){const opts=q.type==='A'?['1','2','3','4','5']:q.opts;x+='<div style="overflow:auto"><table><thead><tr><th>Statement</th>'+opts.map(v=>`<th>${textEsc(v)}</th>`).join('')+'</tr></thead><tbody>'+q.sub.map(s=>`<tr><td>${textEsc(s)}</td>${opts.map(()=>'<td>◯</td>').join('')}</tr>`).join('')+'</tbody></table></div>';}else if(q.type==='L'||q.type==='M')x+='<div class="scale">'+q.opts.map(s=>`<span>${q.type==='L'?'◯':'☐'} ${textEsc(s)}</span>`).join('')+'</div>';else x+='<textarea aria-label="Long text preview" placeholder="Write your response..." rows="2" disabled></textarea>';d.innerHTML=x;gd.append(d);}host.append(gd);}}
// Strict, conservative LimeSurvey 3.x main-question code policy.
// Official manual: start with a letter; only ASCII letters/digits; unique across the survey.
// A 20-character editor limit is our own usability limit, NOT a documented LS maximum.
const CODE_PATTERN=/^[A-Za-z][A-Za-z0-9]{0,19}$/;
function allQuestions(){return model.groups.flatMap(g=>g.questions);}
function suggestCode(raw){
 let cleaned=String(raw??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Za-z0-9]/g,'');
 if(!cleaned)cleaned='Q';
 if(!/^[A-Za-z]/.test(cleaned))cleaned='Q'+cleaned;
 return cleaned.slice(0,20);
}
function uniqueCode(base,exclude){
 const existing=new Set(allQuestions().filter(q=>q!==exclude).map(q=>String(q.code).toUpperCase()));
 let code=base;
 for(let i=2;existing.has(code.toUpperCase());i++){
   const suffix=String(i);code=base.slice(0,20-suffix.length)+suffix;
   if(i>99999)throw Error('Unable to suggest unique question code');
 }
 return code;
}
function errors(){
 const errs=[];
 if(!model.title.trim())errs.push('Enter the survey title.');
 if(!model.groups.length)errs.push('Add a question group.');
 const codes=new Set();
 for(const g of model.groups){
   if(!g.name.trim())errs.push('Each group needs a name.');
   for(const q of g.questions){
     const code=String(q.code??'');
     if(!CODE_PATTERN.test(code)){
       const guess=uniqueCode(suggestCode(code),q);
       errs.push(`Invalid question code: ${code||'(blank)'}. Start with a letter; use letters and digits only (no spaces, underscores, hyphens or punctuation). Suggested: ${guess}.`);
     }
     if(codes.has(code.toUpperCase()))errs.push(`Duplicate question code: ${code}. Question codes must be unique throughout the survey.`);
     codes.add(code.toUpperCase());
     if(!q.text.trim())errs.push(`Question ${code||'(blank)'} needs text.`);
     if(['A','F'].includes(q.type)&&!q.sub.length)errs.push(`Question ${code} needs at least one statement.`);
     if(['F','L','M'].includes(q.type)&&q.opts.length<2)errs.push(`Question ${code} needs at least two options.`);
     if(['F','L','M'].includes(q.type)&&q.opts.length>99999)errs.push(`Question ${code}: too many answer options for five-digit generated answer codes.`);
     if(['A','F','M'].includes(q.type)&&q.sub.length>99999)errs.push(`Question ${code}: too many generated subquestions.`);
     if((['F','L','M'].includes(q.type)&&q.opts.some(s=>!s.trim()))||(['A','F'].includes(q.type)&&q.sub.some(s=>!s.trim())))errs.push(`Question ${code} has an empty statement or answer option.`);
     // Answer codes are generated as 1, 2, ...; each is alphanumeric and <=5 chars.
     // Subquestion codes are generated as SQ1, SQ2, ...; no user-entered invalid codes.
   }
 }
 if(!model.groups.some(g=>g.questions.length))errs.push('Add at least one question.');
 return errs;
}
function renderStatus(){const total=model.groups.reduce((n,g)=>n+g.questions.length,0);$('stats').innerHTML=`<div class="stat"><strong>${model.groups.length}</strong><span>Groups</span></div><div class="stat"><strong>${total}</strong><span>Questions</span></div><div class="stat"><strong>${errors().length}</strong><span>Issues</span></div>`;const errs=errors();$('validation').innerHTML=errs.length?errs.map(s=>`<div class="error">• ${textEsc(s)}</div>`).join(''):'<div class="ok">✓ Basic content checks passed. Import testing is still required.</div>';$('generate').disabled=errs.length>0;}
function parseXml(s){const p=new DOMParser().parseFromString(s,'application/xml');if(p.querySelector('parsererror'))throw Error('XML parsing failed');return p;}
function put(row,key,value){let e=Array.from(row.children).find(e=>e.tagName===key);if(!e){e=row.ownerDocument.createElement(key);row.append(e)}e.textContent=value==null?'':String(value);}
function firstRow(doc,name){return doc.querySelector(`${name} > rows > row`);}
function targetRows(doc,name){const e=doc.querySelector(`${name} > rows`);if(!e)throw Error('Missing XML section '+name);return e;}
function cloneProto(doc,key){const source=parseXml(LSS_SCHEMA.prototypes[key]);const r=source.documentElement;return doc.importNode(r,true);}
function generateXML(){const issues=errors();if(issues.length)throw Error(issues.join('\n'));const doc=parseXml(LSS_SCHEMA.base);const sid='765432';let qi=930000,si=940000,gi=690000;const grpRows=targetRows(doc,'groups'),qRows=targetRows(doc,'questions'),sRows=targetRows(doc,'subquestions'),aRows=targetRows(doc,'answers');
 model.groups.forEach((g,index)=>{const gid=String(++gi);const group=cloneProto(doc,'group');[['gid',gid],['sid',sid],['group_name',g.name],['group_order',index],['description',''],['grelevance','1'],['randomization_group','']].forEach(([k,v])=>put(group,k,v));grpRows.append(group);
 g.questions.forEach((q,indexQ)=>{const qid=String(++qi);const question=cloneProto(doc,'question');[['qid',qid],['parent_qid','0'],['sid',sid],['gid',gid],['type',q.type],['title',q.code],['question',q.text],['help',q.help],['mandatory',q.mandatory?'Y':'N'],['question_order',indexQ+1],['other','N'],['relevance','1'],['scale_id','0']].forEach(([k,v])=>put(question,k,v));qRows.append(question);
 if(q.type==='A'||q.type==='F'||q.type==='M'){const texts=q.type==='M'?q.opts:q.sub;texts.forEach((s,j)=>{const row=cloneProto(doc,'subquestion');[['qid',++si],['parent_qid',qid],['sid',sid],['gid',gid],['type',q.type==='M'?'M':'T'],['title','SQ'+(j+1)],['question',s],['question_order',j+1],['mandatory','N'],['relevance','1'],['scale_id','0'],['modulename','']].forEach(([k,v])=>put(row,k,v));sRows.append(row);});}
 if(q.type==='F'||q.type==='L'){q.opts.forEach((label,j)=>{const answer=cloneProto(doc,'answer');[['qid',qid],['code',j+1],['answer',label],['sortorder',j+1],['scale_id','0'],['assessment_value','0'],['language','en']].forEach(([k,v])=>put(answer,k,v));aRows.append(answer);});}
 });});
 const surveys=firstRow(doc,'surveys');[['sid',sid],['admin','Survey Builder'],['adminemail','example@example.org'],['bounce_email',''],['language','en'],['format','G'],['template','fruity']].forEach(([k,v])=>put(surveys,k,v));
 const lang=firstRow(doc,'surveys_languagesettings');[['surveyls_survey_id',sid],['surveyls_language','en'],['surveyls_title',model.title],['surveyls_description',model.description],['surveyls_welcometext',model.welcome]].forEach(([k,v])=>put(lang,k,v));
 for(const name of ['themes','themes_inherited'])doc.querySelectorAll(`${name} theme sid`).forEach(e=>e.textContent=sid);
 const content='<?xml version="1.0" encoding="UTF-8"?>\n'+new XMLSerializer().serializeToString(doc);if(parseXml(content).querySelector('parsererror'))throw Error('Invalid generated XML');return content;
}
function download(){try{const xml=generateXML();const data=new Blob([xml],{type:'application/xml;charset=utf-8'});const url=URL.createObjectURL(data),a=document.createElement('a');a.href=url;a.download=(model.title.replace(/[^a-z0-9]+/gi,'_').replace(/^_|_$/g,'').slice(0,55)||'survey')+'_LimeSurvey_328_Test.lss';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}catch(e){alert('Cannot generate file:\n'+e.message)}}
$('surveyTitle').oninput=e=>{model.title=e.target.value;renderStatus()};$('surveyDesc').oninput=e=>{model.description=e.target.value};$('welcome').oninput=e=>{model.welcome=e.target.value};$('addGroup').onclick=()=>{model.groups.push({id:uid(),name:'New question group',questions:[]});renderAll()};$('reset').onclick=()=>{if(confirm('Replace the current questionnaire with the demonstration example?'))loadExample()};$('refreshPreview').onclick=renderPreview;$('generate').onclick=download;
loadExample();
