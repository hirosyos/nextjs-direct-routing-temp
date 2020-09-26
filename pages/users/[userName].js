import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.scss";
import {
    useCollectionData,
    useCollection,
    useDocumentData,
    useDocument,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../firebase/firebase";

function useGetAllUserNamesByhook() {
    const [values, loading, error] = useCollectionData(
        firebase.firestore().collection(`users2`),
        {
            idField: "id",
        }
    );
    //firebaseからの呼び出し結果判定
    if (loading) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout>
                <div>{`Error: ${error1.message}`}</div>;
            </Layout>
        );
    }
    console.log(values);
    return values.map((value) => {
        return {
            params: {
                userName: value.name,
            },
        };
    });
}

async function getAllUserNames() {
    const values = await firebase.firestore().collection("users2").get();

    console.log({ values });
    return values.docs.map((value) => {
        return {
            params: {
                userName: value.data().name,
            },
        };
    });

    // const paths = ["/users/hoge3", "/users/hoge2"];

    // const paths = [
    //     {
    //         params: {
    //             userName: "hoge3",
    //         },
    //     },
    //     {
    //         params: {
    //             userName: "hoge4",
    //         },
    //     },
    // ];

    // console.log({ paths });
    // return paths;
}

// 最初に実行される。事前ビルドするパスを配列でreturnする。
export async function getStaticPaths() {
    const paths = await getAllUserNames();
    // const paths = useGetAllUserNamesByhook();

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    console.log({ params });

    //ここでfirestore読み出しをしてみる

    return {
        props: {
            userName: params.userName,
        },
    };
}

const UserNamePage = (props) => {
    console.log({ props });

    //firebase読み出し
    const [values, loading, error1] = useDocumentData(
        firebase.firestore().doc(`users2/${props.userName}`),

        {
            idField: "id",
        }
    );
    //firebaseからの呼び出し結果判定
    if (loading) {
        return (
            <Layout>
                <div>Loading...</div>
            </Layout>
        );
    }
    if (error1) {
        return (
            <Layout>
                <div>{`Error: ${error1.message}`}</div>;
            </Layout>
        );
    }
    console.log(values);
    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫/ユーザページ</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>Welcome to ユーザー ページ</h1>
                    <p> ユーザー: {props.userName}</p>

                    <h1>firebase読み出しテストページ</h1>
                    <p>URLに指定されたID: {props.userName}</p>
                    <p>
                        {props.userName}のid: {values.id}
                    </p>
                    <p>
                        {props.userName}のname: {values.name}
                    </p>
                    <p>
                        {props.userName}のhistory: {values.history}
                    </p>

                    <Link href={`/users/${props.userName}/bookCreate`}>
                        <a>手記作成</a>
                    </Link>
                    <Link href={`/users/${props.userName}/aiueo`}>
                        <a>手記あいうえお</a>
                    </Link>
                    <Link href={`/users/${props.userName}/kakikukeko`}>
                        <a>手記かきくけこ</a>
                    </Link>
                    <Link href={`/users/${props.userName}/sasisuseso`}>
                        <a>手記さしすせそ</a>
                    </Link>
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

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>Welcome to ユーザー ページ</h1>
                    <p> ユーザー: {props.userName}</p>
                    <Link href={`/users/${props.userName}/bookCreate`}>
                        <a>手記作成</a>
                    </Link>
                    <Link href={`/users/${props.userName}/aiueo`}>
                        <a>手記あいうえお</a>
                    </Link>
                    <Link href={`/users/${props.userName}/kakikukeko`}>
                        <a>手記かきくけこ</a>
                    </Link>
                    <Link href={`/users/${props.userName}/sasisuseso`}>
                        <a>手記さしすせそ</a>
                    </Link>
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
};

export default UserNamePage;
