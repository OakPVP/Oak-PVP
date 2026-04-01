// COPY BUTTON (FIXED)
const copyBtn = document.getElementById('copyBtn');
const ipValue = document.getElementById('ipValue');
const copiedText = document.getElementById('copiedText');

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(ipValue.textContent);
  copiedText.classList.add('show');

  setTimeout(() => {
    copiedText.classList.remove('show');
  }, 1000);
});

// MENU (EMPTY — NO FAKE DATA)
const menu = document.getElementById('menu');
menu.innerHTML = "";
