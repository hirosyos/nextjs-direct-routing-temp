import React from "react";

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
