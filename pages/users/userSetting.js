import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Home.module.css";

const UserSetting = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>手記書庫</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to ユーザ設定</h1>
                <Link href="/users/hoge/bookInit">
                    <a>手記初期設定</a>
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
    );
};
export default UserSetting;
