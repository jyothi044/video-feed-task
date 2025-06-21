# FeedFlow Mobile - React Native App

A TikTok-style vertical video feed mobile application built with React Native and Expo.

## Features

- 📱 Vertical full-screen video feed
- 🎥 Auto-play videos with tap controls
- 👤 User authentication with AsyncStorage
- ❤️ Like and follow functionality with optimistic updates
- 🔄 Infinite scroll with pagination
- 📊 Video stats (likes, comments, shares, earnings)
- 🎨 Beautiful UI with NativeWind (Tailwind CSS)
- 📱 Cross-platform (iOS & Android)

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **NativeWind** for styling (Tailwind CSS for React Native)
- **Expo AV** for video playback
- **React Navigation** for navigation
- **AsyncStorage** for local data persistence
- **Context API** for state management

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your preferred platform:
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web (for testing)
   npm run web
   ```

## Project Structure

```
mobile/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── VideoPlayer.tsx  # Main video player component
│   │   ├── BottomNavigation.tsx
│   │   └── LoadingScreen.tsx
│   ├── screens/            # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── VideoFeedScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── context/            # Context providers
│   │   └── AppContext.tsx
│   ├── data/              # Mock data
│   │   └── mockData.ts
│   └── types/             # TypeScript type definitions
│       └── index.ts
├── App.tsx                # Main app component
├── package.json
└── README.md
```

## Key Features

### Video Player
- Full-screen vertical video playback
- Auto-play when video comes into view
- Tap to play/pause
- Mute/unmute controls
- Smooth transitions between videos

### User Interface
- TikTok-style layout with overlays
- Creator information with follow buttons
- Video stats (likes, comments, shares, earnings)
- Bottom navigation bar
- Responsive design for different screen sizes

### State Management
- Context API for global state
- Optimistic updates for better UX
- Error handling with user feedback
- Loading states and animations

### Data Handling
- Mock API simulation with realistic delays
- Infinite scroll with pagination
- Local storage for user authentication
- Error recovery mechanisms

## Customization

### Adding New Videos
Edit `src/data/mockData.ts` to add more video content or modify existing videos.

### Styling
The app uses NativeWind (Tailwind CSS for React Native). Modify styles by updating the className props on components.

### Navigation
Add new screens by updating the navigation stack in `App.tsx` and creating new screen components.

## Performance Optimizations

- Video lazy loading
- Optimized FlatList with `getItemLayout`
- Memoized components where appropriate
- Efficient state updates with useReducer

## Known Limitations

- Videos are loaded from external URLs (requires internet)
- Mock data simulation (not connected to real API)
- Limited video formats supported
- No video caching (videos re-download on scroll)

## Future Enhancements

- Real API integration
- Video caching for offline viewing
- Push notifications
- Social features (comments, direct messages)
- Video upload functionality
- Advanced video effects and filters

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
5. Submit a pull request

## License

This project is for educational purposes and demonstration of React Native capabilities.