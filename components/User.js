import React, { useState, useEffect } from "react";
import Link from "next/link";
import firebase from "../common/firebase";
import {
    convertFromTimestampToDatetime,
    getUserData,
    VALIDUSERS,
    VALIDBOOKS,
} from "../common/common";

//****************************************************************
//
// ユーザが作成した手記リスト
//
// [IN]userData ユーザデータ
// [OUT] 手記リスト
//
//****************************************************************
export const UserCreateBooksList = (props) => {
    const [bookList, setBookList] = useState(null);
    // alert(props);
    console.log({ props });
    // const userData = getUserData(props.userData.userName);
    // console.log({ userData });

    // const tmpDoc = firebase
    //     .firestore()
    //     .collection(VALIDUSERS)
    //     .where("userName", "==", props.userName)
    //     .get();

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
        const result = getBooksFromUserData(props.userData.uid);
        console.log({ result });
        console.log({ bookList });
    }, [props]);

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
                                    href={`./${props.userData.userName}/${x.data.bookName}`}
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
