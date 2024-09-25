import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import {TouchableOpacity, View} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import CustomDrawer from "../../../src/components/CustomDrawer";
import { useModalContext } from "@/src/context/ModalContext";

export default function Layout() {
    const { isShowModalOpen, setShowModalOpen } = useModalContext();

    const handleAdd = () => setShowModalOpen(!isShowModalOpen);

    const menuRight = () => {
        return (
            <View style={{flexDirection: 'row', paddingHorizontal: 30}}>
                <TouchableOpacity >
                    <AntDesign style={{marginRight: 35}} name="search1" size={26} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAdd}>
                    <AntDesign name="plus" size={26} color="white" />
                </TouchableOpacity>
            </View>
        )
    }

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
                        headerTintColor: 'white',
                        headerRight: (props) => menuRight()
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
