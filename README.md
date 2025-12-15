# TaskFlow - Premium Kanban Board

A highly polished, responsive, and feature-rich task management application inspired by Trello. Built with **React**, **Vite**, and **Tailwind CSS**.

## 🚀 Features

- **Multi-Board System**: Create and manage multiple workspaces (boards) for different projects.
- **Drag & Drop**: Smooth, intuitive dragging for both **Tasks** and **Lists** (Columns) using `@hello-pangea/dnd`.
- **Dynamic Workflows**: Add customized lists to define your own process (e.g., Backlog, Doing, Review, Done).
- **Rich Task Management**: Create tasks with titles and detailed descriptions.
- **Ultra-Premium UI/UX**:
  - **Glassmorphism**: Modern frosted glass aesthetics with animated backgrounds.
  - **Responsive Design**: Fully optimized for Mobile, Tablet, and Desktop.
  - **Mobile Optimized**: Custom sidebar drawer and touch-friendly interactions.
  - **Micro-Interactions**: Smooth hover effects, transitions, and "Glow" effects.
- **Local Persistence**: All boards, lists, and tasks are automatically saved to `localStorage`.

## 🛠 Tech Stack

- **React 18**: Core framework using Functional Components and Hooks.
- **Vite**: Next-generation frontend tooling.
- **Tailwind CSS**: Utility-first CSS framework for complex, responsive designs.
- **@hello-pangea/dnd**: For accessible and robust drag-and-drop functionality.
- **Lucide React**: For consistent, pixel-perfect icons.

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository_url>
    cd taskflow-board
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    # Ensure you are on a recent Node.js version
    ```

3.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view the app.

4.  **Build for Production**:
    ```bash
    npm run build
    ```
    The production-ready files will be generated in the `dist` folder.

## 📂 Project Structure

```
src/
├── components/
│   ├── Column.jsx       # List container (Droppable) with separate visual/drag layers
│   ├── TaskCard.jsx     # Individual Task (Draggable) with mobile-friendly actions
│   └── Modal.jsx        # Reusable accessible modal with backdrop animations
├── utils/
│   └── initialData.js   # Multi-board data structure and initialization
├── App.jsx              # Main Controller: State, Drag Logic, Routing (Boards)
├── index.css            # Global Tailwind imports + Custom Glass classes
└── main.jsx             # React Entry point
```

## 📝 Usage Guide

- **Create Workspace**: Use the sidebar to create new boards for separate projects.
- **Manage Lists**: Click "Add List" to create columns like "To Do" or "Done".
- **Tasks**: Add tasks to any list. Click edit/delete icons (always visible on mobile, on-hover on desktop) to manage them.
- **Navigating**: On mobile, use the burger menu to access the sidebar drawer to switch boards.

## 🎨 Deployment

This project is ready for **Vercel** or **Netlify**:
1.  Push to GitHub.
2.  Import project in Vercel.
3.  Build Command: `npm run build`
4.  Output Directory: `dist`
# task-flow
