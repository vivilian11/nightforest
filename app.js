const grid = document.getElementById('grid');
const emptyHint = document.getElementById('empty-hint');
const searchInput = document.getElementById('search');

let allCards = [];

// ---- 年龄确认门 ----
const gate = document.getElementById('gate');
if (localStorage.getItem('nf-age-ok') === '1') gate.hidden = true;
document.getElementById('gate-enter').addEventListener('click', () => {
  localStorage.setItem('nf-age-ok', '1');
  gate.hidden = true;
});

// ---- 拉取卡片列表（静态清单，由 build.js 生成） ----
async function loadCards() {
  const res = await fetch('cards.json', { cache: 'no-store' });
  allCards = await res.json();
  render(allCards);
}

function cardImagePath(card) {
  return `cards/${encodeURIComponent(card.id)}.png`;
}
function cardJsonPath(card) {
  return `cards/${encodeURIComponent(card.id)}.json`;
}

function render(cards) {
  grid.innerHTML = '';
  emptyHint.hidden = cards.length > 0;

  for (const card of cards) {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `
      <div class="card-thumb">
        ${card.hasImage
          ? `<img src="${cardImagePath(card)}" alt="${escapeHtml(card.name)}" loading="lazy" />`
          : `<span class="placeholder">📜</span>`}
      </div>
      <div class="card-body">
        <p class="card-name">${escapeHtml(card.name)}</p>
        <div class="tag-row">${(card.tags || []).slice(0, 3).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
        <p class="card-summary">${escapeHtml(card.summary || '')}</p>
      </div>
    `;
    el.addEventListener('click', () => openDetail(card));
    grid.appendChild(el);
  }
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  if (!q) return render(allCards);
  render(allCards.filter((c) =>
    c.name.toLowerCase().includes(q) ||
    (c.tags || []).some((t) => String(t).toLowerCase().includes(q))
  ));
});

// ---- 详情弹窗 ----
const detailModal = document.getElementById('detail-modal');
const detailImg = document.getElementById('detail-img');
const detailName = document.getElementById('detail-name');
const detailTags = document.getElementById('detail-tags');
const detailDesc = document.getElementById('detail-desc');
const detailDownload = document.getElementById('detail-download');

async function openDetail(card) {
  detailName.textContent = card.name;
  detailImg.src = card.hasImage ? cardImagePath(card) : '';
  detailImg.style.display = card.hasImage ? 'block' : 'none';
  detailTags.innerHTML = (card.tags || []).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('');
  detailDesc.textContent = '加载中…';
  detailDownload.disabled = false;
  detailDownload.textContent = '下载角色卡（.zip）';
  detailDownload.onclick = () => downloadCard(card);
  detailModal.hidden = false;

  try {
    const res = await fetch(cardJsonPath(card), { cache: 'no-store' });
    const data = await res.json();
    detailDesc.textContent = data.description || data.data?.description || '（无描述）';
  } catch (e) {
    detailDesc.textContent = '加载详情失败';
  }
}

// 纯前端打包成 zip（json + png），不需要任何服务器
async function downloadCard(card) {
  detailDownload.disabled = true;
  detailDownload.textContent = '打包中…';
  try {
    const zip = new JSZip();
    const jsonBlob = await fetch(cardJsonPath(card)).then((r) => r.blob());
    zip.file(`${card.id}.json`, jsonBlob);
    if (card.hasImage) {
      const pngBlob = await fetch(cardImagePath(card)).then((r) => r.blob());
      zip.file(`${card.id}.png`, pngBlob);
    }
    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${card.id}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    alert('打包下载失败，请重试');
  } finally {
    detailDownload.disabled = false;
    detailDownload.textContent = '下载角色卡（.zip）';
  }
}

// ---- 通用弹窗关闭 ----
document.querySelectorAll('[data-close]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.currentTarget.closest('.modal').hidden = true;
  });
});

loadCards();
