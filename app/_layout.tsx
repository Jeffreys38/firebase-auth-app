import { Slot, Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/store';

export default function Root() {
  return (
      <Provider store={store}>
          <Stack initialRouteName={"(app)"}>
              <Stack.Screen name="(app)" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
              <Stack.Screen name="signup" options={{ title: '', headerShown: false }} />
              <Stack.Screen name="forgot" options={{ title: '', headerTintColor: 'black' }} />
          </Stack>
      </Provider>
  );
}
