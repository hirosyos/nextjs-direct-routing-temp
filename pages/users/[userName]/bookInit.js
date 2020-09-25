import Head from "next/head";
import Link from "next/link";
import styles from "../../../styles/Home.module.css";

// 最初に実行される。事前ビルドするパスを配列でreturnする。
export async function getStaticPaths() {
    // const paths = ["/post/1", "/post/2"];
    const paths = [];
    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    console.log({ params });
    return {
        props: {
            userName: params.userName,
        },
    };
}

const BookInit = (props) => {
    return (
        <div className={styles.container}>
            <Head>
                <title>手記書庫</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Welcome to 手記初期設定</h1>

                <p> ユーザー: {props.userName}</p>

                <Link href={`/users/${props.userName}`}>
                    <a>ユーザページ</a>
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
export default BookInit;
