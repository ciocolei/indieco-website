/* ═══════════════════════════════════════════════
   INDIECO — FORM → GOOGLE SHEETS INTEGRATION
   ═══════════════════════════════════════════════

   HOW THIS WORKS:
   1. Create a Google Apps Script Web App (see README.md for instructions)
   2. Paste your deployed Web App URL below as APPS_SCRIPT_URL
   3. The script POSTs form data as JSON to that URL
   4. Apps Script writes the row to your Google Sheet

   ═══════════════════════════════════════════════ */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxSYnM6bStDEH8BgHQhZOPdtSoNPSMrAsv8gt_BKhL3hz5tBIevH-xNrDWVnXYz506h/exec';
// Replace the above with your deployed Google Apps Script URL
// Example: 'https://script.google.com/macros/s/AKfycby.../exec'

/**
 * Serialize a form element into a plain object.
 * Handles inputs, selects, textareas, checkboxes, radio buttons.
 */
function serializeForm(form) {
  const data = {};
  const fd = new FormData(form);

  // Collect all checkbox groups as comma-separated
  const checkboxGroups = {};
  form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    if (!checkboxGroups[cb.name]) checkboxGroups[cb.name] = [];
    if (cb.checked) checkboxGroups[cb.name].push(cb.value);
  });

  fd.forEach((value, key) => {
    if (data[key]) {
      // Already set (multi-value) — skip; handled by checkboxGroups
    } else {
      data[key] = value;
    }
  });

  // Override checkbox keys with joined strings
  Object.entries(checkboxGroups).forEach(([key, vals]) => {
    data[key] = vals.join(', ');
  });

  // Add metadata
  data['_submitted_at'] = new Date().toISOString();
  data['_page'] = window.location.pathname;

  return data;
}

/**
 * Submit form data to Google Sheets via Apps Script.
 * Returns a Promise that resolves on success, rejects on failure.
 */
async function submitToSheets(formData) {
  if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_URL_HERE') {
    console.warn('IndieCo: APPS_SCRIPT_URL not configured. Form data logged to console only.');
    console.table(formData);
    // Simulate success in dev
    return Promise.resolve({ status: 'dev_mode' });
  }

  const response = await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // Apps Script requires no-cors
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  // no-cors returns opaque response — assume success if no throw
  return { status: 'submitted' };
}

/**
 * Attach submit handler to a form.
 *
 * Options:
 *   onSuccess(formData) — called after successful submission
 *   onError(err)        — called on network/validation error
 *   validate()          — optional custom validator; return true to proceed
 *   buttonSelector      — CSS selector for submit button (default: [type="submit"])
 */
function attachFormHandler(formEl, options = {}) {
  if (!formEl) return;

  const {
    onSuccess = () => {},
    onError = () => {},
    validate = null,
    buttonSelector = '[type="submit"]',
  } = options;

  formEl.addEventListener('submit', async function (e) {
    e.preventDefault();

    // Custom validation
    if (validate && !validate()) return;

    const btn = formEl.querySelector(buttonSelector);
    const originalText = btn ? btn.textContent : '';

    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Sending…';
    }

    try {
      const data = serializeForm(formEl);
      await submitToSheets(data);
      onSuccess(data);
    } catch (err) {
      console.error('Form submission error:', err);
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
      }
      onError(err);
    }
  });
}
