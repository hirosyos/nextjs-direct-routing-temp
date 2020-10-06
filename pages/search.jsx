import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import styles from "styles/Home.module.scss";

/**
 * 検索ページ
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function Search(props) {
    //
    // デバッグ情報
    //
    console.log("\nファイル /pages/serch.js");
    console.log("関数 Serch");
    console.log({ props });

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
                    <h1 className={styles.title}>Welcome to 検索ページ</h1>

                    <Link href={`/`}>
                        <a>トップページ</a>
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
