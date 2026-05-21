# JJ Multi Solutions (Pty) Ltd Website

A professional, tech-focused website built with React, Tailwind CSS, and Firebase.

## Technology Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4
- **Backend/DB**: Firebase Firestore
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui

## Project Structure
- `/src/pages`: Website pages.
- `/src/components`: Reusable UI elements and Layout (Navbar/Footer).
- `/src/lib/firebase.ts`: Firebase configuration and error handling.
- `/firestore.rules`: Security rules for database protection.
- `/firebase-blueprint.json`: Data structure documentation.

## Deployment Instructions

### 1. GitHub
- Initialize a git repo: `git init`
- Commit all files.
- Push to a new GitHub repository.

### 2. Firebase
- The app is already configured for Firebase in this environment.
- For production, ensure `firebase-applet-config.json` contains your production credentials.
- Deploy rules: `firebase deploy --only firestore:rules`.

### 3. Netlify
- Connect your GitHub repository to Netlify.
- Build command: `npm run build`
- Publish directory: `dist`
- Add environment variables (if any) in the Netlify dashboard.
- **Note**: Ensure you add a `_redirects` file in the `public` folder with `/* /index.html 200` for SPA routing.

### 4. Cloudflare DNS
- Add your domain to Cloudflare.
- Update your registrar's nameservers to Cloudflare's.
- Create a CNAME record pointing your domain to your Netlify URL (e.g., `jj-multi-solutions.netlify.app`).
- Enable Proxy (Orange cloud) for DDOS protection and CDN benefits.

## Security
- This project uses **Attribute-Based Access Control (ABAC)** in Firestore security rules.
- Only the administrator with email `jjmultisolutions18@gmail.com` has full read/write access.
- Public access is limited to reading Blogs, Events, and Projects.
- All form submissions are validated server-side by Firestore rules.

## Maintenance
- **Update Blogs/Projects**: Future enhancement would involve adding an admin dashboard. Currently managed via Firestore Console.
- **Enquiries**: View results in the `enquiries` and `quoteRequests` collections in the Firebase console.
