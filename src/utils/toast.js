export function showToast(msg, type = 'info', dur = 3000) {
  // Check ki wrapper DOM me hai ya nahi, agar nahi hai toh create karein
  let w = document.getElementById('toastWrap');
  if (!w) {
    w = document.createElement('div');
    w.id = 'toastWrap';
    // Style wrapper position via CSS or direct inline styles
    w.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 9999; display: flex; flex-direction: column; gap: 8px;';
    document.body.appendChild(w);
  }

  // Icon mapping
  const iconMap = {
    ok: 'check',
    warn: 'alert-triangle',
    bad: 'x',
    info: 'info-circle'
  };

  const iconName = iconMap[type] || 'info-circle';

  // Create Toast Element
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  
  // Hardcoded ID ki jagah clean class structure
  t.innerHTML = `
    <i class="ti ti-${iconName}"></i>
    <div class="toast-msg">${msg}</div>
  `;

  w.appendChild(t);

  // Auto hide and remove logic
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      t.remove();
      // Agar saare toast remove ho gaye to wrapper container bhi clean up kar dein
      if (w.childElementCount === 0) {
        w.remove();
      }
    }, 300);
  }, dur);
}