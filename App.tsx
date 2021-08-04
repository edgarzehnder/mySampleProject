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
import firestore from '@react-native-firebase/firestore';

import {
  Alert,
  Button,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [food, setFood] = useState<{name: string; store: string}[]>([]);

  const loadFood = async () => {
    try {
      const collection =
        firestore().collection<{name: string; store: string}>('food');

      const foodResult = await collection.get();

      const foodItems: {name: string; store: string}[] = [];

      foodResult.docs.forEach(item => {
        foodItems.push(item.data());
      });

      setFood(foodItems);
    } catch (err) {
      Alert.alert(err.code);
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);
    });
  }, []);

  useEffect(() => {
    !!user && loadFood();
  }, [user]);

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

  const backgroundStyle = {
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.sectionContainer}>
        {user ? (
          <>
            <Text style={styles.title}>Welcome {user.email}</Text>
            <Button onPress={handleLogout} title="Logout" />
            {user && food && (
              <View>
                <FlatList
                  style={styles.list}
                  keyExtractor={item => item.name}
                  data={food}
                  renderItem={({item}) => (
                    <View style={styles.listItem}>
                      <Text>
                        {item.name} {item.store}
                      </Text>
                    </View>
                  )}
                />
              </View>
            )}
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
