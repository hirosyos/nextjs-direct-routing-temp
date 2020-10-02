import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Home.module.scss";
import {
    getBookDataFromBookName,
    convertFromTimestampToDatetime,
    getAllBookNamePaths,
} from "../../../common/common";
import { useRouter } from "next/router";

/**
 * 静的パス取得
 *
 * @export
 * @return {Array} 静的パスを生成するための名称の配列
 */
export async function getStaticPaths() {
    //
    //デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/[bookName].js");
    console.log("関数 getStaticPaths");

    //すべてのユーザ名とブック名を含んだパス生成用配列を取得
    const paths = await getAllBookNamePaths();

    //
    //デバッグ情報
    //
    if (!paths) {
        paths.map((p) => {
            console.log(
                `SSG対象ユーザページ ${p.params.userName}/${p.params.bookName}`
            );
        });
    }

    //
    //デバッグ情報
    //
    console.log("正常終了 getStaticPaths\n");

    return { paths, fallback: true };
}

/**
 * 静的パラメータ取得
 *
 * @export
 * @param {*} { params.userName 'パスから切り出された値'}
 * @param {*} { params.bookName 'パスから切り出された値'}
 * @return {*}
 */
export async function getStaticProps({ params }) {
    //
    //デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/[bookName].js");
    console.log("関数 getStaticProps");
    console.log({ params });

    const { userName, bookName } = params;

    //ブック名からブックデータを取得
    const { bookData } = await getBookDataFromBookName(userName, bookName);
    //該当ブック名のデータが存在しない場合はデータ部をNullで返す
    if (!bookData) {
        console.log("関数 getStaticProps そんなブックありません");
        return {
            props: {
                userName: userName,
                bookName: bookName,
                bookData: null,
            },
        };
    }

    //
    //デバッグ情報
    //
    console.log("正常終了 getStaticProps\n");

    return {
        props: {
            userName: userName,
            bookName: bookName,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            bookData: JSON.parse(JSON.stringify(bookData)),
        },
    };
}
/**
 * 手記ページ
 *
 * @param {*} props.userName
 * @param {*} props.bookName
 * @param {*} props.bookData
 * @return {*}
 */
export default function BookNamePage(props) {
    //
    //デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/[bookName].js");
    console.log("関数 BookNamePage");
    console.log({ props });

    const { userName, bookName, bookData } = props;

    //事前ビルドされていない場合はここで作成する
    const router = useRouter();
    if (router.isFallback) {
        console.log(`${userName}/${bookName}静的ページ作成中...`);
        return <div>{`${userName}/${bookName}静的ページ作成中...`}</div>;
    }
    //ユーザネームがない段階では何もしない;
    if (!bookName) {
        //
        //デバッグ情報
        //
        console.log("異常終了 そんな手記はありません\n");

        return <div>そんな手記はありません...</div>;
    }

    if (!bookData) {
        //
        //デバッグ情報
        //
        console.log("異常終了 指定された手記は存在しません...\n");

        return <div>指定された手記は存在しません...</div>;
    }

    //
    //デバッグ情報
    //
    console.log("正常終了 BookNamePage\n");

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫/手記ページ</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1>手記 {bookName}</h1>

                    <table border="1">
                        <tbody>
                            <tr>
                                <th>firebase上の名前</th>
                                <th>具体的な名前</th>
                                <th>格納されている値</th>
                            </tr>
                            <tr>
                                <td>createdAt</td>
                                <td>手記ドキュメント作成日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        bookData.createdAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>updatedAt</td>
                                <td>手記ドキュメント更新日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        bookData.updatedAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>isPublic</td>
                                <td>ユーザ公開設定</td>
                                <td>{bookData.isPublic}</td>
                            </tr>
                            <tr>
                                <td>uid</td>
                                <td>ユーザドキュメントID</td>
                                <td>{bookData.uid}</td>
                            </tr>
                            <tr>
                                <td>userDocRef</td>
                                <td>ユーザドキュメントへのリファレンス</td>
                                <td>{bookData.userDocRef}</td>
                            </tr>
                            <tr>
                                <td>bookId</td>
                                <td>手記ドキュメントID</td>
                                <td>{bookData.bookId}</td>
                            </tr>
                            <tr>
                                <td>bookDocRef</td>
                                <td>手記ドキュメントへのリファレンス</td>
                                <td>{bookData.bookDocRef}</td>
                            </tr>
                            <tr>
                                <td>bookName</td>
                                <td>管理上の手記名</td>
                                <td>{bookData.bookName}</td>
                            </tr>
                            <tr>
                                <td>bookDisplayName</td>
                                <td>画面上に見せる手記名</td>
                                <td>{bookData.bookDisplayName}</td>
                            </tr>
                            <tr>
                                <td>authorBirthday</td>
                                <td>著者誕生日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        bookData.authorBirthday.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>authorNowAge</td>
                                <td>著者の現在の年齢</td>
                                <td>{bookData.authorNowAge}</td>
                            </tr>
                            <tr>
                                <td>bookIconImageUrl</td>
                                <td>手記アイコン画像URL</td>
                                <td>{bookData.bookIconImageUrl}</td>
                            </tr>
                            <tr>
                                <td>bookCoverImageUrl</td>
                                <td>手記カバー画像URL</td>
                                <td>{bookData.bookCoverImageUrl}</td>
                            </tr>
                            <tr>
                                <td>bookIntroduction</td>
                                <td>手記はじめに</td>
                                <td>{bookData.bookIntroduction}</td>
                            </tr>
                            <tr>
                                <td>bookFavoritedCount</td>
                                <td>手記がお気に入りに入れられている数</td>
                                <td>{bookData.bookFavoritedCount}</td>
                            </tr>
                            <tr>
                                <td>chapterName</td>
                                <td>時代名称</td>
                                <td>{bookData.chapterName}</td>
                            </tr>
                            <tr>
                                <td>chapterStartDate</td>
                                <td>時代の開始年月日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        bookData.chapterStartDate.seconds
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />

                    <h1>手記 {bookName} が持つセクション</h1>

                    <Link href={`/users/${userName}/bookSetting`}>
                        <a>手記設定 へ移動</a>
                    </Link>
                    <br />
                    <Link href={`/users/${userName}/${bookName}/sectionCreate`}>
                        <a>セクション作成 へ移動</a>
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
