import React, { useState, useEffect } from "react";
import Link from "next/link";
import firebase from "../common/firebase";
import {
    convertFromTimestampToDatetime,
    getUserDataFromUserName,
    VALIDUSERS,
    VALIDBOOKS,
} from "../common/common";

/**
 * ユーザが作成した手記リスト
 *
 * @param {*} userData
 * @return {*}
 */
export const BooksList = ({ userData }) => {
    //
    //デバッグ情報
    //
    console.log("\nファイル User.js");
    console.log("関数 BooksList");
    console.log({ userData });

    const [bookList, setBookList] = useState(null);

    // firestoreから全データを取得してstateに格納する関数
    const getBooksFromUserData = async (uid) => {
        console.log({ uid });
        const itemListArray = await firebase
            .firestore()
            .collection(VALIDUSERS)
            .doc(uid)
            .collection(VALIDBOOKS)
            .orderBy("updatedAt")
            .get();
        console.log({ itemListArray });
        const bookArray = itemListArray.docs.map((x) => {
            return {
                userName: x.data.userName,
                bookName: x.data.bookName,
                data: x.data(),
            };
        });
        setBookList(bookArray);
        return bookArray;
    };

    useEffect(() => {
        const result = getBooksFromUserData(userData.uid);
        console.log({ result });
        console.log({ bookList });
    }, [userData]);

    //
    //デバッグ情報
    //
    console.log("正常終了 BooksList\n");

    return (
        <>
            <table border="1">
                <tbody>
                    <tr>
                        <th>手記公開設定</th>
                        <th>手記更新日</th>
                        <th>管理上の手記名</th>
                        <th>画面上に見せる手記名</th>
                        <th>手記ページへ移動ボタン</th>
                    </tr>
                    {bookList?.map((x, index) => (
                        <tr key={index}>
                            <td>{x.data.isPublic}</td>
                            <td>
                                {convertFromTimestampToDatetime(
                                    x.data.updatedAt
                                )}
                            </td>
                            <td>{x.data.bookName}</td>
                            <td>{x.data.bookDisplayName}</td>
                            <td>
                                <Link
                                    href={`./${userData.userName}/${x.data.bookName}`}
                                >
                                    手記ページへ
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
    } else {
        return (
            <>
                <p>{myUid}としてログイン中</p>
            </>
        );
    }
};
