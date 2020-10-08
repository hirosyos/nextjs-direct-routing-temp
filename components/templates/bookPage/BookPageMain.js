import Link from 'next/link';
import { useRouter } from 'next/router';

import { convertFromTimestampToDatetime } from '@/common/common';

import AppMain from '@/components/organisms/AppMain';
import { SectionList } from '@/components/SectionList';

import styles from 'styles/Home.module.scss';
/**
 * ブックページメイン
 *
 * @param {*} {
 *   userName,
 *   userData,
 *   bookName,
 *   bookData,
 *   sectionDataList,
 * }
 * @return {*}
 */
const BookPageMain = ({
  userName,
  userData,
  bookName,
  bookData,
  sectionDataList,
}) => {
  // 事前ビルドされていない場合はここで作成する
  const router = useRouter();
  if (router.isFallback) {
    console.log(`${userName}/${bookName}静的ページ作成中...`);
    return <div>{`${userName}/${bookName}静的ページ作成中...`}</div>;
  }

  // ユーザネームがない段階では何もしない;
  if (!userName) {
    //
    // デバッグ情報
    //
    console.log('異常終了 そんなユーザいません\n');
    return <div>そんなユーザいません...</div>;
  }

  if (!userData) {
    //
    // デバッグ情報
    //
    console.log('異常終了 指定されたユーザは存在しません...\n');
    return <div>指定されたユーザは存在しません...</div>;
  }

  // ユーザネームがない段階では何もしない;
  if (!bookName) {
    //
    // デバッグ情報
    //
    console.log('異常終了 そんな手記はありません\n');

    return <div>そんな手記はありません...</div>;
  }

  if (!bookData) {
    //
    // デバッグ情報
    //
    console.log('異常終了 指定された手記は存在しません...\n');

    return <div>指定された手記は存在しません...</div>;
  }

  return (
    <>
      {/* <h1>てすと</h1> */}
      <AppMain />

      <main className={styles.main}>
        <h1>
          手記
          {bookName}
        </h1>

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
                {convertFromTimestampToDatetime(bookData.createdAt.seconds)}
              </td>
            </tr>
            <tr>
              <td>updatedAt</td>
              <td>手記ドキュメント更新日</td>
              <td>
                {convertFromTimestampToDatetime(bookData.updatedAt.seconds)}
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
                  bookData.authorBirthday.seconds,
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
                  bookData.chapterStartDate.seconds,
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <h1>手記{bookName} が持つセクション</h1>
        <SectionList sectionDataList={sectionDataList} />

        <Link href={`/users/${userData.userName}/bookSetting`}>
          <a>手記設定 へ移動</a>
        </Link>
        <br />
        <Link
          href={`/users/${userData.userName}/${bookData.bookName}/sectionCreate`}
        >
          <a>セクション作成 へ移動</a>
        </Link>
      </main>
    </>
  );
};

export default BookPageMain;
