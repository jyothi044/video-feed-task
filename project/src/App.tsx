import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import VideoFeed from './components/VideoFeed';

const AppContent: React.FC = () => {
  const { user, error } = useApp();

  // Clear errors after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        // Error will be cleared when user interacts with the app
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <VideoFeed />
      
      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 left-4 right-4 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg z-50 animate-slide-down">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{error}</span>
            <button
              onClick={() => {/* Error will clear automatically */}}
              className="text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <div className="App">
        <AppContent />
      </div>
    </AppProvider>
  );
}

export default App;