function handleError(error: { code: string; message: string }) {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'Email is invalid.';
            break;
        case 'auth/invalid-credential':
            return 'Wrong password or email';
            break;
        case 'auth/missing-email':
            return 'Email cannot be left blank';
            break;
        case 'auth/wrong-password':
            return 'Wrong password.';
            break;
        case 'auth/weak-password':
            return 'Password should be at least 6 characters';
            break;
        default:
            return 'Lỗi không xác định:';
    }
}

export { handleError }