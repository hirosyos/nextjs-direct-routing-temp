import Head from "next/head";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import Layout from "components/Layout";
import Logout from "components/Logout";
import Login from "components/Login";
import styles from "styles/Home.module.scss";
import firebase from "common/firebase";

// export async function getServerSideProps({ params }) {
//     const user = firebase.auth().currentUser;
//     // const [user, initialising, error2] = useAuthState(firebase.auth());
//     // if (initialising) {
//     //     return {
//     //         props: {
//     //             initialising: initialising,
//     //             error2: null,
//     //             user: null,
//     //         },
//     //     };
//     // }
//     // if (error2) {
//     //     return {
//     //         props: {
//     //             initialising: null,
//     //             error2: error2,
//     //             user: null,
//     //         },
//     //     };
//     // }
//     if (!user) {
//         console.log("認証したユーザではありません");
//         return {
//             props: {
//                 user: null,
//             },
//         };
//     }

//     const values = await firebase
//         .firestore()
//         .collection("validUsers")
//         .doc(user.uid)
//         .get();
//     console.log("values");
//     console.log(values);

//     console.log("認証したユーザです");
//     return {
//         props: {
//             user: values,
//         },
//     };
// }

/**
 * ログインページ
 *
 * @return {*}
 */
export default function LoginPage() {
    //
    //デバッグ情報
    //
    console.log("\nファイル /pages/auth/login.js");
    console.log("関数 LoginPage");

    const [user, initialising, error2] = useAuthState(firebase.auth());

    console.log("user");
    console.log(user);

    if (initialising) {
        return (
            <Layout>
                <div>Initialising...</div>
            </Layout>
        );
    }
    if (error2) {
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
                </div>
            </Layout>
        );
    }

    //ここのデータが取れてない
    const fireget = async (uid) => {
        const values = await firebase
            .firestore()
            .collection("validUsers")
            .doc(uid)
            .get();

        console.log("values");
        console.log(values);
        return values;
    };

    const values = fireget(user.uid);

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫/サインイン</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <p>{`すでにログイン済みです`}</p>
                <Link href={`/users/${values.userName}`}>
                    <a>ユーザページへ</a>
                </Link>
                <Logout />
            </div>
        </Layout>
    );
}
