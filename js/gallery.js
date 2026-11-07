/* js/gallery.js — កម្រងរូបភាព (slide ឆ្វេង/ស្តាំ អូសដោយម្រាមដៃ) */
(function(){
var g=$("gal"),S=g.querySelectorAll(".s"),N=S.length;
show=function(k){cur=(k+N)%N;
 S.forEach(function(e,j){var d=((j-cur)%N+N)%N;if(d>N/2)d-=N;e.className="s "+(d===0?"c":d===-1?"l":d===1?"r":"h")});
 $("gc").textContent=kn(cur+1)+" / "+kn(N)};
S.forEach(function(e,j){e.onclick=function(){if(j!==cur)show(j)}});
var x0=null;
g.addEventListener("touchstart",function(e){x0=e.touches[0].clientX},{passive:true});
g.addEventListener("touchend",function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>40)show(cur+(dx<0?1:-1))},{passive:true});
show(cur);
var ph=$("photos");
for(var i=0;i<9;i++){var p=document.createElement("span");p.className="pt";p.style.left=(5+i*11)+"%";p.style.animationDuration=(9+(i*7)%6)+"s";p.style.animationDelay=(-(i*13)%9)+"s";p.style.transform="scale("+(.7+(i%3)*.25)+")";ph.appendChild(p)}
})();
