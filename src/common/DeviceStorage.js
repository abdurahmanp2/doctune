import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const saveInDeviceStorage = async (key, value) => {
  try {
    console.debug("DEVICE_STORAGE: Saving " + key + ": " + value);
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('DEVICE_STORAGE: AsyncStorage Error: ' + error.message);
  }
};

export const getFromDeviceStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.debug("DEVICE_STORAGE: Fetched " + key + ": " + value);
    return value;
  } catch (error) {
    console.log('DEVICE_STORAGE: AsyncStorage Error: ' + error.message);
  }
};

export const deleteItem = async (key) => {
  try {
    console.debug("DEVICE_STORAGE: Deleting " + key);
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('DEVICE_STORAGE: AsyncStorage Error: ' + error.message);
  }
};