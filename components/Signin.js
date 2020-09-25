import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "./Layout";
import styles from "../styles/Home.module.scss";
import firebase from "../firebase/firebase";

// Firestoreにデータを送信する関数
const postDataToFirestore = async (collectionName, docName, postData) => {
    const addedData = await firebase
        .firestore()
        .collection(collectionName)
        .doc(docName)
        .set(postData);
    return addedData;
};

const Signin = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [account, setAccount] = useState("");
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);
    const mounted = useRef(true);
    useEffect(() => {
        const cleanup = () => {
            mounted.current = false;
        };
        return cleanup;
    }, []);
    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setPending(true);
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, pass);

            // //ユーザデータ書き込み
            const postData = {
                history: "React難しい",
                id: "4",
                name: account,
            };
            await postDataToFirestore("users2", account, postData);
        } catch (e) {
            console.log(e.message, mounted);
            if (mounted.current) setError(e);
        } finally {
            if (mounted.current) setPending(false);
        }
    };
    return (
        <>
            <h2>サインイン</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                />
                <input
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Password..."
                />
                <input
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="Account..."
                />
                <button type="submit">Signup</button>
                {pending && "Pending..."}
                {error && `Error: ${error.message}`}
            </form>
        </>
    );
};

export default Signin;
