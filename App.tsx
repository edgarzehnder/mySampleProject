import React, {useEffect, useState} from 'react';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const backgroundStyle = {
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Welcome</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
    fontSize: 20,
    margin: 15,
  },
  sectionContainer: {
    flex: 1,
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    color: 'black',
    margin: 15,
    lineHeight: 15,
  },
  list: {
    flexDirection: 'column',
    margin: 15,
  },
  listItem: {
    flexDirection: 'column',
    margin: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default App;
