// Copy IP button
const copyBtn = document.getElementById('copyBtn');
const ipValue = document.getElementById('ipValue');
const copiedText = document.getElementById('copiedText');

copyBtn.addEventListener('click', () => {
  const text = ipValue.textContent;

  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand('copy');
    copiedText.classList.add('show');
    setTimeout(() => copiedText.classList.remove('show'), 1000);
  } catch (err) {
    alert('Copy failed');
  }

  document.body.removeChild(textarea);
});

// Scrollable menu setup
const menu = document.getElementById('menu');
menu.innerHTML = ''; // menu starts empty, ready for real player data
// Future: admins can add players via JSON or backend
