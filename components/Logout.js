import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "./Layout";
import styles from "../styles/Home.module.scss";
import firebase from "../common/firebase";

const Logout = () => {
    const [pending, setPending] = useState(false);
    const mounted = useRef(true);
    useEffect(() => {
        const cleanup = () => {
            mounted.current = false;
        };
        return cleanup;
    }, []);
    const logout = async () => {
        setPending(true);
        await firebase.auth().signOut();
        if (mounted.current) setPending(false);
    };
    return (
        <>
            <button type="button" onClick={logout}>
                Logout
            </button>
            {pending && "Pending..."}
        </>
    );
};

export default Logout;
