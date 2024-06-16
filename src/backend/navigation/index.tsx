import React, { useEffect } from 'react';
import UserStack from './userStack';
import AuthStack from './authStack';
import {useAuth} from '../hooks/useAuth';

export default function RootNavigation() {
  const { user, CurrentData } = useAuth();

  useEffect(() => {
    console.log("Auth Status detected :",user?.displayName)
  }, [user])

  return user ? (
    <UserStack user={user} CurrentData={CurrentData} />
  ) : (
    <AuthStack />
  );
}
