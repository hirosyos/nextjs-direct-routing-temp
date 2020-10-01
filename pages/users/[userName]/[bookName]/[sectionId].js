import Head from "next/head";
import Link from "next/link";
import Layout from "../../../../components/Layout";
import styles from "../../../../styles/Home.module.scss";
import {
    getBookData,
    convertFromTimestampToDatetime,
    getAllSectionIdPaths,
    getSectionData,
} from "../../../../common/common";
import { useRouter } from "next/router";

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
export async function getStaticPaths() {
    //すべてのユーザ名とブック名とセクションIDを含んだパス生成用配列を取得
    const paths = await getAllSectionIdPaths();

    //デバッグ表示
    paths.map((p) => {
        console.log(
            `SSGページ対象は ${p.params.userName}/${p.params.bookName}/${p.params.sectionId}`
        );
    });

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
    console.log("getStaticProps");
    console.log({ params });

    //セクションIDからセクションデータを取得
    const sectionData = await getSectionData(
        params.userName,
        params.bookName,
        params.sectionId
    );
    //該当セクションIDのデータが存在しない場合はデータ部をNullで返す
    if (!sectionData.sectionData.exists) {
        console.log("getStaticProps");
        console.log("そんなセクションはありません");
        return {
            props: {
                userName: params.userName,
                bookName: params.bookName,
                sectionId: params.sectionId,
                sectionData: null,
            },
        };
    }
    return {
        props: {
            userName: params.userName,
            bookName: params.bookName,
            sectionId: params.sectionId,
            //Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            sectionData: JSON.parse(
                JSON.stringify(sectionData.sectionData.data())
            ),
        },
    };
}
/**
 * セクションIDからページを作成する
 *
 * @param {*} props
 * @return {*}
 */

const SectionIdPage = (props) => {
    console.log("SectionIdPage");
    console.log({ props });

    //事前ビルドされていない場合はここで作成する
    const router = useRouter();
    if (router.isFallback) {
        console.log(
            `${props.userName}/${props.bookName}/${props.sectionId}静的ページ作成中...`
        );
        return (
            <div>{`${props.userName}/${props.bookName}/${props.sectionId}静的ページ作成中...`}</div>
        );
    }
    //ユーザネームがない段階では何もしない;
    if (!props.sectionId) {
        console.log("そんなセクションはありません");
        return <div>そんなセクションはありません...</div>;
        // return null;
    }

    if (!props.sectionData) {
        console.log("指定されたセクションは存在しません...");
        return <div>指定されたセクションは存在しません...</div>;
    }

    return (
        <Layout>
            <div className={styles.container}>
                <Head>
                    <title>手記書庫</title>
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main className={styles.main}>
                    <h1>セクション {props.sectionId} ページ</h1>

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
                                        props.sectionData.createdAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>updatedAt</td>
                                <td>手記ドキュメント更新日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        props.sectionData.updatedAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>isPublic</td>
                                <td>ユーザ公開設定</td>
                                <td>{props.sectionData.isPublic}</td>
                            </tr>
                            <tr>
                                <td>uid</td>
                                <td>ユーザドキュメントID</td>
                                <td>{props.sectionData.uid}</td>
                            </tr>
                            <tr>
                                <td>userName</td>
                                <td>管理上のユーザ名</td>
                                <td>{props.sectionData.userName}</td>
                            </tr>
                            <tr>
                                <td>bookId</td>
                                <td>手記ドキュメントID</td>
                                <td>{props.sectionData.bookId}</td>
                            </tr>
                            <tr>
                                <td>bookDocRef</td>
                                <td>手記ドキュメントへのリファレンス</td>
                                <td>{props.sectionData.bookDocRef}</td>
                            </tr>
                            <tr>
                                <td>bookName</td>
                                <td>管理上の手記名</td>
                                <td>{props.sectionData.bookName}</td>
                            </tr>
                            <tr>
                                <td>sectionId</td>
                                <td>セクションドキュメントID</td>
                                <td>{props.sectionData.sectionId}</td>
                            </tr>
                            <tr>
                                <td>date</td>
                                <td>セクションが起きた日付</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        props.sectionData.date.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>title</td>
                                <td>セクションのタイトル</td>
                                <td>{props.sectionData.title}</td>
                            </tr>
                            <tr>
                                <td>contents</td>
                                <td>セクションの内容</td>
                                <td>{props.sectionData.contents}</td>
                            </tr>
                            <tr>
                                <td>bookCoverImageUrl</td>
                                <td>手記カバー画像URL</td>
                                <td>{props.sectionData.bookCoverImageUrl}</td>
                            </tr>
                            <tr>
                                <td>tag</td>
                                <td>セクションを分類するタグ</td>
                                <td>{props.sectionData.tag}</td>
                            </tr>
                            <tr>
                                <td>bookFavoritedCount</td>
                                <td>手記がお気に入りに入れられている数</td>
                                <td>{props.sectionData.bookFavoritedCount}</td>
                            </tr>
                            <tr>
                                <td>url</td>
                                <td>関連URL</td>
                                <td>{props.sectionData.url}</td>
                            </tr>
                            <tr>
                                <td>emo</td>
                                <td>感情</td>
                                <td>{props.sectionData.emo}</td>
                            </tr>
                            <tr>
                                <td>quoteRef</td>
                                <td>引用した元セクション</td>
                                <td>{props.sectionData.quoteRef}</td>
                            </tr>
                            <tr>
                                <td>quotedRef</td>
                                <td>引用された先ページ</td>
                                <td>{props.sectionData.quotedRef}</td>
                            </tr>
                            <tr>
                                <td>quotedCount</td>
                                <td>引用された数</td>
                                <td>{props.sectionData.quotedCount}</td>
                            </tr>
                        </tbody>
                    </table>

                    <Link href={`/users/${props.userName}`}>
                        <a>ユーザページ</a>
                    </Link>
                    <Link href={`/users/${props.userName}/${props.bookName}`}>
                        <a>手記ページ</a>
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

export default SectionIdPage;
