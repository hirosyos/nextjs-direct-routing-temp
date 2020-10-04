import Head from "next/head";
import Link from "next/link";
import { useState, useRef, useEffect, useContext } from "react";
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
    getBookDataListFromUserData,
    getSectionDataListFromUserData,
} from "../../common/common";
import { UserLoginInfo } from "../../components/User";
import { BooksList } from "../../components/BookList";
import { CurrentUser } from "../../components/Auth";
import { AuthContext } from "../_app";
import { SectionList } from "../../components/SectionList";

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
// export async function getStaticPaths() {
export const getStaticPaths = async () => {
    //
    //デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName].js");
    console.log("関数 getStaticPaths");

    //すべてのユーザ名を含んだパス生成用配列を取得
    const paths = await getAllUserNamesPaths();

    //
    //デバッグ情報
    //
    if (paths) {
        paths.map((p) => {
            console.log(`SSG対象ユーザページ ${p.params.userName}`);
        });
    }

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    return { paths, fallback: true };
};

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
// export async function getStaticProps({ params }) {
export const getStaticProps = async ({ params }) => {
    //
    //デバッグ情報
    //
    console.log("\nファイル /pages/users/userName].js");
    console.log("関数 getStaticProps");
    console.log({ params });

    //パスから切り出された値が入っている
    const { userName } = params;
    //ユーザ名からユーザデータを取得
    const { userData } = await getUserDataFromUserName(userName);

    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す;
    if (!userData) {
        //
        //デバッグ情報
        //
        console.log("異常終了 該当ユーザ名のデータが存在しない\n");
        return {
            props: {
                userName: userName,
                userData: null,
            },
        };
    }

    //ユーザデータ配下のブックデータリストを取得
    const bookDataList = await getBookDataListFromUserData(userData);
    //セクションが一つでもある場合(なくても異常ではない)
    if (bookDataList) {
    }

    //ユーザデータ配下のセクションデータリストを取得
    const sectionDataList = await getSectionDataListFromUserData(userData);
    //セクションが一つでもある場合(なくても異常ではない)
    if (sectionDataList) {
    }

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    return {
        props: {
            userName: userName,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            userData: JSON.parse(JSON.stringify(userData)),
            bookDataList: JSON.parse(JSON.stringify(bookDataList)),
            sectionDataList: JSON.parse(JSON.stringify(sectionDataList)),
        },
    };
};

/**
 * ユーザページ
 *
 * @param {string} userName ユーザネーム
 * @param {object} userData ユーザデータ
 * @return {JSX}
 */
export default function UserNamePage({
    userName,
    userData,
    bookDataList,
    sectionDataList,
}) {
    //デバッグ情報
    console.log("\nファイル /pages/users/[userName].js");
    console.log("関数 UserNamePage");
    console.log({ userName, userData, bookDataList, sectionDataList });

    let myUid;

    //事前ビルドされていない場合はここで作成する
    const router = useRouter();
    if (router.isFallback) {
        console.log(`${userName}静的ページ作成中...`);
        return <div>{`${userName}静的ページ作成中...`}</div>;
    }

    //ユーザネームがない段階では何もしない;
    if (!userName) {
        //
        //デバッグ情報
        //
        console.log("異常終了 そんなユーザいません\n");
        return <div>そんなユーザいません...</div>;
    }

    if (!userData) {
        //
        //デバッグ情報
        //
        console.log("異常終了 指定されたユーザは存在しません...\n");
        return <div>指定されたユーザは存在しません...</div>;
    }

    const user = useContext(AuthContext).user;
    console.log({ user });

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫/ユーザページ</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <UserLoginInfo myUid={user.uid} />
                    {/* <CurrentUser /> */}
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
                    <BooksList bookDataList={bookDataList} />
                    <br />
                    <p>{userName}が作成したセクション</p>
                    <SectionList sectionDataList={sectionDataList} />
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
