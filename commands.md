## Commands setup

- install lib `npm i -g create-react-native-app`
- create `npx react-native init mySampleProject --template react-native-template-typescript`
- navigate `cd mySampleProject`
- run it `npx react-native run-ios`

## create-react-native-app

- `cd "/Users/edgar/Documents/ownProjects/mySampleProject" && npx react-native run-ios`

## add firebase

- `yarn add @react-native-firebase/app`
- `yarn add @react-native-firebase/auth`
- `yarn add @react-native-firebase/firestore`

- open `mySampleProject.xcworkspace` copy bundleidentifier
- in xcode add file to mySampleProject and add plist
- open **AppDelegate.m** and add `#import <Firebase.h>`on the top
  - in `(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions` add `if ([FIRApp defaultApp] == nil) { [FIRApp configure]; }`
- `cd ios` and `pod install --repo-update`
- `cd ..` and `npx react-native run-ios`

**Finish feat/1-add-firebase**

## add call

- add to **app.tsx** `import * as React from 'react'; import { Text } from 'react-native';import auth from '@react-native-firebase/auth'; `

## add calls

- Sammlungs-ID -> food
- id, name, store
