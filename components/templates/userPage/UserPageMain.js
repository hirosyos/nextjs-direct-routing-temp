import { useContext } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { convertFromTimestampToDatetime } from '@/common/common';

import Logout from '@/components/Logout';
import { UserLoginInfo } from '@/components/User';
import { BooksList } from '@/components/BookList';
import { SectionList } from '@/components/SectionList';

import { AuthContext } from 'pages/_app';
import styles from 'styles/Home.module.scss';

/**
 * ユーザページメイン
 *
 * @param {*} {
 *   userName,
 *   userData,
 *   bookDataList,
 *   sectionDataList,
 * }
 * @return {*}
 */
const UserPageMain = ({
  userName,
  userData,
  bookDataList,
  sectionDataList,
}) => {
  // 事前ビルドされていない場合はここで作成する
  const router = useRouter();
  if (router.isFallback) {
    console.log(`${userName}静的ページ作成中...`);
    return <div>{`${userName}静的ページ作成中...`}</div>;
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

  //認証情報取得
  const { user } = useContext(AuthContext);
  console.log({ user });

  return (
    <>
      <main className={styles.main}>
        <UserLoginInfo myUid={user?.uid} />
        <h1>
          {userName}
          の手記書庫
        </h1>
        <p>ユーザ情報</p>
        <table border="1">
          <tbody>
            <tr>
              <th>firebase上の名前</th>
              <th>具体的な名前</th>
              <th>格納されている値</th>
            </tr>
            <tr>
              <td>createdAt</td>
              <td>ユーザドキュメント作成日</td>
              <td>
                {convertFromTimestampToDatetime(userData.createdAt.seconds)}
              </td>
            </tr>
            <tr>
              <td>updatedAt</td>
              <td>ユーザドキュメント更新日</td>
              <td>
                {convertFromTimestampToDatetime(userData.updatedAt.seconds)}
              </td>
            </tr>
            <tr>
              <td>isPublic</td>
              <td>ユーザ公開設定</td>
              <td>{userData.isPublic}</td>
            </tr>
            <tr>
              <td>uid</td>
              <td>google認証から取得したユーザID</td>
              <td>{userData.uid}</td>
            </tr>
            <tr>
              <td>userName</td>
              <td>管理上のユーザ名</td>
              <td>{userData.userName}</td>
            </tr>
            <tr>
              <td>userDisplayName</td>
              <td>画面上に見せるユーザ名</td>
              <td>{userData.userDisplayName}</td>
            </tr>
            <tr>
              <td>userIconImageUrl</td>
              <td>ユーザアイコン画像URL</td>
              <td>{userData.userIconImageUrl}</td>
            </tr>
            <tr>
              <td>userCoverImageUrl</td>
              <td>ユーザカバー画像URL</td>
              <td>{userData.userCoverImageUrl}</td>
            </tr>
            <tr>
              <td>userIntroduction</td>
              <td>ユーザ自己紹介文</td>
              <td>{userData.userIntroduction}</td>
            </tr>
            <tr>
              <td>pricePlan</td>
              <td>料金プラン</td>
              <td>{userData.pricePlan}</td>
            </tr>
          </tbody>
        </table>
        <br />

        <p>
          {userName}
          が作成した手記
        </p>
        <BooksList bookDataList={bookDataList} />
        <br />
        <p>
          {userName}
          が作成したセクション
        </p>
        <SectionList sectionDataList={sectionDataList} />
        <br />

        <Link href={`/users/${userName}/bookCreate`}>
          <a>新規手記作成</a>
        </Link>
        <br />
        <Logout />
      </main>
    </>
  );
};

export default UserPageMain;
