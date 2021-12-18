import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {getFromDeviceStorage} from '../common/DeviceStorage';

export default Login = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signup = () => {
    props.navigation.navigate('Signup');
  };
  const login = async () => {
    if (email == '' || password == '') {
      alert('Please enter your username and password');
    } else {
      const user = await getFromDeviceStorage('user');
      if (user) {
        const found = JSON.parse(user).some(
          el => el.email === email && el.password === password,
        );

        if (found) {
          const foundName = JSON.parse(user).find(x => x.email === email).name;
          props.navigation.navigate('Home', {userName: foundName});
        } else {
          alert('Incorrect Email or Password');
        }
      } else {
        alert('Incorrect Email or Password');
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="#ffffff"
          onChangeText={val => setEmail(val)}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#ffffff"
          onChangeText={val => setPassword(val)}
        />
        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupTextCount}>
        <Text style={styles.signupText}>Dont't have an account yet? </Text>
        <TouchableOpacity onPress={() => signup()}>
          <Text style={styles.signupButton}>Signup</Text>
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
});
