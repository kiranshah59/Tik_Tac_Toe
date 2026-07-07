// ============================================================
// App.tsx — Root component with routing and layout
// ============================================================

import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { ToastContainer } from './components/ui/Toast';
import { HomePage } from './pages/HomePage';

// Lazy-loaded pages for performance
const GameSettingsPage = lazy(() =>
  import('./pages/GameSettingsPage').then((m) => ({ default: m.GameSettingsPage }))
);
const GamePage = lazy(() =>
  import('./pages/GamePage').then((m) => ({ default: m.GamePage }))
);
const HistoryPage = lazy(() =>
  import('./pages/HistoryPage').then((m) => ({ default: m.HistoryPage }))
);
const StatsPage = lazy(() =>
  import('./pages/StatsPage').then((m) => ({ default: m.StatsPage }))
);
const AchievementsPage = lazy(() =>
  import('./pages/AchievementsPage').then((m) => ({ default: m.AchievementsPage }))
);

/** Loading fallback with animated spinner */
const PageLoader: React.FC = () => (
  <div className="flex-1 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      <div className="w-12 h-12 rounded-xl gradient-bg animate-spin-slow opacity-80" />
      <span className="text-sm text-secondary">Loading...</span>
    </div>
  </div>
);

import { Footer } from './components/layout/Footer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Toast notifications */}
      <ToastContainer />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center w-full relative overflow-x-hidden min-h-screen pt-14">
        {/* Subtle Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

        {/* Global decorative background element - very subtle glow at the top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[30vh] bg-primary/10 blur-[120px] pointer-events-none -z-10 rounded-full" />
        
        {/* Routes */}
        <Suspense fallback={<PageLoader />}>
          <div className="flex-1 w-full flex flex-col items-center justify-start">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/settings" element={<GameSettingsPage />} />
              <Route path="/play" element={<GamePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/stats" element={<StatsPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
            </Routes>
          </div>
        </Suspense>

        {/* Footer */}
        <Footer />
      </main>
    </BrowserRouter>
  );
};

export default App;
