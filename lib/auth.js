import fetch from "isomorphic-unfetch";
import config from "../config";
import router from "next/router";

export const postLogin = (email, password) =>
    fetch(`${config.apiUrl}/authenticate`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    }).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            console.log('Login failed.')
            let error = new Error(res.statusText)
            error.res = res
            return Promise.reject(error)
        }
    });

export const userAuth = () => {
    let auth = localStorage.getItem('authenticate');
    if ( auth === 'true' ) {
        auth = true;
    } else {
        auth = false;
    }
    return auth;
}

export const getProfile = () => {
    const profile = localStorage.getItem('profile');
    return JSON.parse(profile);
}

export const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    router.push('/');
}
