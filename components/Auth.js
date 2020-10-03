import Head from "next/head";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Logout from "../components/Logout";
import Layout from "../components/Layout";
import {
    useCollectionData,
    useCollection,
    useDocumentData,
    useDocument,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../common/firebase";
import {
    getAllUserNamesPaths,
    getUserDataFromUserName,
    convertFromTimestampToDatetime,
} from "../common/common";
import { UserCreateBooksList, UserLoginInfo } from "../components/User";

// export const AuthInfo = () => {
//     const [user, initialising, error] = useAuthState(firebase.auth());
//     if (initialising) {
//         return (
//             <Layout>
//                 <div>認証確認中...</div>
//             </Layout>
//         );
//     }
//     if (error) {
//         return (
//             <Layout>
//                 <div>認証確認エラー: {error}</div>
//             </Layout>
//         );
//     }
//     if (user) {
//         <UserLoginInfo myUid={user.uid} />;
//     }
//     return (
//         <Layout>
//             <div>aaaaaaa: </div>
//         </Layout>
//     );
// };

const login = () => {
    firebase.auth().signInWithEmailAndPassword("test@test.com", "password");
};
const logout = () => {
    firebase.auth().signOut();
};

export const CurrentUser = () => {
    const [user, loading, error] = useAuthState(firebase.auth());

    if (loading) {
        return (
            <div>
                <p>Initialising User...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }
    if (user) {
        return (
            <div>
                <p>Current User: {user.email}</p>
                <button onClick={logout}>Log out</button>
            </div>
        );
    }
    return <button onClick={login}>Log in</button>;
};
