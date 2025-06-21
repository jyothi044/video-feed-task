import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  FlatList,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useApp } from '../context/AppContext';
import VideoPlayer from '../components/VideoPlayer';
import BottomNavigation from '../components/BottomNavigation';
import LoadingScreen from '../components/LoadingScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height: screenHeight } = Dimensions.get('window');

const VideoFeedScreen = () => {
  const { videos, loading, error, hasMore, loadVideos, loadMoreVideos } = useApp();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setCurrentVideoIndex(index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      loadMoreVideos();
    }
  };

  const renderVideo = ({ item, index }: { item: any; index: number }) => (
    <VideoPlayer
      video={item}
      isActive={index === currentVideoIndex}
    />
  );

  const renderFooter = () => {
    if (!loading || videos.length === 0) return null;
    
    return (
      <View style={[styles.loadingContainer, { height: screenHeight }]}>
        <ActivityIndicator size="large" color="#8b5cf6" />
        <Text style={styles.loadingText}>Loading more videos...</Text>
      </View>
    );
  };

  const renderEndMessage = () => {
    if (hasMore || videos.length === 0) return null;
    
    return (
      <View style={[styles.endContainer, { height: screenHeight }]}>
        <Text style={styles.endEmoji}>🎉</Text>
        <Text style={styles.endTitle}>You're all caught up!</Text>
        <Text style={styles.endSubtitle}>Check back later for new content</Text>
      </View>
    );
  };

  if (loading && videos.length === 0) {
    return <LoadingScreen />;
  }

  if (error && videos.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Icon name="error-outline" size={64} color="#ef4444" />
        <Text style={styles.errorTitle}>
          Something went wrong
        </Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity
          onPress={loadVideos}
          style={styles.retryButton}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={[...videos, ...(hasMore ? [] : [{ id: 'end' }])]}
        renderItem={({ item, index }) => {
          if (item.id === 'end') {
            return renderEndMessage();
          }
          return renderVideo({ item, index });
        }}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        getItemLayout={(data, index) => ({
          length: screenHeight,
          offset: screenHeight * index,
          index,
        })}
      />
      <BottomNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 16,
  },
  endContainer: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  endTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  endSubtitle: {
    color: '#9ca3af',
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    color: '#9ca3af',
    marginBottom: 24,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#8b5cf6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default VideoFeedScreen;