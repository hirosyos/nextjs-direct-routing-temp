import Head from "next/head";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
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
import {
    getAllUserNames,
    getUserData,
    convertFromTimestampToDatetime,
} from "../../common/common";
import { UserCreateBooksList, UserLoginInfo } from "../../components/User";

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
    // const [myUid, setMyUid] = useState(null);
    let myUid;
    // ユーザネームがない段階では何もしない
    if (!props.userName) {
        return null;
    }

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
    // if (!user) {
    //     setMyUid(null);
    // }
    if (user) {
        console.log({ props });
        //ログインしていたら自分のuidを保存しておく
        // if (user.uid === props.userData.uid) {
        // setMyUid(user.uid);
        myUid = user.uid;
        // }
    }

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫/ユーザページ</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <UserLoginInfo myUid={myUid} />
                    <h1>{props.userName}の手記書庫</h1>
                    <p>ユーザ情報</p>
                    <table border="1">
                        <tbody>
                            <tr>
                                <th>firebase上の名前</th>
                                <th>具体的な名前</th>
                                <th>格納されている値</th>
                            </tr>
                            <tr>
                                <td>createdAt</td>
                                <td>ユーザドキュメント作成日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        props.userData.createdAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>updatedAt</td>
                                <td>ユーザドキュメント更新日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        props.userData.updatedAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>isPublic</td>
                                <td>ユーザ公開設定</td>
                                <td>{props.userData.isPublic}</td>
                            </tr>
                            <tr>
                                <td>uid</td>
                                <td>google認証から取得したユーザID</td>
                                <td>{props.userData.uid}</td>
                            </tr>
                            <tr>
                                <td>userName</td>
                                <td>管理上のユーザ名</td>
                                <td>{props.userData.userName}</td>
                            </tr>
                            <tr>
                                <td>userDisplayName</td>
                                <td>画面上に見せるユーザ名</td>
                                <td>{props.userData.userDisplayName}</td>
                            </tr>
                            <tr>
                                <td>userIconImageUrl</td>
                                <td>ユーザアイコン画像URL</td>
                                <td>{props.userData.userIconImageUrl}</td>
                            </tr>
                            <tr>
                                <td>userCoverImageUrl</td>
                                <td>ユーザカバー画像URL</td>
                                <td>{props.userData.userCoverImageUrl}</td>
                            </tr>
                            <tr>
                                <td>userIntroduction</td>
                                <td>ユーザ自己紹介文</td>
                                <td>{props.userData.userIntroduction}</td>
                            </tr>
                            <tr>
                                <td>pricePlan</td>
                                <td>料金プラン</td>
                                <td>{props.userData.pricePlan}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />

                    <p>{props.userName}が作成した手記</p>
                    <UserCreateBooksList userData={props.userData} />
                    <br />

                    <Link href={`/users/${props.userName}/bookCreate`}>
                        <a>新規手記作成</a>
                    </Link>
                    <br />
                    <Logout />
                </main>
            </div>
        </Layout>
    );
};

export default UserNamePage;
