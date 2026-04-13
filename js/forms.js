

/* ═══════════════════════════════════════════
   INDIECO — FORM SUBMISSION HANDLER
   Google Apps Script integration
═══════════════════════════════════════════ */

// Replace with your deployed Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxSYnM6bStDEH8BgHQhZOPdtSoNPSMrAsv8gt_BKhL3hz5tBIevH-xNrDWVnXYz506h/exec';

/**
 * Submit form data to Google Sheets via Apps Script
 * @param {Object} data - key/value pairs to store
 * @returns {Promise<boolean>} success flag
 */
async function submitToSheet(data) {
  try {
    await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Apps Script doesn't support CORS
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
        source: window.location.href,
      }),
    });
    return true;
  } catch (err) {
    console.error('Form submission error:', err);
    return false;
  }
}

/**
 * Wire up a form element with standard IndieCo submission behavior.
 * @param {HTMLFormElement} form
 * @param {Function} [onSuccess] - called after successful submit
 * @param {Function} [onError] - called after failed submit
 */
function initForm(form, onSuccess, onError) {
  if (!form) return;

  const btn = form.querySelector('[type="submit"], .form-submit');
  const successMsg = form.nextElementSibling?.classList?.contains('form-success')
    ? form.nextElementSibling
    : null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect fields
    const data = {};
    new FormData(form).forEach((val, key) => { data[key] = val; });

    // Loading state
    if (btn) {
      btn.disabled = true;
      btn.dataset.original = btn.textContent;
      btn.textContent = 'Sending…';
    }

    const ok = await submitToSheet(data);

    if (ok) {
      form.reset();
      if (successMsg) successMsg.style.display = 'block';
      if (onSuccess) onSuccess(form);
    } else {
      if (onError) onError(form);
    }

    if (btn) {
      btn.disabled = false;
      btn.textContent = btn.dataset.original;
    }
  });
}

// Auto-init all forms with data-form="indieco"
document.querySelectorAll('[data-form="indieco"]').forEach(f => initForm(f));
