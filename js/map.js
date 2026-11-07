/* js/map.js — ផែនទី Google Map (ទីតាំងកំណត់ក្នុង js/config.js ត្រង់ mapq) */
(function(){
var mp=document.querySelector(".map"),fr=$("mapf");
function noMap(){fr.style.display="none";mp.classList.add("nomap");mp.onclick=function(){window.open($("gmap").href,"_blank","noopener")}}
/* បើទំព័រនេះបើកក្នុងកន្លែងដែលហាមដាក់ផែនទី (CSP) នឹងបង្ហាញប៊ូតុងជំនួស */
document.addEventListener("securitypolicyviolation",function(e){if(/frame|child/.test(e.violatedDirective))noMap()});
function setMap(){var q=(C.mapq&&C.mapq.trim())||C.venue,en=document.documentElement.lang==="en";
$("mfbt").textContent=en?"Tap the button below to open the map":"ចុចប៊ូតុងខាងក្រោម ដើម្បីបើកផែនទី";
fr.src="https://www.google.com/maps?q="+encodeURIComponent(q)+"&z=17&hl="+(en?"en":"km")+"&output=embed";
$("gmap").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(q)}
setMap();$("lang").addEventListener("click",function(){setTimeout(setMap,50)});
})();
