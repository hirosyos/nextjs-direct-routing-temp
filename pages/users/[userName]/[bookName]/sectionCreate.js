import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import styles from "styles/Home.module.scss";
import {
    getUserDataFromUserName,
    getBookDataFromBookName,
} from "common/common";
import SectionCreateInputForm from "components/Section";

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
export async function getStaticPaths() {
    //
    //デバッグ情報
    //
    console.log(
        "\nファイル /pages/users/[userName]/[bookName]/sectionCreate.js"
    );
    console.log("関数 getStaticPaths");

    const paths = [];

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    return { paths, fallback: true };
}

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params }
 * @return {*}
 */
export async function getStaticProps({ params }) {
    //
    //デバッグ情報
    //
    console.log(
        "\nファイル /pages/users/[userName]/[bookName]/sectionCreate.js"
    );
    console.log("関数 getStaticProps");
    console.log({ params });

    //ユーザ名からユーザデータを取得
    const { userData } = await getUserDataFromUserName(params.userName);

    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
    if (!userData) {
        console.log("関数：getStaticProps 該当ユーザ名のデータが見つからない");
        return {
            props: {
                userName: params.userName,
                userData: null,
                bookName: params.bookName,
                bookData: null,
                bookId: null,
            },
        };
    }

    //ブック名からブックデータを取得
    const { bookData } = await getBookDataFromBookName(
        params.userName,
        params.bookName
    );

    //該当ブック名のデータが存在しない場合はデータ部をNullで返す
    if (!bookData) {
        console.log("関数：getStaticProps 該当ブック名のデータが見つからない");
        return {
            props: {
                userName: params.userName,
                userData: userData,
                bookName: params.bookName,
                bookData: null,
                bookId: null,
            },
        };
    }

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    return {
        props: {
            userName: params.userName,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            userData: JSON.parse(JSON.stringify(userData)),

            bookName: params.bookName,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            bookData: JSON.parse(JSON.stringify(bookData)),

            bookId: bookData.bookId,
        },
    };
}

/**
 * セクション作成ページ
 *
 * @export
 * @param {*} props
 * @return {*}
 */
export default function SectionCreate(props) {
    //
    //デバッグ情報
    //
    console.log(
        "\nファイル /pages/users/[userName]/[bookName]/sectionCreate.js"
    );
    console.log("関数コンポーネント SectionCreate");
    console.log({ props });

    //
    //デバッグ情報
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
                    <h1 className={styles.title}>
                        Welcome to セクション 作成ページ
                    </h1>
                    <p> ユーザー: {props.userName}</p>
                    <p> 手記: {props.bookName}</p>

                    <SectionCreateInputForm
                        userData={props.userData}
                        bookData={props.bookData}
                        bookId={props.bookId}
                    />

                    <Link href={`/users/${props.userName}`}>
                        <a>ユーザページへ戻る</a>
                    </Link>
                    <Link href={`/users/${props.userName}/${props.bookName}`}>
                        <a>手記ページへ戻る</a>
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
