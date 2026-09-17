# ✨ Core Features & Functionality

The Hoot Portal was custom-built from the ground up to provide a premium, highly engaging user experience. Instead of relying on generic templates, every component was engineered to feel responsive, secure, and intuitive for both students and administrators.

---

## 1. The Interactive Resource Grid

The Dashboard relies on an intelligent `ResourceGrid` component. Instead of just displaying a boring list of files, it adapts its User Interface (UI) dynamically based on the *type* of educational material it is presenting.

- **Protected Books (Flipbooks/PDFs)**: The grid displays a "Read Book" button. Clicking it seamlessly opens the custom PDF Viewer overlay without forcing the user to leave the page or download the file.
- **Public Printables (Downloads)**: For files that *are* meant to be distributed (like Monthly Letters), the grid displays a distinct green "Download PDF" button, allowing quick and easy saving to the user's local machine.
- **Media (Videos)**: The grid displays a "Watch Video" button. Clicking it launches the cinematic Video Modal.

### Automated PDF Thumbnails
The grid utilizes advanced rendering technology in the background. It actually downloads the very first page of the PDF and converts it into a high-quality image thumbnail for the resource card automatically. 

---

## 2. Premium PDF Reading Engine

Most websites just link to PDFs, forcing the browser to use its default, clunky PDF reader. We built a bespoke, integrated PDF reading engine similar to platforms like *Scribd* or *Kindle Web*.

- **Continuous Scroll**: Renders all pages vertically for a seamless trackpad/mouse scrolling experience, keeping students immersed in the content.
- **Interactive Sidebar Navigation**: Automatically maps through the total number of pages and generates a sidebar of clickable thumbnail previews. Clicking a thumbnail instantly scrolls the main view to that exact page.
- **Contextual Security**: If the file is meant to be downloaded, a "⬇ Download" button is injected into the reader's header. If the file is protected, the download button is permanently hidden.

---

## 3. Cinematic Video Player

When a video resource is clicked, the Dashboard dims the background and opens a custom, theater-style video player overlay.
- **Distraction-Free**: Takes over the screen so the student is focused entirely on the educational content.
- **Anti-Download Controls**: Utilizes specific HTML5 attributes (`controlsList="nodownload"`) to force the browser to hide its native download button from the video controls menu.

---

## 4. Fully Responsive Mobile UI & Sidebar

The entire portal is engineered to provide a seamless, native-app-like experience on mobile devices.
- **Dynamic Sidebar**: A collapsible hamburger menu replaces the desktop navigation bar on smaller screens, keeping the UI clean and dedicating screen real-estate to educational content.
- **Responsive Layouts**: Login cards, Hero sections, and Dashboard grids adapt their padding and grid-templates fluidly across all breakpoints.
- **Mobile PDF Reading**: The PDF viewer automatically detects device width and scales documents to fit perfectly within the mobile viewport while hiding auxiliary sidebars.

---

## 5. Comprehensive Administrator Panel

The platform includes a hidden `/admin/login` portal granting complete control over the system to authorized staff.

- **User Management Tab**: Administrators can easily generate new accounts for students or teachers.
- **Subscription Control**: Admins assign custom expiration dates (e.g., 1 month, 6 months) when creating accounts.
- **One-Click Revoke**: If an account is compromised, the Admin can click "Revoke Access" to instantly delete the user and lock them out of the platform forever.
