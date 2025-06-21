import React, { useEffect, useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import VideoPlayer from './VideoPlayer';
import LoadingScreen from './LoadingScreen';
import BottomNavigation from './BottomNavigation';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';

const VideoFeed: React.FC = () => {
  const { videos, loading, error, hasMore, loadVideos, loadMoreVideos } = useApp();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || videos.length === 0) return;

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const options = {
      root: containerRef.current,
      rootMargin: '0px',
      threshold: 0.5
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoIndex = parseInt(entry.target.getAttribute('data-index') || '0');
          setCurrentVideoIndex(videoIndex);

          // Load more videos when reaching near the end
          if (videoIndex >= videos.length - 2 && hasMore && !loading) {
            loadMoreVideos();
          }
        }
      });
    }, options);

    // Observe all video elements
    const videoElements = containerRef.current.querySelectorAll('[data-index]');
    videoElements.forEach((element) => {
      if (observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [videos, hasMore, loading, loadMoreVideos]);

  if (loading && videos.length === 0) {
    return <LoadingScreen />;
  }

  if (error && videos.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center">
          <div className="mb-4">
            {isOnline ? (
              <RefreshCw className="w-16 h-16 text-red-500 mx-auto" />
            ) : (
              <WifiOff className="w-16 h-16 text-red-500 mx-auto" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isOnline ? 'Something went wrong' : 'No internet connection'}
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={loadVideos}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Connection Status */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white px-4 py-2 text-center text-sm font-medium z-50">
          <div className="flex items-center justify-center space-x-2">
            <WifiOff className="w-4 h-4" />
            <span>No internet connection</span>
          </div>
        </div>
      )}

      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {videos.map((video, index) => (
          <div key={video.id} data-index={index}>
            <VideoPlayer
              video={video}
              isActive={index === currentVideoIndex}
            />
          </div>
        ))}

        {/* Loading More Indicator */}
        {loading && videos.length > 0 && (
          <div className="h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
              <p className="text-white">Loading more videos...</p>
            </div>
          </div>
        )}

        {/* End of Content */}
        {!hasMore && videos.length > 0 && (
          <div className="h-screen bg-black flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-white mb-2">You're all caught up!</h3>
              <p className="text-gray-400">Check back later for new content</p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Network Status Indicator */}
      <div className="fixed top-4 right-4 z-40">
        <div className={`p-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}>
          {isOnline ? (
            <Wifi className="w-4 h-4 text-white" />
          ) : (
            <WifiOff className="w-4 h-4 text-white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoFeed;