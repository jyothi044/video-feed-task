import React, { useRef, useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, DollarSign, MoreHorizontal, Play, Pause, VolumeX, Volume2 } from 'lucide-react';
import { Video } from '../types';
import { useApp } from '../context/AppContext';

interface VideoPlayerProps {
  video: Video;
  isActive: boolean;
}

const formatCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ video, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const { toggleLike, toggleFollow } = useApp();

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isActive) {
      videoElement.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Auto-play failed, which is normal in many browsers
        setIsPlaying(false);
      });
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
      setIsPlaying(false);
    } else {
      videoElement.play();
      setIsPlaying(true);
    }
  };

  const handleMuteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const videoElement = videoRef.current;
    if (!videoElement) return;

    videoElement.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleLike = () => {
    toggleLike(video.id);
  };

  const handleFollow = () => {
    toggleFollow(video.user.id);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden snap-start">
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-cover cursor-pointer"
        muted={isMuted}
        loop
        playsInline
        onClick={handleVideoClick}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onTouchStart={() => setShowControls(true)}
        onLoadStart={() => console.log('Video loading started')}
        onError={() => console.error('Video failed to load')}
      />

      {/* Video Controls Overlay */}
      {showControls && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-200">
          <button
            onClick={handleVideoClick}
            className="bg-black/50 text-white p-4 rounded-full backdrop-blur-sm"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </button>
        </div>
      )}

      {/* Mute/Unmute Button */}
      <button
        onClick={handleMuteToggle}
        className="absolute top-6 right-6 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm z-10"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>

      {/* Left Side Content */}
      <div className="absolute bottom-6 left-6 right-24 text-white z-10">
        <div className="space-y-3">
          {/* Hashtag */}
          <div className="text-purple-400 font-semibold text-lg">
            {video.hashtag}
          </div>

          {/* Creator Info */}
          <div className="flex items-center space-x-3">
            <img
              src={video.user.avatar}
              alt={video.user.username}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <span className="font-semibold text-lg">{video.user.username}</span>
            <button
              onClick={handleFollow}
              className={`px-4 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
                video.user.isFollowing
                  ? 'bg-gray-600 text-white border border-gray-500'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              {video.user.isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Title and Episode */}
          <div>
            <h3 className="font-bold text-xl mb-1">{video.title}</h3>
            {video.episode && (
              <span className="text-gray-300 text-sm">{video.episode}</span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-200 text-sm leading-relaxed line-clamp-3 max-w-xs">
            {video.description}
          </p>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="absolute bottom-6 right-6 flex flex-col space-y-6 items-center z-10">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="flex flex-col items-center space-y-1 group"
        >
          <div className={`p-3 rounded-full transition-all duration-200 ${
            video.isLiked 
              ? 'bg-red-500 text-white' 
              : 'bg-black/50 text-white hover:bg-red-500 backdrop-blur-sm'
          }`}>
            <Heart 
              className={`w-6 h-6 ${video.isLiked ? 'fill-current' : ''}`} 
            />
          </div>
          <span className="text-white text-xs font-medium">
            {formatCount(video.likes)}
          </span>
        </button>

        {/* Comment Button */}
        <button className="flex flex-col items-center space-y-1 group">
          <div className="p-3 bg-black/50 rounded-full text-white hover:bg-blue-500 transition-all duration-200 backdrop-blur-sm">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-white text-xs font-medium">
            {formatCount(video.comments)}
          </span>
        </button>

        {/* Share Button */}
        <button className="flex flex-col items-center space-y-1 group">
          <div className="p-3 bg-black/50 rounded-full text-white hover:bg-green-500 transition-all duration-200 backdrop-blur-sm">
            <Share2 className="w-6 h-6" />
          </div>
          <span className="text-white text-xs font-medium">
            {formatCount(video.shares)}
          </span>
        </button>

        {/* Earnings/Tip Button */}
        <button className="flex flex-col items-center space-y-1 group">
          <div className="p-3 bg-black/50 rounded-full text-white hover:bg-yellow-500 transition-all duration-200 backdrop-blur-sm">
            <DollarSign className="w-6 h-6" />
          </div>
          <span className="text-white text-xs font-medium">
            ₹{formatCount(video.earnings)}
          </span>
        </button>

        {/* More Options */}
        <button className="p-3 bg-black/50 rounded-full text-white hover:bg-gray-600 transition-all duration-200 backdrop-blur-sm">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;