import AsyncStorage from '@react-native-async-storage/async-storage';

export enum Key {
    USER_KEY = 'user'
}

class AppHelper {
    static storeData = async ({ key, value }: { key: string, value: string }) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (e) {
            console.debug(e);
        }
    };

    static getData = async (key: string): Promise<string | null> => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
               return value;
            }
            return null;
        } catch (e) {
            console.debug(e);
            return null;
        }
    };
}

export default AppHelper