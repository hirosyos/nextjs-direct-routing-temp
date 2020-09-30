import Head from "next/head";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import styles from "../../../../styles/Home.module.scss";
import { getUserData, getBookData } from "../../../../common/common";
import SectionCreateInputForm from "../../../../components/Section";

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
    // const paths = ["/post/1", "/post/2"];
    const paths = [];
    return { paths, fallback: true };
}

//****************************************************************
//
// 静的パラメータ取得関数
//
// [IN]params: { userName: 'パスから切り出されたユーザネーム' }
// [IN]params: { bookName: 'パスから切り出されたブックネーム' }
// [out] ユーザネーム
// [out] ユーザドキュメント
// [out] ブックネーム
// [out] ブックドキュメント
//
//****************************************************************
export async function getStaticProps({ params }) {
    console.log({ params });
    //ユーザ名からユーザデータを取得
    const userData = await getUserData(params.userName);
    //ブック名からユーザデータを取得
    const bookData = await getBookData(params.userName, params.bookName);
    return {
        props: {
            userName: params.userName,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            userData: JSON.parse(JSON.stringify(userData.values.data())),

            bookName: params.bookName,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            bookData: JSON.parse(JSON.stringify(bookData.bookData.data())),

            bookId: bookData.bookId,
        },
    };
}

//****************************************************************
//
// セクション作成ページ 関数コンポーネント
//
// [IN]props.userName ユーザネーム
// [IN]props.userData ユーザデータ
// [IN]props.bookName ブックネーム
// [IN]props.bookData ブックデータ
// [IN]props.bookId ブックID
// [OUT] セクション作成ページ全体
//
//****************************************************************
const SectionCreate = (props) => {
    console.log("SectionCreate props");
    console.log({ props });

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
};

export default SectionCreate;
