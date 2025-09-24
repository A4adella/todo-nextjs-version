# 📝 TodoMaster – A Modern Todo App with Next.js

TodoMaster is a simple, clean, and modern Todo application built with **Next.js 15 (App Router)**, **React Query**, **TypeScript**, and **ShadCN UI**.  
This project was developed as part of my learning journey, focusing on handling **client/server components**, **data persistence**, and **clean UI design**.  

---

## 🚀 Features

- ✅ Create new todos  
- ✏️ Edit existing todos in a modal dialog  
- ❌ Delete todos with confirmation  
- 🔍 Search and filter todos by status (All, Completed, Incomplete)  
- 📑 Pagination for large todo lists  
- 💾 Local caching using **localStorage** to improve performance  
- 🌐 Data fetching from [JSONPlaceholder API](https://jsonplaceholder.typicode.com/todos) using **React Query**  
- 🎨 Styled with **Tailwind CSS** + **ShadCN UI** for a modern, minimal design  
- 📱 Responsive design for desktop and mobile  

---

## 🛠️ Tech Stack

- [Next.js 15](https://nextjs.org/) – React framework with App Router  
- [TypeScript](https://www.typescriptlang.org/) – Type safety  
- [React Query (TanStack)](https://tanstack.com/query) – API data fetching & caching  
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first styling  
- [ShadCN UI](https://ui.shadcn.com/) – Prebuilt, accessible UI components  
- [Lucide Icons](https://lucide.dev/) – Clean, modern icons  

---

## 🧑‍💻 My Process

1. **Setup** – Started with a Next.js + TypeScript template, added Tailwind CSS, React Query, and ShadCN UI.  
2. **Basic Structure** – Migrated my React version into the Next.js App Router, replacing `App.tsx` with `app/page.tsx`.  
3. **Fetching & Caching** – Used React Query for API fetching and added `localStorage` caching for offline-like behavior.  
4. **UI Styling** – Applied Tailwind + ShadCN for a clean, modern look. Dialog modals and forms were styled for simplicity and usability.  
5. **Features** – Added filtering, searching, editing, and pagination step by step, debugging along the way.  
6. **Refinement** – Cleaned up accessibility, improved responsiveness, and polished the overall UX.  

---

## 📸 Screenshots

| Todo List | Edit Modal | Todo Detail|
|-----------|------------|------------|
| ![Todo List Screenshot](./public/Screenshot%20(137).png) | ![Edit Modal Screenshot](/public/Screenshot%20(139).png) | ![Todo Detail](./public/Screenshot%20(138).png) 




---

## 🏃 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/A4adella/todo-nextjs-version.git
cd todo-nextjs-version
npm install

```

---
## Live Url
- [Todo](https://glad-statement.pipeops.net/)

---

## 🙏 Acknowledgments  

This project would not have been possible without guidance and encouragement.  

- A special thank you to **Mr. Setemi**, my instructor, for making sure I understood the *why* behind each step.  
- To **Mariam**, for the constant support, encouragement, and motivation to keep pushing through.  

---

## 📖 Lessons Learned  

- The difference between **React (CRA/Vite)** and **Next.js App Router** setups  
- Handling **client vs server components** in Next.js  
- Managing **localStorage** safely in a Next.js app  
- Using **React Query** effectively for caching and fetching data  
- Building a clean, accessible UI with **ShadCN UI**  

---

## 📌 Future Improvements  

- ✅ Add authentication (users can have personal todo lists)  
- ✅ Dark mode toggle  
- ✅ Offline persistence with **IndexedDB (Dexie.js)**  

---

## 🧑 Author  

Built with ❤️ by **Adella Emmanuel Idemetuk**  



