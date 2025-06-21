import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Video as VideoType } from '../types';
import { useApp } from '../context/AppContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface VideoPlayerProps {
  video: VideoType;
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
  const videoRef = useRef<Video>(null);
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const { toggleLike, toggleFollow } = useApp();

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.playAsync();
      setIsPlaying(true);
    } else if (videoRef.current) {
      videoRef.current.pauseAsync();
      setIsPlaying(false);
    }
  }, [isActive]);

  const handleVideoPress = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        videoRef.current.playAsync();
        setIsPlaying(true);
      }
    }
    setShowControls(true);
    setTimeout(() => setShowControls(false), 2000);
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.setIsMutedAsync(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  const handleLike = () => {
    toggleLike(video.id);
  };

  const handleFollow = () => {
    toggleFollow(video.user.id);
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile' as never);
  };

  return (
    <View style={[styles.container, { width: screenWidth, height: screenHeight }]}>
      {/* Video */}
      <TouchableWithoutFeedback onPress={handleVideoPress}>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: video.videoUrl }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay={isActive}
            isLooping
            isMuted={isMuted}
            onPlaybackStatusUpdate={(status) => {
              if (status.isLoaded) {
                setIsPlaying(status.isPlaying || false);
              }
            }}
          />

          {/* Video Controls Overlay */}
          {showControls && (
            <View style={styles.controlsOverlay}>
              <TouchableOpacity
                onPress={handleVideoPress}
                style={styles.playButton}
              >
                <Icon
                  name={isPlaying ? 'pause' : 'play-arrow'}
                  size={32}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          )}

          {/* Mute/Unmute Button */}
          <TouchableOpacity
            onPress={handleMuteToggle}
            style={styles.muteButton}
          >
            <Icon
              name={isMuted ? 'volume-off' : 'volume-up'}
              size={20}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>

      {/* Bottom Gradient Overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.bottomGradient}
      />

      {/* Left Side Content */}
      <View style={styles.leftContent}>
        {/* Hashtag */}
        <Text style={styles.hashtag}>
          {video.hashtag}
        </Text>

        {/* Creator Info */}
        <TouchableOpacity
          onPress={handleProfilePress}
          style={styles.creatorInfo}
        >
          <Image
            source={{ uri: video.user.avatar }}
            style={styles.avatar}
          />
          <Text style={styles.username}>
            {video.user.username}
          </Text>
          <TouchableOpacity
            onPress={handleFollow}
            style={[
              styles.followButton,
              video.user.isFollowing && styles.followingButton
            ]}
          >
            <Text style={styles.followButtonText}>
              {video.user.isFollowing ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Title and Episode */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{video.title}</Text>
          {video.episode && (
            <Text style={styles.episode}>{video.episode}</Text>
          )}
        </View>

        {/* Description */}
        <Text
          style={styles.description}
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {video.description}
        </Text>
      </View>

      {/* Right Side Actions */}
      <View style={styles.rightActions}>
        {/* Like Button */}
        <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
          <View
            style={[
              styles.actionIcon,
              video.isLiked && styles.likedIcon
            ]}
          >
            <Icon
              name={video.isLiked ? 'favorite' : 'favorite-border'}
              size={24}
              color="white"
            />
          </View>
          <Text style={styles.actionText}>
            {formatCount(video.likes)}
          </Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Icon name="chat-bubble-outline" size={24} color="white" />
          </View>
          <Text style={styles.actionText}>
            {formatCount(video.comments)}
          </Text>
        </TouchableOpacity>

        {/* Share Button */}
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Icon name="share" size={24} color="white" />
          </View>
          <Text style={styles.actionText}>
            {formatCount(video.shares)}
          </Text>
        </TouchableOpacity>

        {/* Earnings/Tip Button */}
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Icon name="attach-money" size={24} color="white" />
          </View>
          <Text style={styles.actionText}>
            ₹{formatCount(video.earnings)}
          </Text>
        </TouchableOpacity>

        {/* More Options */}
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.actionIcon}>
            <Icon name="more-horiz" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  videoContainer: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    borderRadius: 50,
  },
  muteButton: {
    position: 'absolute',
    top: 48,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 256,
  },
  leftContent: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 80,
  },
  hashtag: {
    color: '#a855f7',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 8,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 12,
  },
  username: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginRight: 12,
  },
  followButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  followingButton: {
    backgroundColor: '#6b7280',
    borderWidth: 1,
    borderColor: '#9ca3af',
  },
  followButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 4,
  },
  episode: {
    color: '#d1d5db',
    fontSize: 14,
  },
  description: {
    color: '#e5e7eb',
    fontSize: 14,
    lineHeight: 20,
  },
  rightActions: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    alignItems: 'center',
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 24,
  },
  actionIcon: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 12,
    borderRadius: 25,
  },
  likedIcon: {
    backgroundColor: '#ef4444',
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});

export default VideoPlayer;