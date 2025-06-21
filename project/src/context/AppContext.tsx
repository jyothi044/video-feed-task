import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppState, AppContextType, Video } from '../types';
import { mockVideos, generateMoreVideos } from '../data/mockData';

const initialState: AppState = {
  user: null,
  videos: [],
  loading: false,
  error: null,
  hasMore: true,
  page: 1
};

type AppAction =
  | { type: 'SET_USER'; payload: any }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_VIDEOS'; payload: Video[] }
  | { type: 'ADD_VIDEOS'; payload: Video[] }
  | { type: 'TOGGLE_LIKE'; payload: string }
  | { type: 'TOGGLE_FOLLOW'; payload: string }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'LOGOUT' };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_VIDEOS':
      return { ...state, videos: action.payload };
    case 'ADD_VIDEOS':
      return { ...state, videos: [...state.videos, ...action.payload] };
    case 'TOGGLE_LIKE':
      return {
        ...state,
        videos: state.videos.map(video =>
          video.id === action.payload
            ? {
                ...video,
                isLiked: !video.isLiked,
                likes: video.isLiked ? video.likes - 1 : video.likes + 1
              }
            : video
        )
      };
    case 'TOGGLE_FOLLOW':
      return {
        ...state,
        videos: state.videos.map(video =>
          video.user.id === action.payload
            ? {
                ...video,
                user: { ...video.user, isFollowing: !video.user.isFollowing }
              }
            : video
        )
      };
    case 'SET_HAS_MORE':
      return { ...state, hasMore: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'LOGOUT':
      return { ...initialState };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('tiktok_user');
    if (savedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(savedUser) });
    }
  }, []);

  const login = (username: string) => {
    const user = {
      id: Date.now().toString(),
      username,
      avatar: `https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
      isFollowing: false
    };
    localStorage.setItem('tiktok_user', JSON.stringify(user));
    dispatch({ type: 'SET_USER', payload: user });
  };

  const logout = () => {
    localStorage.removeItem('tiktok_user');
    dispatch({ type: 'LOGOUT' });
  };

  const simulateApiCall = (delay: number = 1000): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.1) { // 90% success rate
          resolve();
        } else {
          reject(new Error('API call failed'));
        }
      }, delay);
    });
  };

  const loadVideos = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      await simulateApiCall(1500);
      dispatch({ type: 'SET_VIDEOS', payload: mockVideos });
      dispatch({ type: 'SET_PAGE', payload: 2 });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load videos. Please try again.' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadMoreVideos = async () => {
    if (!state.hasMore || state.loading) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await simulateApiCall(800);
      const newVideos = generateMoreVideos(state.videos.length + 1, 5);
      dispatch({ type: 'ADD_VIDEOS', payload: newVideos });
      dispatch({ type: 'SET_PAGE', payload: state.page + 1 });
      
      // Simulate end of content after 5 pages
      if (state.page >= 5) {
        dispatch({ type: 'SET_HAS_MORE', payload: false });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load more videos.' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const toggleLike = async (videoId: string) => {
    // Optimistic update
    dispatch({ type: 'TOGGLE_LIKE', payload: videoId });

    try {
      await simulateApiCall(500);
      // Success - keep the optimistic update
    } catch (error) {
      // Revert on failure
      dispatch({ type: 'TOGGLE_LIKE', payload: videoId });
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update like. Please try again.' });
    }
  };

  const toggleFollow = async (userId: string) => {
    // Optimistic update
    dispatch({ type: 'TOGGLE_FOLLOW', payload: userId });

    try {
      await simulateApiCall(500);
      // Success - keep the optimistic update
    } catch (error) {
      // Revert on failure
      dispatch({ type: 'TOGGLE_FOLLOW', payload: userId });
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update follow status. Please try again.' });
    }
  };

  const value: AppContextType = {
    ...state,
    login,
    logout,
    loadVideos,
    toggleLike,
    toggleFollow,
    loadMoreVideos
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};