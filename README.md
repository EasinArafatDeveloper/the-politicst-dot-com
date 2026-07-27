# The Politicst - Modern News Portal

A modern, fast, and fully responsive news portal built with **Next.js (App Router)** and **MongoDB**. It features bilingual support (Bangla & English), a dedicated Admin Panel, and dynamic news categorization.

## ✨ Features

- **🌐 Bilingual Support**: Seamlessly switch between Bangla (BN) and English (EN) using `next-intl`.
- **📰 Categorized News Sections**: National, International, Politics, Economy, Sports, Entertainment, Lifestyle, Video, and Photo galleries.
- **⚡ Fast & Modern**: Built on the latest Next.js 14 App Router for Server-Side Rendering (SSR) and optimal SEO.
- **🛠️ Admin Panel**: Secure, custom admin dashboard to create, edit, delete, and manage articles and categories.
- **🎨 Custom UI/UX**: Premium navy blue theme with fully responsive mobile and desktop layouts using vanilla CSS modules.
- **🔍 Search & Filter**: Real-time article searching and filtering in the admin panel.
- **📱 Responsive Design**: Works beautifully across all devices with custom interactive components like carousels and sticky headers.
- **🔔 Push Notifications**: Built-in support for prompt-based push notifications.

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (React)
- **Database**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Styling**: Pure CSS (CSS Modules)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Database (Local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/EasinArafatDeveloper/the-politicst-dot-com.git
   cd the-politicst-dot-com
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your MongoDB URI:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/src/app/[locale]` - Contains the main Next.js App Router pages for internationalization.
- `/src/components` - Reusable UI components (Header, Footer, NewsGrids, Admin, etc).
- `/src/models` - Mongoose database schemas.
- `/src/app/api` - Next.js backend API routes for CRUD operations.

## 👨‍💻 Admin Panel

Access the admin panel at `/admin` to manage articles. The admin dashboard allows for bilingual content entry, custom image uploads, slug customization, and assigning categories/sections.
