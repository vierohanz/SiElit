// src/contexts/AuthContext.js
import React, {createContext, useState, useEffect} from 'react';
import * as Keychain from 'react-native-keychain';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkToken = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log('Error fetching token:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  const login = async token => {
    if (token) {
      await Keychain.setGenericPassword('token', token);
      setIsAuthenticated(true);
    }
  };

  const logout = async () => {
    await Keychain.resetGenericPassword();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, isLoading, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
