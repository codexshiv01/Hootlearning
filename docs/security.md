# 🛡️ Security & Anti-Piracy Architecture

Protecting intellectual property (educational PDFs, storybooks, and videos) is the highest priority of the Hoot Portal. 

Because standard web browsers do not have Operating System-level hardware security clearances, it is technically impossible to *completely* prevent screenshots via JavaScript. However, the Hoot Portal utilizes an aggressive, multi-layered **Defense-in-Depth strategy** to deter piracy, block unauthorized sharing, and track access.

---

## 1. AWS S3 Pre-Signed URLs (The Vault)

All protected media resources are stored in a private AWS S3 Bucket (`hoot-secure-vault-2026`). 

- **Private by Default**: The bucket completely blocks all public access. Attempting to navigate directly to a file's base URL will instantly return an `Access Denied` error from Amazon.
- **Just-in-Time Access**: When an authenticated user opens the Dashboard, the backend verifies their identity and generates unique **Pre-Signed URLs** for the media. 
- **12-Hour Expiration**: These signed URLs contain an encrypted signature that acts as a temporary VIP ticket. They are strictly configured to self-destruct after 12 hours. Even if a student copies the URL and shares it with a friend, the link will eventually die, preventing permanent piracy.

---

## 2. Global Security Shield (The Blackout System)

The frontend Dashboard is wrapped in a silent security listener that monitors the user's browser for suspicious, piracy-related activity. When triggered, it instantly blacks out the screen and displays a massive `🚨 Security Alert`.

### Active Triggers:
1. **Window Focus Loss (Anti-Screen Record)**: 
   - *How it works:* Listens to the browser's `blur` event. 
   - *Why?* When a user opens the Windows Snipping Tool, Mac Screenshot tool, or a third-party screen recorder, the browser window instantly loses focus. The application blacks out *before* the external tool can capture the frame.
2. **Background Tab Recording**: 
   - *How it works:* Listens to the `document.hidden` API.
   - *Why?* Prevents browser extensions from recording the tab while the user minimizes the window.
3. **Keyboard Shortcuts**:
   - *How it works:* Intercepts specific keystrokes (`keydown` events).
   - *Why?* Aggressively blocks native print/save commands like `Ctrl+P` (Print), `Ctrl+S` (Save), and `Ctrl+C` (Copy).

---

## 3. CSS & DOM Deterrents

Even if a user tries to use developer tools or browser menus, the UI fights back.

### Context Menu Blocking
Right-clicking is disabled across the entire dashboard. This prevents users from easily inspecting the code or clicking "Save Image As..." on sensitive assets.

### Print Media Blocking
If a user tries to print the webpage or use the "Save to PDF" option in Chrome/Safari, the resulting document will be entirely blank. This is achieved using a strict `@media print` CSS rule that hides the `body` of the website exclusively from printers.

---

## 4. User Expiry & Account Lockout

Unlike simple password-protection systems, the Hoot Portal features an integrated subscription timer.
- When the Administrator creates an account, they select an exact expiration date (e.g., 1 month, 6 months).
- The moment that exact second passes, the backend instantly revokes their JWT token, kicks them out of the dashboard, and refuses to generate any more AWS S3 links for that account.
