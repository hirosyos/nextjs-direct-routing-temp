import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "components/Layout";
import styles from "styles/Home.module.scss";
import {
    convertFromTimestampToDatetime,
    getAllSectionIdPaths,
    getSectionDataFromSectionId,
} from "common/common";
import { useRouter } from "next/router";

/**
 * 静的パス取得
 *
 * @export
 * @return {*}
 */
export async function getStaticPaths() {
    //
    // デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/[bookName]/[sectionId].js");
    console.log("関数コンポーネント getStaticPaths");

    // すべてのユーザ名とブック名とセクションIDを含んだパス生成用配列を取得
    const paths = await getAllSectionIdPaths();

    //
    // デバッグ情報
    //
    if (paths) {
        paths.map((p) => {
            console.log(
                `SSG対象セクションページ ${p.params.userName}/${p.params.bookName}/${p.params.sectionId}`
            );
        });
    }
    //
    // デバッグ情報
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
    // デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/[bookName]/[sectionId].js");
    console.log("関数コンポーネント getStaticProps");
    console.log({ params });

    const { userName, bookName, sectionId } = params;

    // セクションIDからセクションデータを取得
    const { sectionData } = await getSectionDataFromSectionId(
        userName,
        bookName,
        sectionId
    );
    // 該当セクションIDのデータが存在しない場合はデータ部をNullで返す
    if (!sectionData) {
        console.log("そんなセクションはありません\n");
        return {
            props: {
                userName: userName,
                bookName: bookName,
                sectionId: sectionId,
                sectionData: null,
            },
        };
    }

    //
    // デバッグ情報
    //
    console.log("正常終了\n");

    return {
        props: {
            userName: userName,
            bookName: bookName,
            sectionId: sectionId,
            // Next.jsはDate型を返してほしくないようなのでこのような対処をしている
            sectionData: JSON.parse(JSON.stringify(sectionData)),
        },
    };
}

/**
 * セクションIDからページを作成する
 *
 * @export
 * @param {*} {
 *     userName,
 *     bookName,
 *     sectionId,
 *     sectionData,
 * }
 * @return {*}
 */
export default function SectionIdPage({
    userName,
    bookName,
    sectionId,
    sectionData,
}) {
    //
    // デバッグ情報
    //
    console.log("\nファイル /pages/users/[userName]/[bookName]/[sectionId].js");
    console.log("関数コンポーネント SectionIdPage");
    console.log({ userName, bookName, sectionId, sectionData });

    // 事前ビルドされていない場合はここで作成する
    const router = useRouter();
    if (router.isFallback) {
        console.log(`${userName}/${bookName}/${sectionId}静的ページ作成中...`);
        return (
            <div>{`${userName}/${bookName}/${sectionId}静的ページ作成中...`}</div>
        );
    }
    // ユーザネームがない段階では何もしない;
    if (!sectionId) {
        console.log("異常終了 そんなセクションはありません\n");
        return <div>そんなセクションはありません...</div>;
    }

    if (!sectionData) {
        console.log("異常終了 指定されたセクションは存在しません...\n");
        return <div>指定されたセクションは存在しません...</div>;
    }

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
                    <h1>セクション {sectionId} ページ</h1>

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
                                        sectionData.createdAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>updatedAt</td>
                                <td>手記ドキュメント更新日</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        sectionData.updatedAt.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>isPublic</td>
                                <td>ユーザ公開設定</td>
                                <td>{sectionData.isPublic}</td>
                            </tr>
                            <tr>
                                <td>uid</td>
                                <td>ユーザドキュメントID</td>
                                <td>{sectionData.uid}</td>
                            </tr>
                            <tr>
                                <td>userName</td>
                                <td>管理上のユーザ名</td>
                                <td>{sectionData.userName}</td>
                            </tr>
                            <tr>
                                <td>bookId</td>
                                <td>手記ドキュメントID</td>
                                <td>{sectionData.bookId}</td>
                            </tr>
                            <tr>
                                <td>bookDocRef</td>
                                <td>手記ドキュメントへのリファレンス</td>
                                <td>{sectionData.bookDocRef}</td>
                            </tr>
                            <tr>
                                <td>bookName</td>
                                <td>管理上の手記名</td>
                                <td>{sectionData.bookName}</td>
                            </tr>
                            <tr>
                                <td>sectionId</td>
                                <td>セクションドキュメントID</td>
                                <td>{sectionData.sectionId}</td>
                            </tr>
                            <tr>
                                <td>date</td>
                                <td>セクションが起きた日付</td>
                                <td>
                                    {convertFromTimestampToDatetime(
                                        sectionData.date.seconds
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td>title</td>
                                <td>セクションのタイトル</td>
                                <td>{sectionData.title}</td>
                            </tr>
                            <tr>
                                <td>contents</td>
                                <td>セクションの内容</td>
                                <td>{sectionData.contents}</td>
                            </tr>
                            <tr>
                                <td>bookCoverImageUrl</td>
                                <td>手記カバー画像URL</td>
                                <td>{sectionData.bookCoverImageUrl}</td>
                            </tr>
                            <tr>
                                <td>tag</td>
                                <td>セクションを分類するタグ</td>
                                <td>{sectionData.tag}</td>
                            </tr>
                            <tr>
                                <td>bookFavoritedCount</td>
                                <td>手記がお気に入りに入れられている数</td>
                                <td>{sectionData.bookFavoritedCount}</td>
                            </tr>
                            <tr>
                                <td>url</td>
                                <td>関連URL</td>
                                <td>{sectionData.url}</td>
                            </tr>
                            <tr>
                                <td>emo</td>
                                <td>感情</td>
                                <td>{sectionData.emo}</td>
                            </tr>
                            <tr>
                                <td>quoteRef</td>
                                <td>引用した元セクション</td>
                                <td>{sectionData.quoteRef}</td>
                            </tr>
                            <tr>
                                <td>quotedRef</td>
                                <td>引用された先ページ</td>
                                <td>{sectionData.quotedRef}</td>
                            </tr>
                            <tr>
                                <td>quotedCount</td>
                                <td>引用された数</td>
                                <td>{sectionData.quotedCount}</td>
                            </tr>
                        </tbody>
                    </table>

                    <Link href={`/users/${userName}`}>
                        <a>ユーザページ</a>
                    </Link>
                    <Link href={`/users/${userName}/${bookName}`}>
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
}
