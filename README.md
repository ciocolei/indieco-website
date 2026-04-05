# IndieCo Website

A 7-page static website for IndieCo.

---

## 📁 Project Structure

```
indieco/
├── index.html                  ← Home
├── pages/
│   ├── about.html              ← About Us (+ Calendly embed)
│   ├── get-started.html        ← Get Started (quick intake form)
│   ├── premier-services.html   ← Premier Services
│   ├── standard-services.html  ← Standard Services
│   ├── work-with-us.html       ← Work With Us (full interest form)
│   └── store.html              ← Store (From Stage to Screen)
├── css/
│   ├── base.css                ← Design tokens & shared styles
│   └── nav.css                 ← Navigation & footer styles
├── js/
│   ├── nav.js                  ← Shared nav/footer renderer + scroll effects
│   └── forms.js                ← Google Sheets form submission handler
└── README.md
```

---

## Deploy to GitHub Pages

### Step 1 — Push to GitHub

```bash
# From inside the indieco/ folder:
git init
git add .
git commit -m "Initial IndieCo website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Source: **Deploy from a branch** → `main` → `/ (root)` → Save
3. Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO/`

### Step 3 — Connect Custom Domain (`www.indieco.com.co`)

**In GitHub** (Settings → Pages → Custom domain):
```
www.indieco.com.co
```
Check "Enforce HTTPS" after DNS propagates.

**In your domain registrar DNS settings**, add:

| Type  | Host | Value                  |
|-------|------|------------------------|
| A     | @    | 185.199.108.153        |
| A     | @    | 185.199.109.153        |
| A     | @    | 185.199.110.153        |
| A     | @    | 185.199.111.153        |
| CNAME | www  | YOUR_USERNAME.github.io |

DNS propagation takes 10 minutes to 48 hours.

---

## 📊 Google Sheets Form Integration

Forms on **Get Started** and **Work With Us** submit data to Google Sheets via Apps Script.

### Step 1 — Set up Apps Script

1. Open your Google Sheet:  
   `https://docs.google.com/spreadsheets/d/1KIaCioY0i-STur2qAXCvTBA_XrAia8i5DmAdklUo-J0/edit`

2. Click **Extensions → Apps Script**

3. Delete any existing code and paste this:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    // Build header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      var headers = Object.keys(data);
      sheet.appendRow(headers);
    }
    
    // Append data row (in same order as headers)
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function(h) { return data[h] || ''; });
    sheet.appendRow(row);
    
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy** → copy the Web App URL

### Step 2 — Add URL to forms.js

Open `js/forms.js` and replace line 15:

```javascript
// BEFORE:
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';

// AFTER (example):
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
```

Commit and push. Forms will now submit to your sheet automatically.

> **Note:** The form uses `mode: 'no-cors'` because Google Apps Script doesn't support CORS headers on POST requests. This means submissions are "fire and forget" — they won't return a response, but they will land in your sheet. This is standard practice for Apps Script integrations.

---

## 📅 Calendly Integration

The Calendly embed is pre-configured on:
- `/pages/about.html` — inline booking widget
- `/pages/work-with-us.html` — inline booking widget (form won't submit until a slot is booked)

The current URL used:
```
https://calendly.com/indieco/1-1-working-session-with-leah
```

To change it, search for `calendly.com/indieco` across both files and replace with your updated URL.

---

## 🧭 Navigation

The navigation and footer are rendered dynamically by `js/nav.js`. To add, remove, or rename a page:

1. Open `js/nav.js`
2. Edit the `NAV_LINKS` array at the top:

```javascript
const NAV_LINKS = [
  { label: 'Home',         href: '/index.html' },
  { label: 'About',        href: '/pages/about.html' },
  // Add or remove entries here
];
```

All pages update automatically.

---

## 🎨 Design Tokens

All colors and fonts are in `css/base.css` under `:root`. To change the gold accent:

```css
:root {
  --gold: #b8976a;       /* main gold */
  --gold-light: #d4bc9b; /* hover states */
  --gold-dark: #8a6830;  /* text on light bg */
}
```

---

## ✅ Checklist Before Going Live

- [ ] Replace `YOUR_APPS_SCRIPT_URL_HERE` in `js/forms.js` with deployed URL
- [ ] Verify Calendly URL is correct in `about.html` and `work-with-us.html`
- [ ] Update Amazon buy link in `store.html` if needed
- [ ] Add `CNAME` file to repo root with `www.indieco.com.co` for custom domain
- [ ] Set DNS records at your registrar
- [ ] Enable HTTPS in GitHub Pages settings

---

## 📝 Adding a CNAME File (required for custom domain)

Create a file called `CNAME` (no extension) in the root of the project with one line:

```
www.indieco.com.co
```

This tells GitHub Pages to serve the site at your custom domain.
