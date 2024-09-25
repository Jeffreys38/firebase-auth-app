import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import DatabaseHelper from '@/src/helpers/DatabaseHelper'; // Import your DB helper class
import User from '@/src/models/User'; // Assuming you have a User model

export default function DetailScreen() {
    const { id } = useLocalSearchParams(); // Get the dynamic 'id' from the route
    const [userDetail, setUserDetail] = useState<User | null>(null); // State to hold user data
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    const dbHelper = new DatabaseHelper<User>('users');

    useEffect(() => {
        const fetchUserDetail = async () => {
            try {
                setLoading(true);

                const user = await dbHelper.get(id as string);

                console.log(user)
                if (user) {
                    setUserDetail(user);
                } else {
                    setError('User not found');
                }
            } catch (error) {
                setError('Error fetching user details');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserDetail(); // Fetch details if id is available
        }
    }, [id]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading user details...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {userDetail ? (
                <View style={styles.detailContainer}>
                    <Text style={styles.label}>User ID:</Text>
                    <Text style={styles.value}>{userDetail.id}</Text>
                    <Text style={styles.label}>Name:</Text>
                    <Text style={styles.value}>{userDetail.name}</Text>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>{userDetail.email}</Text>
                    {/* Add more fields as necessary */}
                </View>
            ) : (
                <Text style={styles.errorText}>No user details found</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    detailContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '100%',
        elevation: 5,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 5,
    },
    value: {
        fontSize: 18,
        color: '#333',
        marginBottom: 15,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
});
