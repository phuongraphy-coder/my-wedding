/* ===== Language toggle (Khmer / English) ===== */
(function(){
var E={groom:"Phuong Sitha Raphy",bride:"Phon Chan Sovannry",f1:"Phuong Phat",m1:"Leng Sochet",f2:"Iv Kong",m2:"Kit Mara"};
var T=[],LANG="km";
function reg(sel,en){var els=document.querySelectorAll(sel);T.push({els:els,kh:Array.prototype.map.call(els,function(e){return e.innerHTML}),en:en})}
function perLi(a){return a.map(function(x){return"<b>"+x[0]+"</b><span>"+x[1]+"</span>"})}
reg(".cv h1",["Wedding Ceremony"]);
reg(".pls",["You Are Cordially Invited"]);
reg("#guest",[$("guest").innerHTML==="ភ្ញៀវកិត្តិយស"?"Honored Guest":$("guest").innerHTML]);
reg("#open",["Tap to open the invitation"]);
reg("#home h2",["The Wedding Ceremony"]);
reg("#home .par div",["Mr. <b>"+E.f1+"</b><br>Mrs. <b>"+E.m1+"</b>","Mr. <b>"+E.f2+"</b><br>Mrs. <b>"+E.m2+"</b>"]);
reg("#home .inv",["We have the honor to invite"]);
reg("#home > p[style]",["Excellencies, Oknha, Lok Chumteav, Sirs, Madams and Misses, to join us as guests of honor and to bestow blessings of prosperity and joy upon the newlyweds at their wedding ceremony."]);
reg(".nm.a small",["Bride"]);reg(".nm.b small",["Groom"]);
reg("#bride",[E.bride]);reg("#groom",[E.groom]);
reg("#date h2",["You Are Invited"]);
reg("#date > p:first-of-type",["to honor our wedding ceremony"]);
reg("#datetxt",["Saturday, January 2, 2027<br>5:00 PM<br>Khmer lunar calendar: Saturday, 9th waning day of Pous, Year of the Horse (Atthasak), B.E. 2570"]);
reg(".hero .ov h2",["Countdown to the Big Day"]);
reg(".cd span",["Days","Hours","Mins","Secs"]);
reg("#addcal",["📅 Add to your calendar"]);
reg("#place h2",["Venue"]);
reg("#venue",["Phum Pho Anhdaot, Commune Cheung Phnum, Ba Phnum District, Prey Veng Province"]);
reg("#gmap",["View on Google Maps"]);
reg("#agenda h2",["Program"]);
reg(".day .dh",["Day 1","Day 2"]);
reg(".day .dd",["Friday, January 1, 2027","Saturday, January 2, 2027"]);
reg(".ag li",perLi([
["3:00 PM","Sen Krong Peali ceremony"],
["4:00 PM","Buddhist chanting and blessing ceremony"],
["5:00 PM","Chum Pel ceremony and Khan Sla ceremony"],
["6:00 PM","Dinner"],
["6:30 AM","Family and friends gather to prepare the wedding procession"],
["7:00 AM","Wedding procession enters the wedding hall"],
["7:30 AM","Ceremonial negotiation, offerings, fruit-arranging songs and breakfast"],
["8:30 AM","Hair-cutting ceremony"],
["9:30 AM","Sampeah Phtem: hand-tying, candle circling and scarf ceremony"],
["12:00 PM","Lunch"],
["5:00 PM","Reception for honored guests"]]));
reg("#photos h2",["Gallery"]);
reg("#videos h2",["Video Gallery"]);
reg("#wish h2",["Well Wishes"]);
reg("#thanks h2",["Thank You and Our Apologies"]);
reg(".thx",["We sincerely thank you for your presence and for bestowing your blessings at our wedding ceremony. We apologize that we were unable to invite each of you in person."]);
reg(".khqrh",["Send a gift via: <span>KHQR</span>"]);
reg("#qk",["Riel"]);reg("#qu",["USD"]);
reg("#ws",["Send your wishes"]);
var PH=[["wn","ឈ្មោះរបស់អ្នក","Your name"],["wt","សរសេរពាក្យជូនពរ...","Write your wishes…"]];
var MEN=["January","February","March","April","May","June","July","August","September","October","November","December"],DEN=["Su","Mo","Tu","We","Th","Fr","Sa"];
var _kn=kn;kn=function(n){return LANG==="en"?String(n):_kn(n)};
function renderCal(){
 var en=LANG==="en",h=(en?DEN:DAYS).map(function(d){return"<b>"+d+"</b>"}).join(""),i;
 for(i=0;i<first;i++)h+="<span></span>";
 for(i=1;i<=n;i++)h+='<span class="d'+(i===D.getDate()?" on":"")+'">'+kn(i)+"</span>";
 $("cal").innerHTML=h;
 $("calt").textContent=en?MEN[M]+" "+Y:"ខែ"+MONTHS[M]+" "+kn(Y);
}
function apply(l){
 LANG=l;var en=l==="en";
 document.documentElement.lang=en?"en":"km";
 document.body.classList.toggle("en",en);
 document.title=en?"The Wedding Ceremony":"សិរីមង្គលអាពាហ៍ពិពាហ៍";
 T.forEach(function(t){Array.prototype.forEach.call(t.els,function(e,i){
  if(en){var v=t.en.length===1&&t.els.length>1?t.en[0]:t.en[i];if(v!=null)e.innerHTML=v}else e.innerHTML=t.kh[i]})});
 PH.forEach(function(p){$(p[0]).placeholder=en?p[2]:p[1]});
 $("lang").textContent=en?"🌐 EN":"🌐 ខ្មែរ";
 renderCal();tick();show(cur);
 try{localStorage.setItem("lang",l)}catch(e){}
}
$("lang").onclick=function(){apply(LANG==="km"?"en":"km")};
var s=null;try{s=localStorage.getItem("lang")}catch(e){}
if(s==="en")apply("en");
})();
