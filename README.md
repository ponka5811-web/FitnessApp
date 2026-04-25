# 💪 FitTrack — React Native Fitness Tracker

A modern, dark-themed fitness tracking app built with **Expo** and **React Navigation**.

---

## ✨ Features

| Feature | Details |
|---|---|
| Exercise Library | Preloaded with 6 exercises, expandable by user |
| Progress Tracking | Mark exercises complete / incomplete |
| Add Exercises | Form with validation, category picker, optional image URL |
| Completed Screen | View all done exercises + a motivational quote |
| Stats Bar | Live total / completed / % progress on Home screen |
| Modern Dark UI | Neon-lime accent (`#E8FF47`), cards with shadows, SafeAreaView |

---

## 📁 Project Structure

```
FitnessTracker/
├── App.js                        # Root: Navigation + Provider wiring
├── package.json
├── babel.config.js
│
├── context/
│   └── ExerciseContext.js        # Context API — global exercises state
│
├── navigation/
│   └── AppNavigator.js           # Stack Navigator (4 screens)
│
├── screens/
│   ├── HomeScreen.js             # FlatList of all exercises + FAB
│   ├── ExerciseDetailScreen.js   # Full detail + complete toggle
│   ├── AddExerciseScreen.js      # Form to add a new exercise
│   └── CompletedScreen.js        # Completed list + motivational quote
│
└── components/
    ├── ExerciseCard.js           # Reusable card for exercise lists
    ├── FormInput.js              # Reusable styled text input
    └── StatsBar.js               # Home screen stats strip
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 18+ — https://nodejs.org
- **Expo CLI** — install once globally:

```bash
npm install -g expo-cli
```

- **Expo Go app** on your phone (iOS / Android) to preview instantly
  - iOS: https://apps.apple.com/app/expo-go/id982107779
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

---

### Steps

```bash
# 1. Navigate into the project folder
cd FitnessTracker

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start
```

A **QR code** will appear in your terminal.

- **On your phone**: Open Expo Go and scan the QR code.
- **On iOS Simulator**: Press `i` in the terminal.
- **On Android Emulator**: Press `a` in the terminal.

---

## 📱 Running on a Device

Make sure your phone and computer are on the **same Wi-Fi network**, then scan the QR code from Expo Go.

---

## 🏗️ Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Log in to Expo account
eas login

# Configure the build
eas build:configure

# Build for Android (.apk / .aab)
eas build --platform android

# Build for iOS (.ipa)
eas build --platform ios
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#0D0D0D` | Screen backgrounds |
| Surface | `#1A1A1A` | Cards, inputs |
| Border | `#2A2A2A` | Card outlines |
| Accent Lime | `#E8FF47` | Primary CTA, active states |
| Accent Blue | `#47C9FF` | Core category, stats |
| Accent Red | `#FF6B6B` | Cardio category |
| Accent Purple | `#B47FFF` | Flexibility category |
| Text Primary | `#F0F0F0` | Headings, body |
| Text Muted | `#888888` | Labels, subtitles |

---

## 🔧 Key Libraries

| Library | Version | Purpose |
|---|---|---|
| `expo` | ~50.0.0 | Build toolchain |
| `react-native` | 0.73.2 | UI framework |
| `@react-navigation/native` | ^6.1.9 | Navigation container |
| `@react-navigation/native-stack` | ^6.9.17 | Stack navigator |
| `react-native-safe-area-context` | 4.8.2 | Notch-safe layout |
| `react-native-screens` | ~3.29.0 | Native screen optimisation |

---

## 💡 Extending the App

- **Persistence**: Wrap `ExerciseContext` with `AsyncStorage` to survive app restarts.
- **Notifications**: Use `expo-notifications` to schedule workout reminders.
- **Animations**: Add `react-native-reanimated` for swipe-to-delete cards.
- **Backend**: Replace seed data with a REST or GraphQL API call on mount.
