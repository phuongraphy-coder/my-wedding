/* js/lightbox.js — ចុចរូបដើម្បីមើលធំ */
(function(){
var S=document.querySelectorAll("#gal .s"),N=S.length,li=0,lb=$("lb"),im=$("lbi"),x0=null;
/* ទីតាំងមុខគូស្វាមីភរិយាក្នុងស៊ុមរូប (ដើម្បីកុំឱ្យកាត់មុខ) */
var GP={2:"29% 50%",3:"45% 50%",1:"47% 50%",12:"47% 50%",13:"57% 50%",10:"61% 50%"};
for(var k in GP)if(S[k])S[k].style.backgroundPosition=GP[k];
function paint(){im.style.opacity=0;setTimeout(function(){im.src=G[li];im.style.opacity=1},120);$("lbt").textContent=kn(li+1)+" / "+kn(N)}
function open(j){li=j;im.src=G[li];$("lbt").textContent=kn(li+1)+" / "+kn(N);lb.classList.add("on");lb.setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function close(){lb.classList.remove("on");lb.setAttribute("aria-hidden","true");document.body.style.overflow="";show(li)}
function go(d){li=(li+d+N)%N;paint()}
S.forEach(function(e,j){e.onclick=function(){if(j===cur)open(j);else show(j)}});
$("lbc").onclick=close;$("lbp").onclick=function(e){e.stopPropagation();go(-1)};$("lbn").onclick=function(e){e.stopPropagation();go(1)};
lb.addEventListener("click",function(e){if(e.target===lb)close()});
lb.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
lb.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>50)go(dx<0?1:-1)},{passive:true});
addEventListener("keydown",function(e){if(!lb.classList.contains("on"))return;if(e.key==="Escape")close();else if(e.key==="ArrowRight")go(1);else if(e.key==="ArrowLeft")go(-1)});
})();
