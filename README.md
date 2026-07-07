# Tic-Tac-Toe Portfolio Project

A modern, responsive, and visually appealing Tic-Tac-Toe web application built with React, TypeScript, Tailwind CSS v4, and Vite. Designed as a portfolio piece showcasing clean architecture, state management, and algorithmic thinking.

## 🌟 Features

- **Three Game Modes**: Play against a friend locally or challenge the AI.
- **Smart AI Opponents**:
  - *Easy*: Makes random moves.
  - *Medium*: Basic strategy (blocks wins, takes center/corners).
  - *Hard*: Unbeatable AI powered by the **Minimax algorithm** with alpha-beta pruning.
- **Customizable Boards**: Choose from classic 3×3, 4×4, or 5×5 grids.
- **Modern UI/UX**:
  - Glassmorphism design with responsive gradients.
  - Smooth micro-animations using Tailwind CSS.
  - SVG-drawn X and O symbols.
- **Advanced State Management**: Built with Zustand for robust, performant state handling.
- **Match History**: Saves all played games to LocalStorage with JSON export capability.
- **Statistics Dashboard**: Visualizes wins, losses, draws, and win streaks using Recharts.
- **Achievements System**: Unlock badges as you hit milestones (e.g., winning streaks, beating the Hard AI).
- **Sound Effects**: Synthesized sounds using the Web Audio API (no external assets required).
- **Accessibility**: Full keyboard navigation support and ARIA labels.
- **Dark/Light Theme**: Built-in theme toggling that persists across sessions.

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Routing**: React Router v7
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: canvas-confetti, Tailwind custom keyframes

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable React components
│   ├── game/        # Game-specific components (Board, Cell, Timer)
│   ├── layout/      # Layout components (Navbar)
│   └── ui/          # Generic UI components (Button, Card, Modal, Toast)
├── hooks/           # Custom React hooks (useTimer, useKeyboardNavigation)
├── pages/           # Route components (Home, Game, History, Stats, etc.)
├── services/        # Logic services (AI Service, Sound Service, Storage Service)
├── stores/          # Zustand state stores
├── styles/          # Global styles and Tailwind configuration
├── types/           # TypeScript interfaces and types
└── utils/           # Helper functions (game logic, constants)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe-portfolio.git
   ```

2. Navigate to the project directory:
   ```bash
   cd tic-tac-toe-portfolio
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and visit `http://localhost:5173`.

## 🎮 How to Play

1. Click **Play Now** from the home screen.
2. Select your game mode (Player vs Player or Player vs AI).
3. Configure settings like board size, difficulty (if playing AI), and timer.
4. Click **Start Game**.
5. Use your mouse or keyboard (Arrow keys + Enter/Space) to place your symbol.
6. Try to get your symbols in a row (horizontally, vertically, or diagonally) before your opponent!

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
