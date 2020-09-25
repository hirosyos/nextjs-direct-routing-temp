import Head from "next/head";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "../../components/Layout";
import Logout from "../../components/Logout";
import Login from "../../components/Login";
import styles from "../../styles/Home.module.scss";
import firebase from "../../firebase/firebase";

export default function LoginPage() {
    const [user, initialising, error] = useAuthState(firebase.auth());
    if (initialising) {
        return (
            <Layout>
                <div>Initialising...</div>
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout>
                <div>Error: {error}</div>
            </Layout>
        );
    }
    if (!user) {
        return (
            <Layout>
                <div className={styles.container}>
                    <Head>
                        <title>手記書庫/ログイン</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <main className={styles.main}>
                        <h1 className={styles.title}>
                            Welcome to ログイン ページ
                        </h1>
                        <h1>ログインページ</h1>
                        <Login />
                    </main>

                    <footer className={styles.footer}>
                        <a
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Powered by{" "}
                            <img
                                src="/vercel.svg"
                                alt="Vercel Logo"
                                className={styles.logo}
                            />
                        </a>
                    </footer>
                </div>
            </Layout>
        );
    }
    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>自分史図書館/ログイン</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <main className={styles.main}>
                    <p>displayName: {user.displayName}</p>
                    <p>email: {user.email}</p>
                    <p>emailVerified: {user.emailVerified}</p>
                    <p>photoURL: {user.photoURL}</p>
                    <p>isAnonymous: {user.isAnonymous}</p>
                    <p>uid: {user.uid}</p>
                    {/* <p>providerData: {user.providerData}</p> */}
                    {console.log("あああああ")}
                    {console.log({ user })}
                    <Logout />
                </main>
                <footer className={styles.footer}>
                    <a
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Powered by{" "}
                        <img
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            className={styles.logo}
                        />
                    </a>
                </footer>
            </div>
        </Layout>
    );
}
