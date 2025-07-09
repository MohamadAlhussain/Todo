# Todo App - Frontend

A modern, responsive Todo application built with React and Tailwind CSS.

## Features

- ✨ Modern, clean UI with Tailwind CSS
- 🌙 Dark mode support
- 📱 Responsive design
- ⚡ Smooth animations and transitions
- 🔄 Real-time task management
- ✏️ Edit and delete tasks
- ✅ Mark tasks as complete/incomplete
- 📅 Task creation and update timestamps
- 🎨 Beautiful gradient backgrounds

## Tech Stack

- **React 19** - UI framework
- **Tailwind CSS** - Styling and design system
- **Axios** - HTTP client for API communication
- **Vite** - Build tool and development server

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:5173`)

## Backend Requirements

Make sure your backend server is running on `http://localhost:5000` with the following endpoints:

- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Design Features

- **Modern Color Palette**: Uses a carefully selected color scheme with primary blues, secondary grays, success greens, and error reds
- **Smooth Animations**: Fade-in, slide-up, and bounce-in animations for enhanced user experience
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Accessibility**: Proper focus states, keyboard navigation, and screen reader support
- **Dark Mode**: Automatic dark mode support with system preference detection

## Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # Application entry point
└── index.css        # Tailwind CSS and custom styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
