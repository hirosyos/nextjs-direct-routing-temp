import Head from "next/head";
import Link from "next/link";
import Logout from "../../components/Logout";
import Layout from "../../components/Layout";
import styles from "../../styles/Home.module.scss";
import {
    useCollectionData,
    useCollection,
    useDocumentData,
    useDocument,
} from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "../../common/firebase";

const VALIDUSERS = "validUsers";

//****************************************************************
//
// 全ユーザネーム取得関数
//
// [in] なし
// [OUT]静的パスを生成するための名称の配列
// [out] ユーザドキュメント
//
//****************************************************************
async function getAllUserNames() {
    //有効ユーザコレクションを取り出し
    const values = await firebase.firestore().collection(VALIDUSERS).get();

    // Next.jsの仕様でこのような配列を返さないとだめ
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

    //有効ユーザコレクションのすべてのユーザドキュメントからユーザネーム取り出し
    return values.docs.map((value) => {
        return {
            params: {
                userName: value.data().userName,
            },
        };
    });
}

//****************************************************************
//
// ユーザドキュメント情報取得関数
//
// [in] ユーザネーム
// [out] ユーザネーム
// [out] ユーザドキュメント
//
//****************************************************************
async function getUserData(userName) {
    //有効ユーザコレクションのユーザドキュメントからユーザネームが一致するものを取得
    const tmpDoc = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .where("userName", "==", userName)
        .get();

    //ユーザドキュメントからuidを取得
    const pagename = tmpDoc.docs.map((x) => {
        return {
            uid: x.data().uid,
        };
    });

    //uidからユーザドキュメントを取得
    //2度手間してそうだけどとりあえずこのままで
    const values = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(pagename[0].uid)
        .get();

    return {
        userName,
        values,
    };
}

//****************************************************************
//
// 静的パス取得関数
//
// [IN]なし
// [OUT]静的パスを生成するための名称の配列
// [OUT]fallback設定
//
//****************************************************************
export async function getStaticPaths() {
    //すべてのユーザ名を含んだパス生成用配列を取得
    const paths = await getAllUserNames();

    //デバッグ表示
    paths.map((p) => {
        console.log(`SSGページ対象は ${p.params.userName}`);
    });

    return { paths, fallback: true };
}

//****************************************************************
//
// 静的パラメータ取得関数
//
// [IN]params: { userName: 'パスから切り出された値' }
// [out] ユーザネーム
// [out] ユーザドキュメント
//
//****************************************************************
export async function getStaticProps({ params }) {
    //ユーザ名からユーザデータを取得
    const userData = await getUserData(params.userName);

    return {
        props: {
            userName: params.userName,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            userData: JSON.parse(JSON.stringify(userData.values.data())),
        },
    };
}

//****************************************************************
//
// ユーザページ構成関数コンポーネント
//
// [IN]props.userName ユーザネーム
// [IN]props.userData ユーザデータ
// [OUT] ユーザページ
//
//****************************************************************
const UserNamePage = (props) => {
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

    // ユーザネームがない段階では何もしない
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
                    <Logout />
                </main>
            </div>
        </Layout>
    );
};

export default UserNamePage;
