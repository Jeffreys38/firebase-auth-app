import {Text} from 'react-native';
import {Redirect, router, Stack, useNavigation} from 'expo-router';
import {AppDispatch, RootState} from "../../src/store";
import {useDispatch, useSelector} from "react-redux";

export default function AppLayout() {
    const { loading, error, user } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const navigation = useNavigation();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (loading) {
        return <Text>Loading...</Text>;
    }

    // Don't allow access private router
    if (user === null) {
        return <Redirect href="/login" />;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    // This layout can be deferred because it's not the root layout.
    return (
        <Stack initialRouteName={"get-started"}>
            <Stack.Screen name="(drawer)" options={{
                title: "Customer Management",
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerTitleStyle: {
                    color: 'white',
                },
                headerShown: false
            }} />
            <Stack.Screen name="get-started" options={{
                headerShown: false
            }} />
        </Stack>
    );
}
