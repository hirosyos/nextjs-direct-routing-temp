import Head from "next/head";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "../../components/Layout";
import Logout from "../../components/Logout";
import Signin from "../../components/Signin";
import styles from "../../styles/Home.module.scss";
import firebase from "../../common/firebase";
import {
    useCollectionData,
    useCollection,
    useDocumentData,
    useDocument,
} from "react-firebase-hooks/firestore";

const SigninPage = () => {
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
                        <title>手記書庫/サインイン</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    <main className={styles.main}>
                        <h1 className={styles.title}>
                            Welcome to サインイン ページ
                        </h1>
                        <h1>認証ページ</h1>
                        <Signin />
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

    const values = firebase.firestore().collection("validUsers").doc(user.uid);
    console.log("values◆");
    console.log(values);
    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫/サインイン</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <p>{`すでに${values.userName}としてログイン済みです`}</p>
                <Link href={`/users/${values.userName}`}>
                    <a>ユーザページへ</a>
                </Link>
            </div>
        </Layout>
    );
};

export default SigninPage;
