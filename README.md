# FeedFlow - Reels-Style Video Platform

A modern, full-stack video sharing platform with both web and mobile applications. Features vertical video feeds, user authentication, social interactions, and a beautiful UI inspired by TikTok.

## 🚀 Project Overview

This project consists of two main applications:
- **Web App**: React + TypeScript + Vite web application
- **Mobile App**: React Native + Expo cross-platform mobile application

Both apps share similar functionality including video feeds, user authentication, likes, follows, and social features.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

### For Web Development:
- **Node.js** (v16.0.0 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

### For Mobile Development:
- **Node.js** (v16.0.0 or higher)
- **Expo CLI** - Install globally: `npm install -g @expo/cli`
- **Mobile Device** with Expo Go app installed:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Optional (for advanced mobile development):
- **Android Studio** (for Android emulator)
- **Xcode** (for iOS simulator - macOS only)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd feedflow-project
```

### 2. Web Application Setup

#### Navigate to the root directory:
```bash
# You should be in the root directory of the project
pwd  # Should show: /path/to/feedflow-project
```

#### Install dependencies:
```bash
npm install
```

#### Start the development server:
```bash
npm run dev
```

#### Access the web application:
- Open your browser and go to: `http://localhost:5173`
- The web app should load with a login screen
- Enter any username to access the video feed

### 3. Mobile Application Setup

#### Navigate to the mobile directory:
```bash
cd mobile
```

#### Install dependencies:
```bash
npm install
```

#### Start the Expo development server:
```bash
npm start
```

#### Access the mobile application:

**Option 1: Using Expo Go App (Recommended for beginners)**
1. Install Expo Go on your mobile device
2. After running `npm start`, a QR code will appear in your terminal
3. Scan the QR code with:
   - **iOS**: Use the Camera app to scan the QR code
   - **Android**: Use the Expo Go app to scan the QR code
4. The app will load on your device

**Option 2: Using Simulators/Emulators**
```bash
# For iOS Simulator (macOS only)
npm run ios

# For Android Emulator
npm run android

# For web preview (testing only)
npm run web
```

## 📱 Mobile App Features

- **Vertical Video Feed**: TikTok-style full-screen video experience
- **Auto-play Videos**: Videos play automatically when in view
- **Touch Controls**: Tap to play/pause, swipe to navigate
- **Social Features**: Like, follow, share functionality
- **User Authentication**: Simple username-based login
- **Infinite Scroll**: Load more videos as you scroll
- **Optimistic Updates**: Instant UI feedback for better UX
- **Cross-platform**: Works on both iOS and Android

## 🌐 Web App Features

- **Responsive Design**: Works on desktop, tablet, and mobile browsers
- **Video Player**: Custom video player with controls
- **Social Interactions**: Like, follow, comment, share
- **User Management**: Login/logout functionality
- **Infinite Scroll**: Seamless content loading
- **Error Handling**: Graceful error states and recovery
- **Network Status**: Online/offline indicators

## 🏗️ Project Structure

```
feedflow-project/
├── README.md                 # This file
├── package.json             # Web app dependencies
├── src/                     # Web app source code
│   ├── components/          # Reusable React components
│   ├── context/            # React Context for state management
│   ├── data/               # Mock data and API simulation
│   ├── types/              # TypeScript type definitions
│   └── App.tsx             # Main web app component
├── mobile/                  # Mobile app directory
│   ├── package.json        # Mobile app dependencies
│   ├── App.tsx             # Main mobile app component
│   ├── src/                # Mobile app source code
│   │   ├── components/     # React Native components
│   │   ├── screens/        # Screen components
│   │   ├── context/        # Context providers
│   │   ├── data/           # Mock data
│   │   └── types/          # TypeScript types
│   ├── assets/             # Images and static assets
│   └── app.json            # Expo configuration
└── public/                 # Web app static assets
```

## 🔧 Development Commands

### Web Application Commands:
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

### Mobile Application Commands:
```bash
# Navigate to mobile directory first
cd mobile

# Start Expo development server
npm start

# Start with specific platform
npm run ios      # iOS simulator
npm run android  # Android emulator
npm run web      # Web preview

# Clear Expo cache (if you encounter issues)
npx expo start --clear
```

## 🐛 Troubleshooting

### Common Web App Issues:

**1. Port already in use:**
```bash
# Kill process using port 5173
npx kill-port 5173
# Or use a different port
npm run dev -- --port 3000
```

**2. Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Common Mobile App Issues:

**1. Expo CLI not found:**
```bash
# Install Expo CLI globally
npm install -g @expo/cli
```

**2. QR code not working:**
- Ensure your mobile device and computer are on the same WiFi network
- Try using the tunnel connection: `npx expo start --tunnel`
- Check if your firewall is blocking the connection

**3. Metro bundler issues:**
```bash
# Clear Metro cache
npx expo start --clear

# Reset Metro cache completely
npx expo start --reset-cache
```

**4. NativeWind styling issues:**
```bash
# Ensure all dependencies are installed
npm install
# Restart the development server
npx expo start --clear
```

**5. Video playback issues:**
- Videos require internet connection to load
- Some videos may not work on certain devices due to codec support
- Try using different video URLs if needed

### Network Issues:

**1. Videos not loading:**
- Check your internet connection
- Ensure the video URLs are accessible
- Try refreshing the app

**2. API simulation failures:**
- The app uses mock API calls that randomly fail 10% of the time
- Simply retry the action or refresh the app

## 🎯 Usage Instructions

### Web Application:
1. Open `http://localhost:5173` in your browser
2. Enter any username on the login screen
3. Browse videos using scroll or arrow keys
4. Click videos to play/pause
5. Use the action buttons to like, comment, share
6. Click user avatars to follow/unfollow

### Mobile Application:
1. Scan the QR code with Expo Go app
2. Enter a username to login
3. Swipe up/down to navigate between videos
4. Tap videos to play/pause
5. Use the side action buttons for social interactions
6. Pull down to refresh the feed

## 🔄 Data & State Management

- **Mock Data**: Both apps use simulated data with realistic content
- **Local Storage**: User authentication persists between sessions
- **Optimistic Updates**: UI updates immediately for better user experience
- **Error Recovery**: Failed actions can be retried
- **Infinite Scroll**: More content loads automatically

## 🎨 Customization

### Adding New Videos:
Edit `src/data/mockData.ts` (web) or `mobile/src/data/mockData.ts` (mobile) to add more video content.

### Styling:
- **Web**: Uses Tailwind CSS classes
- **Mobile**: Uses React Native StyleSheet

### Features:
Both apps are designed to be easily extensible with new features like:
- Real API integration
- Video upload functionality
- Advanced social features
- Push notifications
- Video caching

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both web and mobile
5. Submit a pull request

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify your network connection
4. Try clearing caches and reinstalling dependencies

---

**Happy coding! 🚀**
