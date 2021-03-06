import decode from 'jwt-decode';
import axios from 'axios';


export default class AuthService {

    // login using axios
    login = (password) => {
        // Get a token
        return axios.post('/api/login', {password: password})
        .then(res => {
            // set the token once the user logs in
            this.setToken(res.data.token);
            // return the rest of the response
            return res;
        }).then(null, error => console.log("Error Status:" + error.response.status));
    };
    
    
    // getProfile = () => {
    //     return decode(this.getToken());
    // };

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        axios.defaults.headers.common['Authorization'] = `Bearer ${idToken}`;
        localStorage.setItem('id_token', idToken);
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    }

    logout() {
        // Clear user token and profile data from localStorage
        axios.defaults.headers.common['Authorization'] = null;
        localStorage.removeItem('id_token');

        // Storing the user id in local storage
         localStorage.removeItem('user');
    }



}