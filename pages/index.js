import React, { useState, useCallback, Component } from "react";
import { userAuth } from '../lib/auth'
import router from "next/router";

export default function Home(props) {
    React.useEffect(() => {
        const isAuthenticated = userAuth();
        if (isAuthenticated) {
            router.push('/overview');
        } else {
            router.push('/login');
        }
    }, [])
 
    return (
        <section></section>   
    )
}