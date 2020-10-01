import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Home.module.scss";
import {
    getBookData,
    convertFromTimestampToDatetime,
    getAllBookNamePaths,
} from "../../../common/common";
import { useRouter } from "next/router";

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
    //すべてのユーザ名とブック名を含んだパス生成用配列を取得
    const paths = await getAllBookNamePaths();

    //デバッグ表示
    paths.map((p) => {
        console.log(
            `SSGページ対象は ${p.params.userName}/${p.params.bookName}`
        );
    });
    return { paths, fallback: true };
}

/****************************************************************
 *
 * 静的パラメータ取得関数
 *
 * @params: { userName: 'パスから切り出された値' }
 * [out] ユーザネーム
 * [out] ブックネーム
 * [out] ブックドキュメント
 *
 ****************************************************************/
export async function getStaticProps({ params }) {
    console.log("getStaticProps");
    console.log({ params });
    //ブック名からブックデータを取得
    const bookData = await getBookData(params.userName, params.bookName);
    //該当ブック名のデータが存在しない場合はデータ部をNullで返す
    if (!bookData.bookData.exists) {
        console.log("そんなブックありません");
        return {
            props: {
                userName: params.userName,
                bookName: params.bookName,
                bookData: null,
            },
        };
    }

    return {
        props: {
            userName: params.userName,
            bookName: params.bookName,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            bookData: JSON.parse(JSON.stringify(bookData.bookData.data())),
        },
    };
}
/**
 * 手記ページを作成する
 *
 * @param {*} props.userName
 * @param {*} props.bookName
 * @param {*} props.bookData
 * @return {*}
 */
const BookNamePage = (props) => {
    console.log({ props });
    console.log(props.bookData);

    //事前ビルドされていない場合はここで作成する
    const router = useRouter();
    if (router.isFallback) {
        console.log(`${props.userName}/${props.bookName}静的ページ作成中...`);
        return (
            <div>{`${props.userName}/${props.bookName}静的ページ作成中...`}</div>
        );
    }
    //ユーザネームがない段階では何もしない;
    if (!props.bookName) {
        console.log("そんな手記はありません");
        return <div>そんなユーザいません...</div>;
        // return null;
    }

    if (!props.bookData) {
        console.log("指定された手記は存在しません...");
        return <div>指定された手記は存在しません...</div>;
    }

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫/手記ページ</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1>手記 {props.bookName}</h1>

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
                                        props.bookData.createdAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>updatedAt</td>
                                <td>手記ドキュメント更新日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        props.bookData.updatedAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>isPublic</td>
                                <td>ユーザ公開設定</td>
                                <td>{props.bookData.isPublic}</td>
                            </tr>
                            <tr>
                                <td>uid</td>
                                <td>ユーザドキュメントID</td>
                                <td>{props.bookData.uid}</td>
                            </tr>
                            <tr>
                                <td>userDocRef</td>
                                <td>ユーザドキュメントへのリファレンス</td>
                                <td>{props.bookData.userDocRef}</td>
                            </tr>
                            <tr>
                                <td>bookId</td>
                                <td>手記ドキュメントID</td>
                                <td>{props.bookData.bookId}</td>
                            </tr>
                            <tr>
                                <td>bookDocRef</td>
                                <td>手記ドキュメントへのリファレンス</td>
                                <td>{props.bookData.bookDocRef}</td>
                            </tr>
                            <tr>
                                <td>bookName</td>
                                <td>管理上の手記名</td>
                                <td>{props.bookData.bookName}</td>
                            </tr>
                            <tr>
                                <td>bookDisplayName</td>
                                <td>画面上に見せる手記名</td>
                                <td>{props.bookData.bookDisplayName}</td>
                            </tr>
                            <tr>
                                <td>authorBirthday</td>
                                <td>著者誕生日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        props.bookData.authorBirthday.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>authorNowAge</td>
                                <td>著者の現在の年齢</td>
                                <td>{props.bookData.authorNowAge}</td>
                            </tr>
                            <tr>
                                <td>bookIconImageUrl</td>
                                <td>手記アイコン画像URL</td>
                                <td>{props.bookData.bookIconImageUrl}</td>
                            </tr>
                            <tr>
                                <td>bookCoverImageUrl</td>
                                <td>手記カバー画像URL</td>
                                <td>{props.bookData.bookCoverImageUrl}</td>
                            </tr>
                            <tr>
                                <td>bookIntroduction</td>
                                <td>手記はじめに</td>
                                <td>{props.bookData.bookIntroduction}</td>
                            </tr>
                            <tr>
                                <td>bookFavoritedCount</td>
                                <td>手記がお気に入りに入れられている数</td>
                                <td>{props.bookData.bookFavoritedCount}</td>
                            </tr>
                            <tr>
                                <td>chapterName</td>
                                <td>時代名称</td>
                                <td>{props.bookData.chapterName}</td>
                            </tr>
                            <tr>
                                <td>chapterStartDate</td>
                                <td>時代の開始年月日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        props.bookData.chapterStartDate.seconds
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <br />

                    <h1>手記 {props.bookName} が持つセクション</h1>

                    <Link href={`/users/${props.userName}/bookSetting`}>
                        <a>手記設定 へ移動</a>
                    </Link>
                    <br />
                    <Link
                        href={`/users/${props.userName}/${props.bookName}/sectionCreate`}
                    >
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
};

export default BookNamePage;
