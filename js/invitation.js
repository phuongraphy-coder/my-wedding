/* =====================================================================
   js/invitation.js  —  មុខងារចម្បងនៃសំបុត្រ
   (បង្ហាញឈ្មោះភ្ញៀវពី ?to= , ប្រតិទិន, រាប់ថយក្រោយ, ទំព័រគម្រប+តន្ត្រី,
    កម្រងរូបភាពមូលដ្ឋាន, សារជូនពរ+Telegram, KHQR, ម៉ឺនុយ)
   ព័ត៌មានដែលត្រូវកែ ស្ថិតក្នុង js/config.js ពុំមែនទីនេះទេ
   ===================================================================== */
var KM="០១២៣៤៥៦៧៨៩",MONTHS=["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"],DAYS=["អា","ច","អ","ព","ព្រ","សុ","ស"];
function kn(n){return String(n).replace(/\d/g,function(d){return KM[d]})}
function $(i){return document.getElementById(i)}
["f1","m1","f2","m2"].forEach(function(k){$(k).textContent=C[k]});
$("groom").textContent=C.groom;$("bride").textContent=C.bride;$("guest").textContent=(function(){try{var n=new URLSearchParams(location.search).get("to");if(n&&n.trim())return n.trim().slice(0,80)}catch(e){}return C.guest})();$("venue").textContent=C.venue;$("gmap").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(C.venue);
var D=new Date(C.date),Y=D.getFullYear(),M=D.getMonth();
$("calt").textContent="ខែ"+MONTHS[M]+" "+kn(Y);
$("datetxt").innerHTML=C.lunar+"<br>ត្រូវនឹងថ្ងៃទី"+kn(D.getDate())+" ខែ"+MONTHS[M]+" ឆ្នាំ"+kn(Y)+"<br>"+C.time;
var h=DAYS.map(function(d){return"<b>"+d+"</b>"}).join(""),first=new Date(Y,M,1).getDay(),n=new Date(Y,M+1,0).getDate(),i;
for(i=0;i<first;i++)h+="<span></span>";
for(i=1;i<=n;i++)h+='<span class="d'+(i===D.getDate()?" on":"")+'">'+kn(i)+"</span>";
$("cal").innerHTML=h;
function tick(){var t=Math.max(0,D-new Date()),s=Math.floor(t/1000);
$("cd").textContent=kn(Math.floor(s/86400));$("ch").textContent=kn(Math.floor(s%86400/3600));$("cm").textContent=kn(Math.floor(s%3600/60));$("cs").textContent=kn(s%60)}
tick();setInterval(tick,1000);
/* cover */
$("open").onclick=function(){$("cover").classList.add("gone");document.body.style.overflow="";var a=$("bgm"),m=$("mus");m.classList.add("show");try{var p=a.play();if(p&&p.then)p.then(function(){m.classList.add("on")}).catch(function(){m.classList.add("off")})}catch(e){m.classList.add("off")}};
$("mus").onclick=function(){var a=$("bgm"),m=this;if(a.paused){a.play().then(function(){m.classList.add("on");m.classList.remove("off")}).catch(function(){})}else{a.pause();m.classList.remove("on");m.classList.add("off")}};
document.body.style.overflow="hidden";
$("lang").onclick=function(){this.textContent=this.textContent.indexOf("ខ្មែរ")>-1?"🌐 EN":"🌐 ខ្មែរ"};
/* gallery */
var gal=$("gal"),cur=0;
for(i=0;i<C.photos;i++){var s=document.createElement("div");s.className="s"+(i?"":" on");s.style.backgroundImage="url("+G[i]+")";gal.appendChild(s)}
var sl=gal.querySelectorAll(".s");
function show(k){cur=(k+sl.length)%sl.length;sl.forEach(function(e,j){e.classList.toggle("on",j===cur)});$("gc").textContent=kn(cur+1)+" / "+kn(sl.length)}
$("gp").onclick=function(){show(cur-1)};$("gn").onclick=function(){show(cur+1)};show(0);setInterval(function(){show(cur+1)},4500);
/* wishes */
var W=[];try{W=JSON.parse(localStorage.getItem("w")||"[]")}catch(e){}
function esc(t){return t.replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
function draw(){$("wl").innerHTML=W.map(function(w){return"<div><b>"+esc(w.n)+"</b><br>"+esc(w.t)+"</div>"}).join("")}
function tg(n,t){var c=window.TGCFG||{};try{if(c.relay)fetch(c.relay,{method:"POST",headers:{"Content-Type":"text/plain"},body:JSON.stringify({name:n,text:t})});else if(c.token&&c.chat)fetch("https://api.telegram.org/bot"+c.token+"/sendMessage",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({chat_id:c.chat,text:"💌 សារជូនពរថ្មី\n👤 "+n+"\n"+t})})}catch(e){}}
$("ws").onclick=function(){var n=$("wn").value.trim(),t=$("wt").value.trim();if(!n||!t)return;W.unshift({n:n,t:t});tg(n,t);try{localStorage.setItem("w",JSON.stringify(W))}catch(e){}$("wn").value=$("wt").value="";draw()};draw();
/* calendar */
(function(){var d=C.date.replace(/[-:]/g,"").slice(0,15),en=d.slice(0,9)+p(Math.min(23,+d.slice(9,11)+4))+d.slice(11);function p(n){return(n<10?"0":"")+n}
$("addcal").href="https://calendar.google.com/calendar/render?action=TEMPLATE&text="+encodeURIComponent("សិរីមង្គលអាពាហ៍ពិពាហ៍ "+C.groom+" & "+C.bride)+"&dates="+d+"/"+en+"&ctz=Asia/Phnom_Penh&location="+encodeURIComponent(C.venue)+"&details="+encodeURIComponent(C.lunar)}());
/* khqr */
function qs(a){$("qk").classList.toggle("on",a);$("qu").classList.toggle("on",!a);$("qrk").classList.toggle("on",a);$("qru").classList.toggle("on",!a)}
$("qk").onclick=function(){qs(true)};$("qu").onclick=function(){qs(false)};
/* reveal + nav */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)e.target.classList.add("in")})},{threshold:.15});
document.querySelectorAll(".rv").forEach(function(e){io.observe(e)});
var links=document.querySelectorAll("nav a"),sec=["home","date","place","agenda","photos","videos","wish"].map($);
addEventListener("scroll",function(){var k=0;sec.forEach(function(e,j){if(e.getBoundingClientRect().top<innerHeight*.5)k=j});links.forEach(function(a,j){a.classList.toggle("on",j===k)})},{passive:true});
