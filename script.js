// Copy button
const copyBtn = document.getElementById("copyBtn");
const ipValue = document.getElementById("ipValue");
const copiedText = document.getElementById("copiedText");

copyBtn.onclick = () => {
  navigator.clipboard.writeText(ipValue.textContent);

  copiedText.classList.add("show");
  setTimeout(() => {
    copiedText.classList.remove("show");
  }, 1000);
};

// Tooltip
const tooltip = document.createElement("div");
tooltip.className = "tooltip";
document.body.appendChild(tooltip);

document.querySelectorAll(".top-left-icon").forEach(icon=>{
  icon.onmouseenter=()=>{
    tooltip.textContent=icon.dataset.tooltip;
    tooltip.classList.add("show");
  };
  icon.onmousemove=e=>{
    tooltip.style.left=e.clientX+"px";
    tooltip.style.top=e.clientY+"px";
  };
  icon.onmouseleave=()=>tooltip.classList.remove("show");
});

// Leaderboard
const data = {
  "Sword": ["Player1","Player2","Player3","Player4","Player5","Player6","Player7","Player8","Player9","Player10"],
  "Axe": ["Axer1","Axer2","Axer3","Axer4","Axer5","Axer6","Axer7","Axer8","Axer9","Axer10"],
  "Overall": ["Best1","Best2","Best3","Best4","Best5","Best6","Best7","Best8","Best9","Best10"]
};

const menuTitle = document.getElementById("menuTitle");
const menuContent = document.getElementById("menuContent");

function loadBoard(type){
  menuTitle.textContent = type + " Leaderboard";
  menuContent.innerHTML="";

  data[type].forEach((name,i)=>{
    const div=document.createElement("div");
    div.className="player";

    let rankClass="";
    if(i==0) rankClass="rank1";
    if(i==1) rankClass="rank2";
    if(i==2) rankClass="rank3";

    div.innerHTML = `
      <span class="${rankClass}">#${i+1}</span>
      <span>${name}</span>
      <span>${Math.floor(Math.random()*1000)} pts</span>
    `;
    menuContent.appendChild(div);
  });
}

// Default
loadBoard("Overall");

// Click icons
document.querySelectorAll(".top-left-icon").forEach(icon=>{
  icon.onclick=()=>loadBoard(icon.dataset.tooltip);
});