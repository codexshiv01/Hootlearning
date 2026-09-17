# Hoot Portal 🦉

Hoot Portal is a secure, full-stack educational resource and document management system. It is designed to host, manage, and securely serve digital library resources (PDFs, images) to students while robustly protecting against piracy (screenshots, right-clicking, and text selection). 

## 🚀 Features

- **Public & Private Library**: Visitors can browse the library's folder structure, while students must log in to actually open and read documents.
- **Admin Dashboard**: A comprehensive admin panel to manage users, upload files directly to AWS S3, and organize documents into dynamic Folders and Categories.
- **Secure PDF Viewer**: Integrated custom PDF viewer built with `react-pdf`, fully optimized for both desktop and mobile devices.
- **Anti-Piracy Shield**: Global event listeners block right-clicking, common screenshot keyboard shortcuts, text selection, and drag-and-drop to protect copyrighted materials.
- **Fully Responsive**: Beautiful, modern UI optimized for all screen sizes from large desktops to small smartphones.

## 🛠️ Tech Stack

**Frontend**
- React (Vite)
- React Router DOM
- React-PDF (PDF.js)
- Lucide React (Icons)
- Vanilla CSS with responsive media queries

**Backend**
- Node.js & Express.js
- Prisma (ORM)
- PostgreSQL (via Neon Serverless)
- AWS SDK (S3 for secure file storage)
- JWT (Authentication) & Bcrypt (Password Hashing)
- Multer (File upload handling)

## 📦 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A PostgreSQL Database (e.g., Neon)
- An AWS S3 Bucket

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/hoot-portal.git
   cd hoot-portal
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd ../server
   npm install
   ```

### Environment Variables

**Backend (`server/.env`):**
Create a `.env` file in the `server` directory and add your credentials:
```env
DATABASE_URL="postgresql://user:password@host.region.aws.neon.tech/dbname?sslmode=require"
PORT=5000
JWT_SECRET="your_super_secret_jwt_key"

AWS_REGION="your-aws-region"
AWS_BUCKET_NAME="your-s3-bucket-name"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
```

**Frontend (`frontend/.env`):**
Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000
```

### Database Setup

Run the following commands inside the `server` directory to set up your PostgreSQL database schema and seed the initial Admin user.

```bash
# Push Prisma schema to your live database
npx prisma db push

# Seed the database with the default Admin user
node seed.js
```
*(Default Admin Login: `admin` / `password123`)*

### Running Locally

You will need two terminal windows to run both the frontend and backend simultaneously.

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🚢 Deployment

When deploying to production platforms (e.g., Vercel, Render, Heroku):
1. **Frontend**: Add `VITE_API_URL` to your hosting provider's environment variables, pointing to your deployed backend URL.
2. **Backend**: Ensure `DATABASE_URL` and all `AWS_*` variables are set in your backend hosting environment.
3. `.env` files are strictly ignored in source control by the root `.gitignore` to keep your credentials safe.

## 🔒 Security Notes
The portal includes client-side security measures to discourage piracy. To test or use Chrome DevTools during local development without triggering the anti-piracy blur shield, you may temporarily disable the `handleBlur` and `handleVisibilityChange` event listeners inside `Dashboard.jsx`.
