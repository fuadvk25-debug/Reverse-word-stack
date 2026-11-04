const MAX_WORDS = 8;
let words = [];
let reversed = false;
const form = document.getElementById('wordForm');
const input = document.getElementById('wordInput');
const stackVessel = document.getElementById('stackVessel');
const emptyState = document.getElementById('emptyState');
const outputArea = document.getElementById('outputArea');
const reverseButton = document.getElementById('reverseButton');
const resetButton = document.getElementById('resetButton');
const wordCount = document.getElementById('wordCount');
const resultStatus = document.getElementById('resultStatus');
const outputSequence = document.getElementById('outputSequence');
const successNote = document.getElementById('successNote');
const toast = document.getElementById('toast');

function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove('show'), 2300);
}
function renderStack() {
  stackVessel.querySelectorAll('.word-block').forEach(node => node.remove());
  emptyState.style.display = words.length ? 'none' : 'flex';
  words.forEach((word, index) => {
    const tile = document.createElement('div');
    tile.className = 'word-block';
    tile.innerHTML = `<span></span><small></small>`;
    tile.querySelector('span').textContent = word;
    tile.querySelector('small').textContent = index === words.length - 1 ? 'TOP' : `#${index + 1}`;
    stackVessel.appendChild(tile);
  });
  wordCount.textContent = `${words.length} / ${MAX_WORDS}`;
  reverseButton.disabled = words.length === 0 || reversed;
}
function renderOutput(items) {
  outputArea.innerHTML = '';
  if (!items.length) {
    outputArea.innerHTML = '<div class="output-placeholder"><span class="output-symbol">↙</span><span>Your reversed words<br>will land here.</span></div>';
    outputSequence.textContent = '—';
    return;
  }
  items.forEach((word, index) => {
    const row = document.createElement('div');
    row.className = 'output-word';
    const name = document.createElement('span');
    name.textContent = word;
    const number = document.createElement('small');
    number.textContent = `OUT ${String(index + 1).padStart(2, '0')}`;
    row.append(name, number);
    outputArea.appendChild(row);
  });
  outputSequence.textContent = items.join('  →  ');
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const word = input.value.trim().replace(/\s+/g, ' ');
  if (!word) return notify('Type a word before pushing it.');
  if (words.length >= MAX_WORDS) return notify(`This demo supports up to ${MAX_WORDS} words.`);
  if (reversed) resetOutput();
  words.push(word.toUpperCase());
  input.value = '';
  renderStack();
  input.focus();
});
function resetOutput() {
  reversed = false;
  resultStatus.textContent = 'WAITING';
  successNote.classList.remove('show');
  renderOutput([]);
  renderStack();
}
reverseButton.addEventListener('click', () => {
  if (!words.length || reversed) return;
  const workingStack = [...words];
  const result = [];
  while (workingStack.length) result.push(workingStack.pop());
  renderOutput(result);
  reversed = true;
  resultStatus.textContent = 'COMPLETE';
  successNote.classList.add('show');
  reverseButton.disabled = true;
  notify('Stack reversed! Last in, first out.');
});
resetButton.addEventListener('click', () => {
  words = [];
  resetOutput();
  notify('Workspace cleared. Start a new stack!');
});
document.getElementById('sampleButton').addEventListener('click', () => {
  words = ['HELLO', 'WORLD', 'STACK'];
  resetOutput();
  renderStack();
  notify('Sample words added. Now reverse the stack.');
});
renderStack();
