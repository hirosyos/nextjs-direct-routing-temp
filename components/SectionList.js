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
 * ブック内のセクションリスト
 *
 * @param {*} bookData
 * @return {*}
 */
export const SectionList = ({ bookData }) => {
    //
    //デバッグ情報
    //
    console.log("関数 SectionList");
    console.log({ bookData });

    const [sectionList, setSectionList] = useState(null);

    // firestoreから全データを取得してstateに格納する関数
    const getSectionsFromBookData = async (uid, bookId) => {
        console.log({ uid, bookId });
        const querySnapshot = await firebase
            .firestore()
            .collection(VALIDUSERS)
            .doc(uid)
            .collection(VALIDBOOKS)
            .doc(bookId)
            .collection(VALIDBOOKS)
            .orderBy("updatedAt")
            .get();
        console.log({ querySnapshot });
        const sectionArray = querySnapshot.docs.map((x) => {
            return {
                userName: x.data.userName,
                bookName: x.data.bookName,
                data: x.data(),
            };
        });
        setSectionList(sectionArray);
        return sectionArray;
    };

    useEffect(() => {
        const result = getSectionsFromBookData(bookData.uid, bookData.bookId);
        console.log({ result });
        console.log({ sectionList });
    }, [bookData]);

    //
    //デバッグ情報
    //
    console.log("正常終了 SectionList\n");

    return (
        <>
            <table border="1">
                <tbody>
                    <tr>
                        <th>セクション公開設定</th>
                        <th>セクション更新日</th>
                        <th>セクションID</th>
                        <th>タイトル</th>
                        <th>セクションページへ移動ボタン</th>
                    </tr>
                    {sectionList?.map((x, index) => (
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
                                    href={`./${userData.userName}/${x.data.bookName}/${x.data.sectionId}`}
                                >
                                    セクションページへ
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
 * セクションリスト表示
 *
 * @param {*} sectionList
 * @return {*}
 */
export const SectionList2 = ({ userName, bookName, sectionList }) => {
    //
    //デバッグ情報
    //
    console.log("関数 SectionList2");
    console.log({ userName, bookName, sectionList });

    // const [sectionList, setSectionList] = useState(null);

    // // firestoreから全データを取得してstateに格納する関数
    // const getSectionsFromBookData = async (uid, bookId) => {
    //     console.log({ uid, bookId });
    //     const querySnapshot = await firebase
    //         .firestore()
    //         .collection(VALIDUSERS)
    //         .doc(uid)
    //         .collection(VALIDBOOKS)
    //         .doc(bookId)
    //         .collection(VALIDBOOKS)
    //         .orderBy("updatedAt")
    //         .get();
    //     console.log({ querySnapshot });
    //     const sectionArray = querySnapshot.docs.map((x) => {
    //         return {
    //             userName: x.data.userName,
    //             bookName: x.data.bookName,
    //             data: x.data(),
    //         };
    //     });
    //     setSectionList(sectionArray);
    //     return sectionArray;
    // };

    // useEffect(() => {
    //     const result = getSectionsFromBookData(bookData.uid, bookData.bookId);
    //     console.log({ result });
    //     console.log({ sectionList });
    // }, [bookData]);

    //
    //デバッグ情報
    //
    console.log("正常終了 SectionList2\n");

    return (
        <>
            <table border="1">
                <tbody>
                    <tr>
                        <th>セクション公開設定</th>
                        <th>セクション更新日</th>
                        <th>セクションID</th>
                        <th>タイトル</th>
                        <th>セクションページへ移動ボタン</th>
                    </tr>
                    {sectionList?.map((x, index) => (
                        <tr key={index}>
                            <td>{x.data.isPublic}</td>
                            <td>
                                {convertFromTimestampToDatetime(
                                    x.data.updatedAt
                                )}
                            </td>
                            <td>{x.data.sectionId}</td>
                            <td>{x.data.title}</td>
                            <td>
                                <Link
                                    href={`../${userName}/${bookName}/${x.data.sectionId}`}
                                >
                                    セクションページへ
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
