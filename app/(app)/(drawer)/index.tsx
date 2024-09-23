import {Text, StyleSheet, View} from 'react-native';

export default function () {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>10 score</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    'container': {
        backgroundColor: 'black',
        flex: 1,
        padding: 40
    },
    'title': {
        fontSize: 42,
        color: 'white',
        marginTop: 20
    }
})