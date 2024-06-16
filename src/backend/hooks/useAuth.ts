import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export function useAuth() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const [CurrentData, setCurrentData] = useState(new Map());

  const updateMap = (k: string, v: any) => {
    setCurrentData(new Map(CurrentData.set(k, v)));
  };

  const FirebaseCall = async (user: FirebaseAuthTypes.User) => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(res => {
        if (res) {
          for (let key in res.data()) {
            updateMap(key, res.data()[key]);
          }
        }
      });
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      if (user) {
        FirebaseCall(user);
      }
    });
    return subscriber;
  }, []);

  return {
    user,
    CurrentData,
  };
}
