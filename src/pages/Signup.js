import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  saveInDeviceStorage,
  getFromDeviceStorage,
} from '../common/DeviceStorage';

export default Signup = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const login = () => {
    props.navigation.navigate('Login');
  };
  function nameValidator() {
    console.log('error:', nameError);
    if (name == '') {
      setNameError('Name field cannot be empty');
    } else {
      setNameError('');
    }
  }
  function passwordValidator() {
    if (password == '') {
      setPasswordError('Password field cannot be empty');
    } else {
      setPasswordError('');
    }
  }
  function emailValidator() {
    if (email == '') {
      setEmailError('Email field cannot be empty');
    } else {
      let reg = /^([a-zA-Z0-9_\.\-]+)@([a-zA-Z0-9_\.\-]+)\.([a-zA-Z]{2,5})$/;
      let isValid = reg.test(email);
      if (!isValid) {
        setEmailError('Please enter valid email address');
      } else {
        setEmailError('');
      }
    }
  }
  async function signup() {
    if (name == '') {
      setNameError('Name field cannot be empty');
    } else if (email == '') {
      setEmailError('Email field cannot be empty');
    } else if (password == '') {
      setPasswordError('Password field cannot be empty');
    } else {
      setNameError('');
      setEmailError('');
      setPasswordError('');
      const users = [];
      const tempUser = {
        name: name,
        email: email,
        password: password,
      };
      const user = await getFromDeviceStorage('user');
      if (user) {
        const found = JSON.parse(user).some(el => el.email === email);

        if (found) {
          alert('This email is already registerd');
        } else {
          signupDetails(tempUser);
        }
      } else {
        users.push(tempUser);
        await saveInDeviceStorage('user', JSON.stringify(users));
        props.navigation.navigate('Home', {userName: name});
      }
    }
  }

  async function signupDetails(tempUser) {
    const user = await getFromDeviceStorage('user');
    const currentData = JSON.parse(user);
    currentData.push(tempUser);
    await saveInDeviceStorage('user', JSON.stringify(currentData));

    props.navigation.navigate('Home', {userName: name});
  }
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.errorText}>{nameError}</Text>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Name"
          placeholderTextColor="#ffffff"
          onChangeText={val => setName(val)}
          onBlur={() => nameValidator()}
        />
        <Text style={styles.errorText}>{emailError}</Text>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="#ffffff"
          onChangeText={val => setEmail(val)}
          onBlur={() => emailValidator()}
        />
        <Text style={styles.errorText}>{passwordError}</Text>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          onChangeText={val => setPassword(val)}
          onBlur={() => passwordValidator()}
        />
        <TouchableOpacity style={styles.button} onPress={() => signup()}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextCount}>
        <Text style={styles.signupText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => login()}>
          <Text style={styles.signupButton}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
  },
  signupTextCount: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 180,
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255, 255,0.3)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
    paddingVertical: 12,
  },
  button: {
    width: 300,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 25,
    marginVertical: 10,
    backgroundColor: '#1c3131',
  },
  errorText: {
    color: 'red',
  },
});
