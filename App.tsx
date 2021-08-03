/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleSubmit = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      Alert.alert(err.code);
    }
  };

  const handleLogout = () => {
    auth().signOut();
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.sectionContainer}>
          {user ? (
            <>
              <Text style={styles.title}>Welcome {user.email}</Text>
              <Button onPress={handleLogout} title="Logout" />
            </>
          ) : (
            <>
              <Text style={styles.title}>Welcome Stranger</Text>
              <TextInput
                style={styles.textInput}
                placeholder="email"
                onChangeText={mail => setEmail(mail)}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Password"
                secureTextEntry
                onChangeText={pw => setPassword(pw)}
              />
              <Button onPress={handleSubmit} title="Submit" />
            </>
          )}
        </View>
      </ScrollView>
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
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
    margin: 15,
  },
});

export default App;
