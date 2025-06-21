import { Video } from '../types';

export const mockVideos: Video[] = [
  {
    id: '1',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    title: 'The Future of Startups in India',
    description: 'Amazing insights into the Indian startup ecosystem and how young entrepreneurs are changing the game with innovative solutions.',
    hashtag: '#StartupIndia',
    episode: 'Episode 1',
    user: {
      id: 'u1',
      username: 'Gabar Singh',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isFollowing: false
    },
    likes: 200000,
    comments: 1300,
    shares: 456,
    earnings: 2100,
    isPaid: true,
    isLiked: false
  },
  {
    id: '2',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    title: 'Tech Innovation Summit 2024',
    description: 'Highlights from the biggest tech event of the year featuring breakthrough innovations in AI, blockchain, and sustainable technology.',
    hashtag: '#TechSummit2024',
    episode: 'Episode 2',
    user: {
      id: 'u2',
      username: 'Priya Sharma',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isFollowing: true
    },
    likes: 150000,
    comments: 890,
    shares: 234,
    earnings: 1800,
    isPaid: true,
    isLiked: true
  },
  {
    id: '3',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    title: 'Digital Marketing Secrets',
    description: 'Learn the insider secrets of successful digital marketing campaigns that generated millions in revenue for small businesses.',
    hashtag: '#DigitalMarketing',
    episode: 'Episode 3',
    user: {
      id: 'u3',
      username: 'Rajesh Kumar',
      avatar: 'https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isFollowing: false
    },
    likes: 89000,
    comments: 567,
    shares: 123,
    earnings: 950,
    isPaid: false,
    isLiked: false
  },
  {
    id: '4',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    title: 'Sustainable Living Tips',
    description: 'Simple yet effective ways to live sustainably and reduce your carbon footprint while saving money in the process.',
    hashtag: '#SustainableLiving',
    episode: 'Episode 4',
    user: {
      id: 'u4',
      username: 'Anita Desai',
      avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isFollowing: false
    },
    likes: 67000,
    comments: 445,
    shares: 89,
    earnings: 780,
    isPaid: true,
    isLiked: false
  },
  {
    id: '5',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    title: 'Cooking with Passion',
    description: 'Traditional Indian recipes with a modern twist that will make your taste buds dance with joy and your family ask for more.',
    hashtag: '#CookingWithLove',
    episode: 'Episode 5',
    user: {
      id: 'u5',
      username: 'Chef Vikram',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      isFollowing: true
    },
    likes: 125000,
    comments: 678,
    shares: 345,
    earnings: 1200,
    isPaid: true,
    isLiked: true
  }
];

export const generateMoreVideos = (startId: number, count: number = 5): Video[] => {
  const titles = [
    'Investment Strategies for 2024',
    'Fitness Journey Transformation',
    'Travel Adventures in Kerala',
    'Photography Masterclass',
    'Music Production Basics',
    'Interior Design Ideas',
    'Cryptocurrency Explained',
    'Mindfulness and Meditation',
    'Small Business Success',
    'Fashion Trends Update'
  ];

  const hashtags = [
    '#Investment2024', '#FitnessJourney', '#TravelKerala', '#Photography',
    '#MusicProduction', '#InteriorDesign', '#CryptoExplained', '#Mindfulness',
    '#SmallBusiness', '#FashionTrends'
  ];

  const usernames = [
    'Investment Guru', 'Fitness Coach', 'Travel Blogger', 'Photo Artist',
    'Music Maker', 'Design Expert', 'Crypto Teacher', 'Mindful Living',
    'Business Mentor', 'Style Icon'
  ];

  const videoUrls = [
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  ];

  return Array.from({ length: count }, (_, index) => {
    const id = startId + index;
    const randomIndex = index % titles.length;
    
    return {
      id: id.toString(),
      videoUrl: videoUrls[index % videoUrls.length],
      title: titles[randomIndex],
      description: `Learn amazing insights about ${titles[randomIndex].toLowerCase()} that will change your perspective and help you achieve your goals.`,
      hashtag: hashtags[randomIndex],
      episode: `Episode ${id}`,
      user: {
        id: `u${id}`,
        username: usernames[randomIndex],
        avatar: `https://images.pexels.com/photos/${1000000 + id * 1000}/pexels-photo-${1000000 + id * 1000}.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2`,
        isFollowing: Math.random() > 0.7
      },
      likes: Math.floor(Math.random() * 200000) + 10000,
      comments: Math.floor(Math.random() * 1000) + 100,
      shares: Math.floor(Math.random() * 500) + 50,
      earnings: Math.floor(Math.random() * 2000) + 500,
      isPaid: Math.random() > 0.3,
      isLiked: Math.random() > 0.8
    };
  });
};