import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

import CustomDrawer from "../../../src/components/CustomDrawer";

export default function Layout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={(props) => <CustomDrawer {...props} />}>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: 'Home',
                        title: 'Dashboard',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTitleStyle: {
                            color: 'white',
                        },
                        headerTintColor: 'white'
                    }}
                />

                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: 'Settings',
                        title: 'Settings',
                        headerStyle: {
                            backgroundColor: 'black',
                        },
                        headerTitleStyle: {
                            color: 'white',
                        },
                        headerTintColor: 'white'
                    }}
                />


            </Drawer>
        </GestureHandlerRootView>
    );
}
