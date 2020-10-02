import Head from "next/head";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
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
    getAllUserNamesPaths,
    getUserDataFromUserName,
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
    const paths = await getAllUserNamesPaths();

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
    console.log("\n関数：getStaticProps：起動");
    //パスから切り出された値が入っている
    const { userName } = params;
    //ユーザ名からユーザデータを取得
    const { userData } = await getUserDataFromUserName(userName);

    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す;
    if (!userData) {
        console.log("関数：getStaticProps：該当ユーザ名のデータが存在しない");
        return {
            props: {
                userName: userName,
                userData: null,
            },
        };
    }
    return {
        props: {
            userName: userName,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            userData: JSON.parse(JSON.stringify(userData)),
        },
    };
}

/**
 * ユーザページ構成
 *
 * @param {string} props.userName ユーザネーム
 * @param {object} props.userData ユーザデータ
 * @return {JSX}
 */
export default function UserNamePage(props) {
    console.log("\n関数：UserNamePage：起動");
    const { userName, userData } = props;
    // const [myUid, setMyUid] = useState(null);
    console.log("userName");
    console.log(userName);
    console.log("userData");
    console.log(userData);

    let myUid;

    //事前ビルドされていない場合はここで作成する
    const router = useRouter();
    if (router.isFallback) {
        console.log(`${userName}静的ページ作成中...`);
        return <div>{`${userName}静的ページ作成中...`}</div>;
    }

    //ユーザネームがない段階では何もしない;
    if (!props.userName) {
        console.log("そんなユーザいません");
        return <div>そんなユーザいません...</div>;
    }

    if (!props.userData) {
        console.log("指定されたユーザは存在しません...");
        return <div>指定されたユーザは存在しません...</div>;
    }

    const [user, initialising, error] = useAuthState(firebase.auth());
    if (initialising) {
        return (
            <Layout>
                <div>認証確認中...</div>
            </Layout>
        );
    }
    if (error) {
        return (
            <Layout>
                <div>認証確認エラー: {error}</div>
            </Layout>
        );
    }
    // if (!user) {
    //     setMyUid(null);
    // }
    if (user) {
        console.log({ props });
        //ログインしていたら自分のuidを保存しておく
        // if (user.uid === userData.uid) {
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
                    <h1>{userName}の手記書庫</h1>
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
                                        userData.createdAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>updatedAt</td>
                                <td>ユーザドキュメント更新日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        userData.updatedAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>isPublic</td>
                                <td>ユーザ公開設定</td>
                                <td>{userData.isPublic}</td>
                            </tr>
                            <tr>
                                <td>uid</td>
                                <td>google認証から取得したユーザID</td>
                                <td>{userData.uid}</td>
                            </tr>
                            <tr>
                                <td>userName</td>
                                <td>管理上のユーザ名</td>
                                <td>{userData.userName}</td>
                            </tr>
                            <tr>
                                <td>userDisplayName</td>
                                <td>画面上に見せるユーザ名</td>
                                <td>{userData.userDisplayName}</td>
                            </tr>
                            <tr>
                                <td>userIconImageUrl</td>
                                <td>ユーザアイコン画像URL</td>
                                <td>{userData.userIconImageUrl}</td>
                            </tr>
                            <tr>
                                <td>userCoverImageUrl</td>
                                <td>ユーザカバー画像URL</td>
                                <td>{userData.userCoverImageUrl}</td>
                            </tr>
                            <tr>
                                <td>userIntroduction</td>
                                <td>ユーザ自己紹介文</td>
                                <td>{userData.userIntroduction}</td>
                            </tr>
                            <tr>
                                <td>pricePlan</td>
                                <td>料金プラン</td>
                                <td>{userData.pricePlan}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br />

                    <p>{userName}が作成した手記</p>
                    <UserCreateBooksList userData={userData} />
                    <br />

                    <Link href={`/users/${userName}/bookCreate`}>
                        <a>新規手記作成</a>
                    </Link>
                    <br />
                    <Logout />
                </main>
            </div>
        </Layout>
    );
}
