export const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

export const getToken = () => {
    try {
        const userInfo = localStorage.getItem('userInfolms') || localStorage.getItem('userInfoLms');
        return userInfo ? JSON.parse(userInfo).token : null;
    } catch (e) {
        return null;
    }
};

export const getUser = () => {
    try {
        const userInfo = localStorage.getItem('userInfolms') || localStorage.getItem('userInfoLms');
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (e) {
        return null;
    }
};

// Object that stringifies to current token dynamically in template literals: `Bearer ${token}`
export const token = {
    toString: () => getToken() || '',
    valueOf: () => getToken() || ''
};

export const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${getToken()}`
});
