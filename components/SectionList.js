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
 * セクションリスト表示
 *
 * @param {*} sectionList
 * @return {*}
 */
export const SectionList = ({ userData, bookData, sectionList }) => {
    //
    //デバッグ情報
    //
    console.log("関数 SectionList");
    console.log({ userData, bookData, sectionList });

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
                                    href={`/users/${userData.userName}/${bookData.bookName}/${x.data.sectionId}`}
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
