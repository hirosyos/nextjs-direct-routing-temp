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
