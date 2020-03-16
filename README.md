# Life Lists - App

This repository contains the client-side cross-platform code for both iOS and Android.

The cross-platform framework used is React-Native, written in Javascript.

This client communicates with a backend server for making API requests.

# Contributing

Clone the repository

Install all relevant dependencies

```
npm install .
cd ios
pod install
```


Make sure the tests are all passing 

```
npm run test
```

Make your code changes, following good practices. All MRs will be code reviewed.

## Running on iOS

Ensure you have Xcode installed if you are testing dev for iOS..

You can test on your iOS device or simulator using

```
react-native run-ios --simulator "iPhone 11" // --device "Name's iPhone"
```

## Running on Android

Ensure Android Studio is installed if you are testing dev for Android and Java Runtime is installed

```
brew cask install java
```

Open Android Studio, create a virtual emulator using: `Tools -> AVD Devices`, and launch the emulator.

You can then test on your Android device or simulator using

```
react-native run-android --simulator "iPhone 11" // --device "Name's iPhone"
```

If you get the error 
```
Error: Failed to install the app. Make sure you have the Android development environment set up
```

You may want to make sure you have the Android Developer Tools installed:

```
brew cask install android-platform-tools
```

If you still get the same error you may want to open the `/android` directory as a project in Android Studio which will automatically build the gradle settings locally for you.

If you experience issues with SDK licenses, open the project in Android Studio and it will prompt you to install the licenses. 

Android Studio can generally solve these technical problems.

------------------

Ensure the code format is consistent.

To catch any formatting issues, run

```
npm run lint 
```

To fix any code formatting issues, run

```
npm run lint-fix
```

# Deploying

At the moment deployments are completely manual through the relevant store. To update this section.