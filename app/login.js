import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView, TouchableOpacity,
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {router, useNavigation} from 'expo-router';
import Fontisto from '@expo/vector-icons/Fontisto';

import {handleError} from "../src/handler/error";
import {AppDispatch, RootState} from "../src/store";
import {login} from "../src/store/slices/authSlice";

// Integrate Google Method
// import {
//   GoogleOneTapSignIn,
//   statusCodes,
//   type OneTapUser,
// } from '@react-native-google-signin/google-signin';
// GoogleOneTapSignIn.configure({
//   webClientId: 'autoDetect',
// });

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const dispatch: AppDispatch = useDispatch();

  const handleLogin = async () => {
    try {
      if (isInputEmpty()) {
        return;
      }

      await dispatch(login(email, password));
      router.replace('/get-started');
    } catch (error) {
      console.log(error.code)
      alert(handleError({
        code: error.code,
        message: error.message
      }));
    }
  };

  function isInputEmpty() {
    if (email.trim() === "" || password.trim() === "") {
      alert("Cannot be left blank");
      return true;
    }
    return false;
  }

  async function loginWithGoogle() {
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const response = await GoogleOneTapSignIn.signIn();
    //
    //   if (isSuccessResponse(response)) {
    //     // read user's info
    //     console.log(response.data);
    //   } else if (isNoSavedCredentialFoundResponse(response)) {
    //     // Android and Apple only.
    //     // No saved credential found, call `createAccount`
    //   }
    // } catch (error) {
    //   if (isErrorWithCode(error)) {
    //     switch (error.code) {
    //       case statusCodes.ONE_TAP_START_FAILED:
    //         // Android-only, you probably have hit rate limiting.
    //         // You can still call `presentExplicitSignIn` in this case.
    //         break;
    //       case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
    //         // Android: play services not available or outdated
    //         // Web: when calling an unimplemented api (requestAuthorization)
    //         break;
    //       default:
    //         // something else happened
    //     }
    //   } else {
    //     // an error that's not related to google sign in occurred
    //   }
    // }
  }

  function loginWithGithub() {

  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={require("../assets/images/logo.png")}
        />
        <Text style={styles.screenTitle}>Akko Company</Text>
        <Text style={styles.screenSubTitle}>A product of user management</Text>
      </View>

      {/* Wrapping each TextInput inside a View */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
      >
        <Text style={[styles.signupText, styles.btn]}>{loading ? "Logging in..." : "Login"}</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text
          onPress={() => navigation.navigate("signup")}
          style={styles.signupLink}
        >
          Sign Up
        </Text>
      </Text>
      <Text style={styles.signupText}>
        <Text
          onPress={() => router.push("forgot")}
          style={styles.signupLink}
        >
          Forgot password?
        </Text>
      </Text>

      {/*Optional Method Login*/}
      <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 40}}>
        <TouchableOpacity onPress={loginWithGoogle}>
          <Image
              style={{width: 40, height: 40}}
              source={require('../assets/images/google.webp')}
          />
        </TouchableOpacity>
       <TouchableOpacity onPress={loginWithGithub}>
         <Fontisto style={styles.loginIcon} name="github" size={40} color="black" />
       </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  logoContainer: {
    alignItems: "center",
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "black",
    marginTop: 20,
  },
  screenSubTitle: {
    color: 'black',
    marginTop: 12,
    marginBottom: 19
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  btn: {
    backgroundColor: 'black',
    color: 'white',
    padding: 20,
    fontWeight: 600
  },
  input: {
    color: 'black',
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    flex: 0,
    minWidth: "100%",
    maxWidth: "100%",
  },
  signupText: {
    marginTop: 20,
    textAlign: "center",
    color: 'black'
  },
  signupLink: {
    color: "black",
    fontWeight: "bold",
  },
  loginIcon: {
    marginLeft: 18
  }
});

export default Login;
