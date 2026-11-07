/* js/video.js — ចាក់វីដេអូ (ឯកសារវីដេអូកំណត់ក្នុង js/config.js ត្រង់ VIDEO) */
(function(){
var box=$("vbox"),v=$("vid"),failed=false,bgWas=false;
function play(){var p=v.play();if(p&&p.catch)p.catch(function(){})}
function fail(){failed=true;box.classList.remove("on");v.controls=false;v.removeAttribute("src");
 $("vbad").textContent=document.documentElement.lang==="en"?"This video cannot play here. Please try Chrome or Safari.":"វីដេអូមិនអាចចាក់ក្នុងកន្លែងនេះបានទេ សូមសាកល្បងក្នុង Chrome ឬ Safari។";box.classList.add("bad")}
v.addEventListener("error",function(){if(v.getAttribute("src"))fail()});
/* ត្រូវចាក់ភ្លាមៗក្នុងការចុច (ចាំបាច់សម្រាប់ iPhone) ដូច្នេះមិនប្រើ setTimeout ទេ */
function start(){if(failed)return;
 if(!v.getAttribute("src")){v.src=VIDEO}
 box.classList.add("on");v.controls=true;play()}
$("vplay").onclick=start;
v.addEventListener("click",function(){if(!v.controls)start()});
/* ផ្អាកចម្រៀងផ្ទៃខាងក្រោយ នៅពេលចាក់វីដេអូ ហើយបន្តវិញពេលបញ្ចប់ */
v.addEventListener("play",function(){var a=$("bgm"),m=$("mus");bgWas=!a.paused;if(bgWas){a.pause();m.classList.remove("on");m.classList.add("off")}});
function resume(){var a=$("bgm"),m=$("mus");if(bgWas&&a.paused){a.play().then(function(){m.classList.add("on");m.classList.remove("off")}).catch(function(){})}bgWas=false}
v.addEventListener("pause",function(){if(!v.ended)resume()});v.addEventListener("ended",resume);
new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting&&!v.paused)v.pause()})},{threshold:0}).observe(box);
})();
