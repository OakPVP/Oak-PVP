const copyBtn=document.getElementById("copyBtn");
const ipValue=document.getElementById("ipValue");
const copiedText=document.getElementById("copiedText");
copyBtn.onclick=()=>{navigator.clipboard.writeText(ipValue.textContent);copiedText.classList.add("show");setTimeout(()=>copiedText.classList.remove("show"),1000)};

const tooltip=document.createElement("div");
tooltip.className="tooltip";
document.body.appendChild(tooltip);
document.querySelectorAll(".top-left-icon").forEach(icon=>{icon.onmouseenter=()=>{tooltip.textContent=icon.dataset.tooltip;tooltip.classList.add("show")};icon.onmousemove=e=>{tooltip.style.left=e.clientX+"px";tooltip.style.top=e.clientY+"px"};icon.onmouseleave=()=>tooltip.classList.remove("show")});

let data={Sword:[],Axe:[],Mace:[],UHC:[],Pot:[], "Netherite OP":[],SMP:[],Vanilla:[]};
let orderCounter=0;
if(localStorage.getItem("oakPVPData")){const stored=JSON.parse(localStorage.getItem("oakPVPData"));data=stored.data;orderCounter=stored.orderCounter}

const menuTitle=document.getElementById("menuTitle");
const menuContent=document.getElementById("menuContent");
function saveData(){localStorage.setItem("oakPVPData",JSON.stringify({data,orderCounter}))}
function sortBoard(arr){return arr.sort((a,b)=>b.points===a.points?a.order-b.order:b.points-a.points)}
function getOverall(){let map={};Object.keys(data).forEach(mode=>{data[mode].forEach(p=>{if(!map[p.name])map[p.name]={name:p.name,points:0,order:p.order};map[p.name].points+=p.points;if(p.order<map[p.name].order)map[p.name].order=p.order})});return sortBoard(Object.values(map))}
function loadBoard(type){menuTitle.textContent=type+" Leaderboard";menuContent.innerHTML="";let list=type==="Overall"?getOverall():sortBoard(data[type]||[]);list.slice(0,101).forEach((p,i)=>{const div=document.createElement("div");div.className="player";let rankClass="";if(i==0)rankClass="rank1";if(i==1)rankClass="rank2";if(i==2)rankClass="rank3";div.innerHTML=`<span class="${rankClass}">#${i+1}</span><span>${p.name}</span><span>${p.points} pts</span>`;menuContent.appendChild(div)})}
loadBoard("Overall");
document.querySelectorAll(".top-left-icon").forEach(icon=>{icon.onclick=()=>loadBoard(icon.dataset.tooltip)});

let openUI=false;
const terminal=document.getElementById("terminal");
const panel=document.getElementById("panel");
const passwordInput=document.getElementById("passwordInput");
const _0x=["T2Fr","X1BWUDQ1M0dH"];
function getPass(){return atob(_0x[0]+_0x[1])}
document.addEventListener("keydown",(e)=>{if(e.key.toLowerCase()==="a"&&!openUI){e.preventDefault();terminal.style.display="block";passwordInput.focus();openUI=true}if(e.key==="Escape"){terminal.style.display="none";panel.style.display="none";openUI=false}});
passwordInput.addEventListener("keydown",(e)=>{if(e.key==="Enter"){if(passwordInput.value===getPass()){terminal.style.display="none";panel.style.display="block"}else passwordInput.value=""}});

const addBtn=document.getElementById("addBtn");
const clearBtn=document.getElementById("clearBtn");
const form=document.getElementById("form");
const user=document.getElementById("user");
const mode=document.getElementById("mode");
const points=document.getElementById("points");
const date=document.getElementById("date");

points.addEventListener("input",()=>points.value=points.value.replace(/[^0-9]/g,""));
date.addEventListener("input",()=>date.value=date.value.replace(/[^0-9/: ]/g,""));

function validDateTime(str){const m=str.match(/^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})$/);if(!m)return false;const d=parseInt(m[1]),mo=parseInt(m[2]),y=parseInt(m[3]);const h=parseInt(m[4]),mi=parseInt(m[5]);if(y<2000||y>new Date().getFullYear())return false;if(mo<1||mo>12)return false;if(d<1||d>31)return false;if(h>23||mi>59)return false;const dateObj=new Date(y,mo-1,d);return dateObj.getFullYear()===y&&dateObj.getMonth()===mo-1&&dateObj.getDate()===d}

addBtn.onclick=()=>{
  if(form.style.display==="none") form.style.display="block";
  else{
    if(user.value&&points.value&&validDateTime(date.value)){
      const selectedMode=mode.value;
      let existing=data[selectedMode].find(p=>p.name.toLowerCase()===user.value.toLowerCase());
      if(existing){existing.points+=parseInt(points.value)}
      else{data[selectedMode].push({name:user.value,points:parseInt(points.value),order:orderCounter++})}
      saveData();
      loadBoard(selectedMode);
      user.value="";points.value="";date.value="";form.style.display="none";
    }
  }
};

clearBtn.onclick=()=>{Object.keys(data).forEach(k=>data[k]=[]);orderCounter=0;saveData();menuContent.innerHTML=""};
