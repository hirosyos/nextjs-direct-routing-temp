import Link from 'next/link';
import { convertFromTimestampToDatetime } from 'common/common';
import BookCard from 'components/molecules/BookCard';

/**
 * ユーザが作成した手記リスト
 *
 * @param {*} userData
 * @return {*}
 */
export const BooksList = ({ userData, bookDataList }) => {
  //
  // デバッグ情報
  //
  console.log('\nファイル User.js');
  console.log('関数 BooksList2');
  console.log({ userData });

  //
  // デバッグ情報
  //
  console.log('正常終了 BooksList\n');

  return (
    <>
      {bookDataList?.map((x) => (
        <BookCard
          key={x.data.bookId}
          userName={x.userName}
          bookName={x.data.bookName}
          bookData={x.data}
        />
      ))}
    </>
  );
};

/**
 * ユーザのログイン情報
 *
 * @param {*} { myUid }
 * @return {*}
 */
export const UserLoginInfo = ({ myUid }) => {
  if (!myUid) {
    return (
      <>
        <p>未ログイン</p>
      </>
    );
  }
  return (
    <>
      <p>
        {myUid}
        としてログイン中
      </p>
    </>
  );
};
