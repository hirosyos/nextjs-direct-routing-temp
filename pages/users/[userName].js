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

// const VALIDUSERS = "users2";
const VALIDUSERS = "validUsers";

function useGetAllUserNamesByhook() {
    const [values, loading, error] = useCollectionData(
        // firebase.firestore().collection(`users2`),
        firebase.firestore().collection(VALIDUSERS),
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
                userName: value.userName,
            },
        };
    });
}

async function getAllUserNames() {
    const values = await firebase.firestore().collection(VALIDUSERS).get();

    console.log("◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆");
    console.log({ values });
    return values.docs.map((value) => {
        return {
            params: {
                userName: value.data().userName,
                // userName: value.data().name,
            },
        };
    });

    ////このような配列を返さないとだめ
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

    ////でもこっちでも動くっぽい
    // const paths = ["/users/hoge3", "/users/hoge2"];

    // const paths =[];
    // console.log({ paths });
    // return paths;
}

async function getUserData(userName) {
    const tmpDoc = await firebase
        .firestore()
        .collection(VALIDUSERS)
        // .where("name", "==", userName)
        .where("userName", "==", userName)
        .get();
    // .then((t) => {
    //     console.log("◆tmpDoc.uid");
    //     console.log(tmpDoc);
    // });
    const pagename = tmpDoc.docs.map((x) => {
        return {
            // name: x.data().name,
            // userName: x.data().userName,
            uid: x.data().uid,
        };
    });
    console.log("pagename[0].uid");
    console.log(pagename[0].uid);

    const values = await firebase
        .firestore()
        .collection(VALIDUSERS)
        // .doc(tmpDoc.name)
        .doc(pagename[0].uid)
        .get();

    console.log(values.data().userName);

    // const values = await firebase
    //     .firestore()
    //     .collection(VALIDUSERS)
    //     .doc(userName)
    //     .get();

    return {
        userName,
        values,
    };
}

// 最初に実行される。事前ビルドするパスを配列でreturnする。
export async function getStaticPaths() {
    const paths = await getAllUserNames();

    //// [@TODO]こっちの関数で動かない理由がわからない
    // const paths = useGetAllUserNamesByhook();

    paths.map((p) => {
        console.log(`SSGページ対象は ${p.params.userName}`);
        // return p.params.userName;
    });

    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    // console.log("◆◆getUserData起動前");
    // console.log({ params });

    const userData = await getUserData(params.userName);
    // console.log("◆◆[userName].js getUserData起動後");
    // console.log({ userData });
    // console.log(userData.values.data().id);
    // console.log(userData.values.data().name);
    // console.log(userData.values.data().history);

    //ここでfirestore読み出しをしてみる

    userData.values.data().createdAt = userData.values.data().createdAt.toDate;
    userData.values.data().updatedAt = userData.values.data().updatedAt.toDate;
    return {
        props: {
            userName: params.userName,
            // userData: userData.values.data(),
            userData: JSON.parse(JSON.stringify(userData.values.data())),
        },
    };
}

const UserNamePage = (props) => {
    console.log("◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆◆");
    console.log({ props });
    console.log(props.userData.createdAt);

    // timestamp形式のデータをいい感じの形式に変換する関数
    const convertFromTimestampToDatetime = (timestamp) => {
        const _d = timestamp ? new Date(timestamp * 1000) : new Date();
        const Y = _d.getFullYear();
        const m = (_d.getMonth() + 1).toString().padStart(2, "0");
        const d = _d.getDate().toString().padStart(2, "0");
        const H = _d.getHours().toString().padStart(2, "0");
        const i = _d.getMinutes().toString().padStart(2, "0");
        const s = _d.getSeconds().toString().padStart(2, "0");
        return `${Y}/${m}/${d} ${H}:${i}:${s}`;
    };

    if (!props.userName) {
        return null;
    }

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
                    <div>ここまで来た</div>

                    <h1>firebase読み出しテストページ</h1>
                    <p>URLに指定されたID: {props.userName}</p>
                    <p>
                        {props.userName}のuid: {props.userData.uid}
                    </p>
                    <p>
                        {props.userName}のuserName: {props.userData.userName}
                    </p>
                    <p>
                        {props.userName}のisPublic: {props.userData.isPublic}
                    </p>
                    <p>
                        {props.userName}のcreatedAt:{" "}
                        {convertFromTimestampToDatetime(
                            props.userData.createdAt.seconds
                        )}
                    </p>
                    <p>
                        {props.userName}のupdatedAt:{" "}
                        {convertFromTimestampToDatetime(
                            props.userData.updatedAt.seconds
                        )}
                    </p>
                </main>
            </div>
        </Layout>
    );

    // //firebase読み出し
    // const [values, loading, error1] = useDocumentData(
    //     firebase.firestore().doc(`users2/${props.userName}`),

    //     {
    //         idField: "id",
    //     }
    // );
    // //firebaseからの呼び出し結果判定
    // if (loading) {
    //     return (
    //         <Layout>
    //             <div>Loading...</div>
    //         </Layout>
    //     );
    // }
    // if (error1) {
    //     return (
    //         <Layout>
    //             <div>{`Error: ${error1.message}`}</div>;
    //         </Layout>
    //     );
    // }
    // console.log(values);
    // return (
    //     <Layout>
    //         <div className={styles.container}>
    //             <Head>
    //                 <title>手記書庫/ユーザページ</title>
    //                 <link rel="icon" href="/favicon.ico" />
    //             </Head>

    //             <main className={styles.main}>
    //                 <h1 className={styles.title}>Welcome to ユーザー ページ</h1>
    //                 <p> ユーザー: {props.userName}</p>

    //                 <h1>firebase読み出しテストページ</h1>
    //                 <p>URLに指定されたID: {props.userName}</p>
    //                 <p>
    //                     {props.userName}のid: {values.id}
    //                 </p>
    //                 <p>
    //                     {props.userName}のname: {values.name}
    //                 </p>
    //                 <p>
    //                     {props.userName}のhistory: {values.history}
    //                 </p>

    //                 <Link href={`/users/${props.userName}/bookCreate`}>
    //                     <a>手記作成</a>
    //                 </Link>
    //                 <Link href={`/users/${props.userName}/aiueo`}>
    //                     <a>手記あいうえお</a>
    //                 </Link>
    //                 <Link href={`/users/${props.userName}/kakikukeko`}>
    //                     <a>手記かきくけこ</a>
    //                 </Link>
    //                 <Link href={`/users/${props.userName}/sasisuseso`}>
    //                     <a>手記さしすせそ</a>
    //                 </Link>
    //             </main>

    //             <footer className={styles.footer}>
    //                 <a
    //                     href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                 >
    //                     Powered by{" "}
    //                     <img
    //                         src="/vercel.svg"
    //                         alt="Vercel Logo"
    //                         className={styles.logo}
    //                     />
    //                 </a>
    //             </footer>
    //         </div>
    //     </Layout>
    // );
};

export default UserNamePage;
