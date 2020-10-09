import Link from 'next/link';
import { convertFromTimestampToDatetime } from 'common/common';
import UserCard from 'components/molecules/UserCard';

/**
 * ユーザが作成した手記リスト
 *
 * @param {*} userDataList
 * @return {*}
 */
export const UserList = ({ userDataList }) => {
  //
  // デバッグ情報
  //
  console.log('関数 UserList');
  console.log({ userDataList });

  //
  // デバッグ情報
  //
  console.log('正常終了 BooksList\n');

  return (
    <>
      {/* <table border="1">
        <tbody>
          <tr>
            <th>ユーザ公開設定</th>
            <th>ユーザ更新日</th>
            <th>管理上のユーザ名</th>
            <th>画面上に見せるユーザ名</th>
            <th>ユーザページへ移動ボタン</th>
          </tr>
          {userDataList?.map((x, index) => (
            <tr key={index}>
              <td>{x.userData.isPublic}</td>
              <td>{convertFromTimestampToDatetime(x.userData.updatedAt)}</td>
              <td>{x.userData.userName}</td>
              <td>{x.userData.userDisplayName}</td>
              <td>
                <Link href={`/users/${x.userData.userName}`}>
                  ユーザページへ
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {userDataList?.map((x) => (
        <UserCard
          key={x.userData.uid}
          userName={x.userData.userName}
          userData={x.userData}
        />
      ))}
    </>
  );
};
