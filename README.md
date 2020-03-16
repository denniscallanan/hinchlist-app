# Life Lists - App

This repository contains the client-side cross-platform code for both iOS and Android.

The cross-platform framework used is React-Native, written in Javascript.

This client communicates with a backend server for making API requests.

# Contributing

Clone the repository

Install all relevant dependencies

```
npm install .
```

Ensure you have Xcode installed if you are testing dev for iOS, and ensure Android Studio is installed if you are testing dev for Android.

Make sure the tests are all passing 

```
npm run test
```

Make your code changes, following good practices. All MRs will be code reviewed.

You can test on your iOS device or simulator using

```
react-native run-ios --simulator "iPhone 11" // --device "Name's iPhone"
```

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