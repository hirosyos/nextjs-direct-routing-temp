import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import styles from "styles/Home.module.scss";
import { BookCreateInputForm } from "components/Book";
import { getUserDataFromUserName } from "common/common";

/**
 * 静的パス取得関数
 *
 * @export
 * @return {*}
 */
export async function getStaticPaths() {
    //
    // デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/bookCreate.js");
    console.log("関数 getStaticPaths");

    const paths = [];

    //
    // デバッグ情報
    //
    console.log("正常終了\n");

    return { paths, fallback: true };
}

/**
 * 静的パラメータ取得関数
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
export async function getStaticProps({ params }) {
    //
    // デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/bookCreate.js");
    console.log("関数 getStaticProps");
    console.log({ params });

    // ユーザ名からユーザデータを取得
    const { userData } = await getUserDataFromUserName(params.userName);

    // 該当ユーザ名のデータが存在しない場合はデータ部をNullで返す;
    if (!userData) {
        //
        // デバッグ情報
        //
        console.log("異常終了 該当ユーザ名のデータが存在しない");
        return {
            props: {
                userName: params.userName,
                userData: null,
            },
        };
    }

    //
    // デバッグ情報
    //
    console.log("正常終了\n");

    return {
        props: {
            userName: params.userName,
            // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            userData: JSON.parse(JSON.stringify(userData)),
        },
    };
}

/**
 * 手記ページ構成関数コンポーネント
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function BookCreatePage(props) {
    //
    // デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/bookCreate.js");
    console.log("関数 BookCreatePage");
    console.log({ props });
    const { userName, userData } = props;

    //
    // デバッグ情報
    //
    console.log("正常終了\n");

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>Welcome to 手記作成 ページ</h1>

                    <p> ユーザー: {userName}</p>

                    <BookCreateInputForm userData={userData} />

                    <Link href={`/users/${userName}`}>
                        <a>ユーザページへ戻る</a>
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
}
