/* js/petals.js — ផ្កាធ្លាក់ពេលបើកសំបុត្រ */
(function(){
var c=document.createElement("div");c.id="petals";document.body.appendChild(c);
var cols=["#fff0f3,#f6bcc8","#ffe4ea,#f2a9ba","#fff6f0,#f7cdb8","#ffeef2,#eaa0b6"];
for(var i=0;i<18;i++){var p=document.createElement("span"),s=.6+((i*37)%10)/10*.9;
 p.style.cssText="left:"+((i*53)%100)+"%;width:"+(9*s)+"px;height:"+(13*s)+"px;animation-duration:"+(9+(i*5)%8)+"s;animation-delay:"+(-(i*7)%12)+"s;--dx:"+((i%2?1:-1)*(20+(i*11)%50))+"px;background:radial-gradient(circle at 30% 30%,"+cols[i%4]+")";
 c.appendChild(p)}
$("open").addEventListener("click",function(){c.classList.add("on")});
})();
