export interface User {
  id: string;
  username: string;
  avatar: string;
  isFollowing: boolean;
}

export interface Video {
  id: string;
  videoUrl: string;
  title: string;
  description: string;
  hashtag: string;
  episode?: string;
  user: User;
  likes: number;
  comments: number;
  shares: number;
  earnings: number;
  isPaid: boolean;
  isLiked: boolean;
}

export interface AppState {
  user: User | null;
  videos: Video[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
}

export interface AppContextType extends AppState {
  login: (username: string) => void;
  logout: () => void;
  loadVideos: () => Promise<void>;
  toggleLike: (videoId: string) => void;
  toggleFollow: (userId: string) => void;
  loadMoreVideos: () => Promise<void>;
}