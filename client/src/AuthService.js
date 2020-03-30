import decode from 'jwt-decode';
import axios from 'axios';


export default class AuthService {

    // // login using fetch
    // login = (password) => {
    //     // Get a token
    //     return fetch('api/login', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify(password),
    //     }).then((response) => response.json)
    //     .then(response => {
    //         // set the token once the user logs in
    //         this.setToken(response.data.token);
    //         // return the rest of the response
    //          return response;
    //     }).catch((error) => {
    //         console.error('Error:', error);
    //     });
    // };
    // login using axios
    login = (password) => {
        console.log("In AuthService.js in login!!!!!!!");
        // Get a token
        return axios.post('/api/login', {password: password})
        .then(res => {
            // set the token once the user logs in
            console.log("In AuthService.js - before setToken - token: " + res.data.token);
            this.setToken(res.data.token);
            console.log("In AuthService.js - after setToken - token: " + res.data.token);
            // return the rest of the response
            return res;
        }).then(null, error => console.log("Error Status:" + error.response.status));
    };
    
    
    
    // login = (password) => {
    //     console.log("In AuthService.js in login!!!!!!!");
    //     // Get a token
    //     return axios.post('/api/login', {password: password})
    //     .then(res => {
    //         // set the token once the user logs in
    //         this.setToken(res.data.token);
    //         console.log("In AuthService.js - token: " + res.data.token);
    //         // return the rest of the response
    //         return res;
    //     }).catch(function (error) {
    //         if (error.response) {
    //           // The request was made and the server responded with a status code
    //           // that falls out of the range of 2xx
    //           console.log(error.response.data);
    //           console.log(error.response.status);
    //           console.log(error.response.headers);
    //         } else if (error.request) {
    //           // The request was made but no response was received
    //           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //           // http.ClientRequest in node.js
    //           console.log(error.request);
    //         } else {
    //           // Something happened in setting up the request that triggered an Error
    //           console.log('Error', error.message);
    //         }
    //         console.log(error.config);
    //       });
    // };

    // login = (password) => {
    //     console.log("In AuthService.js in login!!!!!!!");
    //     // Get a token
    //     return axios.post('/api/login', {password: password})
    //     .then(res => {
    //         // set the token once the user logs in
    //         this.setToken(res.data.token);
    //         console.log("In AuthService.js - token: " + res.data.token);
    //         // return the rest of the response
    //         return res;
    //     });
    // };

    // //This was tried but did not work
    // login = (password) => {
    //     return axios({
    //         method: 'post',
    //         url: '/api/login',
    //         data: {
    //         password: password,
    //         },
    //         validateStatus: (status) => {
    //         return true; // I'm always returning true, you may want to do it depending on the status received
    //         },
    //     }).catch(error => {
    
    //     }).then(res => {
    //         // set the token once the user logs in
    //         this.setToken(res.data.token);
    //         console.log("In AuthService.js - token: " + res.data.token);
    //         // return the rest of the response
    //         return res;
    //     });
    // };

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