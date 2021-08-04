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
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
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
      <StatusBar />
      <View style={styles.sectionContainer}>
        {user ? (
          <>
            <Text style={styles.title}>Welcome {user.email}</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
              <Text>Logout</Text>
            </TouchableOpacity>
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
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text>Submit</Text>
            </TouchableOpacity>
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
  },
  listItem: {
    flexDirection: 'column',
    margin: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    borderWidth: 1,
    borderColor: 'blue',
    margin: 15,
    padding: 15,
    fontSize: 20,
    alignItems: 'center',
  },
});

export default App;
