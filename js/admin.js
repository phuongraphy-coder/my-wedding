/* =====================================================================
   js/admin.js  —  មុខងារទំព័រគ្រប់គ្រងភ្ញៀវ (admin.html)
   • បន្ថែម/កែ/លុបភ្ញៀវ  • បង្កើតតំណ ?to=ឈ្មោះ  • QR  • នាំចេញ/នាំចូល JSON
   • សារផ្ញើលំនាំដើម៖ រកមើល  msg:'...'  ខាងក្រោម (ប្រើ {name} និង {link})
   ===================================================================== */
var $=function(i){return document.getElementById(i)},K='mt_guests',KC='mt_cfg',cur=null,ed=null;
function ld(k,d){try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}}
var G=ld(K,[]),C=Object.assign({base:'',msg:'សូមគោរពអញ្ជើញ {name} ចូលរួមពិធីអាពាហ៍ពិពាហ៍របស់យើងខ្ញុំ {link}'},ld(KC,{}));
function sv(){try{localStorage.setItem(K,JSON.stringify(G));localStorage.setItem(KC,JSON.stringify(C))}catch(e){}}
function esc(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function bu(){var b=C.base.trim();return b||(/^https?:$/.test(location.protocol)&&location.origin!=='null'?location.origin+location.pathname.replace(/[^\/]*$/,''):'')}
function link(g){var b=bu();return b+(b.indexOf('?')>-1?'&':'?')+'to='+encodeURIComponent(g.n)}
function msg(g){return C.msg.replace('{name}',function(){return g.n}).replace('{link}',function(){return link(g)})}
function toast(m){var t=$('toast');t.textContent=m;t.style.display='block';clearTimeout(t._t);t._t=setTimeout(function(){t.style.display='none'},2200)}
var cfcb=null;function ask(t,cb){cfcb=cb;$('cq').textContent=t;$('cf').showModal()}
$('cy').onclick=function(){$('cf').close();if(cfcb)cfcb()};$('cno').onclick=function(){$('cf').close()};
function tab(i){$('t0').className=i?'hide':'';$('t1').className=i?'':'hide';$('b0').className=i?'':'on';$('b1').className=i?'on':''}
function chk(){if(!bu()){toast('សូមដាក់តំណសំបុត្រនៅ «កែព័ត៌មាន» ជាមុន');$('ds').showModal();return false}return true}
function copy(t,m){function ok(){toast(m)}function fb(){var a=document.createElement('textarea');a.value=t;(document.querySelector('dialog[open]')||document.body).appendChild(a);a.select();try{document.execCommand('copy');ok()}catch(e){toast('សូមចម្លងដោយដៃ៖ '+t)}a.remove()}
 if(navigator.clipboard)navigator.clipboard.writeText(t).then(ok,fb);else fb()}
function mark(g){if(!g.s){g.s=1;sv();render()}}
var IP='<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"><path d="M21 3 3 10.5l7 3 3 7z"/><path d="m10 13.5 11-10.5"/></svg>',
IE='<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
IQ='<svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM21 14v.01M14 21h3M21 17v4"/></svg>';
function render(){
 var gs=[],f=$('gf').value,q=$('q').value.trim().toLowerCase();G.forEach(function(g){if(g.g&&gs.indexOf(g.g)<0)gs.push(g.g)});
 $('gf').innerHTML='<option value="">ក្រុមទាំងអស់</option>'+gs.map(function(x){return'<option'+(x===f?' selected':'')+'>'+esc(x)+'</option>'}).join('');
 $('gl').innerHTML=gs.map(function(x){return'<option value="'+esc(x)+'">'}).join('');
 var r=G.filter(function(g){return(!q||g.n.toLowerCase().indexOf(q)>-1)&&(!f||g.g===f)});$('cnt').textContent=G.length;
 $('ls').innerHTML=r.length?r.map(function(g){var i=esc(g.id);return'<div class="gr"><div><div class="gn">'+esc(g.n)+'</div><div class="gs"><span class="st'+(g.s?' ok':'')+'">'+(g.s?'បានផ្ញើអញ្ជើញ':'មិនទាន់ផ្ញើ')+'</span>'+(g.g?'<span class="st">'+esc(g.g)+'</span>':'')+'</div></div><div class="ga"><button class="ic" data-a="view" data-i="'+i+'">'+IE+'</button><button class="ic" data-a="send" data-i="'+i+'">'+IP+'</button><button class="ic" data-a="qr" data-i="'+i+'">'+IQ+'</button><button class="ic" data-a="more" data-i="'+i+'">⋮</button></div></div>'}).join(''):'<div class="em">មិនទាន់មានភ្ញៀវ សូមចុច «+ បន្ថែមថ្មី»</div>';
 $('ex').textContent=bu()?link({n:'សុខា'}):'—';
}
$('ls').onclick=function(e){var b=e.target.closest('button');if(!b)return;var g=G.find(function(x){return x.id===b.dataset.i});if(!g)return;cur=g;var a=b.dataset.a;
 if(a==='view'){var f=document.createElement('iframe');f.style.cssText='width:100%;height:100%;border:0';f.src='index.html?to='+encodeURIComponent(g.n);$('vb').replaceChildren(f);$('vd').showModal()}
 else if(a==='send'){if(!chk())return;$('sn').textContent=g.n;$('sl').value=link(g);$('sd').showModal()}
 else if(a==='qr'){if(!chk())return;$('qn').textContent=g.n;var l=link(g),bx=$('qb');bx.innerHTML='';try{new QRCode(bx,{text:l,width:220,height:220})}catch(x){bx.textContent='QR ត្រូវការអ៊ីនធឺណិត'}$('ql').textContent=l;$('qd').showModal()}
 else{$('mn').textContent=g.n;$('md').showModal()}};
$('qdw').onclick=function(){var c=$('qb').querySelector('canvas');if(!c){toast('QR មិនទាន់រួចរាល់');return}var o=document.createElement('canvas');o.width=o.height=c.width+48;var x=o.getContext('2d');x.fillStyle='#fff';x.fillRect(0,0,o.width,o.height);x.drawImage(c,24,24);var a=document.createElement('a');a.href=o.toDataURL('image/png');a.download='qr-'+cur.n.replace(/[^\w\u1780-\u17FF-]+/g,'_')+'.png';a.click()};
$('qsh').onclick=function(){if(navigator.share)navigator.share({text:msg(cur)}).catch(function(){});else copy(msg(cur),'បានចម្លងទាំងសារ');mark(cur)};
$('cl').onclick=function(){copy(link(cur),'បានចម្លងតំណ');mark(cur)};
$('cm').onclick=function(){copy(msg(cur),'បានចម្លងទាំងសារ');mark(cur)};
$('rs').onclick=function(){cur.s=0;sv();render();toast('បានកំណត់ឡើងវិញ')};
$('me').onclick=function(){$('md').close();ed=cur;$('dt').textContent='កែភ្ញៀវ';$('fn').value=cur.n;$('fg').value=cur.g||'';$('dlg').showModal()};
$('mdl').onclick=function(){var g=cur;$('md').close();ask('លុប '+g.n+' ?',function(){G=G.filter(function(x){return x!==g});sv();render()})};
$('add').onclick=function(){ed=null;$('fn').value='';$('fg').value='';$('dt').textContent='បន្ថែមភ្ញៀវ';$('dlg').showModal()};$('cn').onclick=function(){$('dlg').close()};
function saveG(){var n=$('fn').value.trim();if(!n)return;
 if(ed){ed.n=n;ed.g=$('fg').value.trim()}else G.unshift({id:'g'+Date.now()+Math.random().toString(36).slice(2,6),n:n,g:$('fg').value.trim(),s:0});sv();$('dlg').close();render()}
$('sv').onclick=saveG;$('fn').onkeydown=function(e){if(e.key==='Enter')saveG()};
$('q').oninput=$('gf').onchange=render;$('fb').onclick=function(){$('fpn').classList.toggle('hide')};
document.querySelectorAll('.x').forEach(function(b){b.onclick=function(){b.closest('dialog').close()}});
$('b0').onclick=function(){tab(0)};$('b1').onclick=function(){tab(1)};
$('base').value=C.base;$('msg').value=C.msg;
$('base').oninput=function(){C.base=this.value;sv();render()};$('msg').oninput=function(){C.msg=this.value;sv()};
$('exp').onclick=function(){var a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify({G:G,C:C})],{type:'application/json'}));a.download='my-theab-guests.json';a.click()};
$('imp').onclick=function(){$('fi').click()};
$('fi').onchange=function(){var f=this.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{var d=JSON.parse(r.result);if(Array.isArray(d.G)){ask('ជំនួសទិន្នន័យបច្ចុប្បន្ន?',function(){G=d.G;C=Object.assign(C,d.C||{});sv();$('base').value=C.base;$('msg').value=C.msg;render()})}}catch(e){toast('ឯកសារមិនត្រឹមត្រូវ')}};r.readAsText(f)};
$('gs').onclick=function(){$('ds').showModal()};$('ok').onclick=function(){$('ds').close()};
$('vw').onclick=function(){var f=document.createElement('iframe');f.style.cssText='width:100%;height:100%;border:0';f.src='index.html';$('vb').replaceChildren(f);$('vd').showModal()};
$('vx').onclick=function(){$('vd').close()};$('vd').onclose=function(){$('vb').replaceChildren()};
$('thf').src='index.html';
render();
