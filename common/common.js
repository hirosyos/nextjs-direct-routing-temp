import firebase from "../common/firebase";

export const VALIDUSERS = "validUsers";
export const INVALIDUSERS = "invalidUsers";

export const VALIDBOOKS = "validBooks";
export const INVALIDBOOKS = "invalidBooks";

export const VALIDSECTIONS = "varidSections";
export const INVALIDSECTIONS = "invaridSections";

//****************************************************************
//
// 全ユーザネーム取得関数
//
// [in] なし
// [OUT]静的パスを生成するための名称の配列
// [out] ユーザドキュメント
//
//****************************************************************
export async function getAllUserNames() {
    //有効ユーザコレクションを取り出し
    const values = await firebase.firestore().collection(VALIDUSERS).get();

    // Next.jsの仕様でこのような配列を返さないとだめ
    // const paths = [
    //     {
    //         params: {
    //             userName: "hoge3",
    //         },
    //     },
    //     {
    //         params: {
    //             userName: "hoge4",
    //         },
    //     },
    // ];

    //有効ユーザコレクションのすべてのユーザドキュメントからユーザネーム取り出し
    return values.docs.map((value) => {
        return {
            params: {
                userName: value.data().userName,
            },
        };
    });
}

//****************************************************************
//
// ユーザドキュメント情報取得関数
//
// [in] ユーザネーム
// [out] ユーザネーム
// [out] ユーザドキュメント
//
//****************************************************************
export async function getUserData(userName) {
    //有効ユーザコレクションのユーザドキュメントからユーザネームが一致するものを取得
    const tmpDoc = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .where("userName", "==", userName)
        .limit(1)
        .get();

    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
    if (tmpDoc.size === 0) {
        console.log(userName);
        console.log("**************************tmpDoc");
        // console.log(tmpDoc);
        const values = {};
        return {
            userName,
            values,
        };
    }

    //ユーザドキュメントからuidを取得
    const pagename = tmpDoc.docs.map((x) => {
        return {
            uid: x.data().uid,
        };
    });

    //uidからユーザドキュメントを取得
    //2度手間してそうだけどとりあえずこのままで
    const values = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(pagename[0].uid)
        .get();

    return {
        userName,
        values,
    };
}

//****************************************************************
//
// ブックドキュメント情報取得関数
//
// [in] ユーザネーム
// [in] ブックネーム
//
// [out] ユーザネーム
// [out] ブックネーム
// [out] ブックドキュメント
// [out] ブックID
//
//****************************************************************
export async function getBookData(userName, bookName) {
    //有効ユーザコレクションのユーザドキュメントからユーザネームが一致するものを取得
    const tmpUserDocs = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .where("userName", "==", userName)
        .limit(1)
        .get();

    //ユーザドキュメントからuidを取得
    const tmpUserDocsId = tmpUserDocs.docs.map((x) => {
        return {
            uid: x.id,
        };
    });

    const uid = tmpUserDocsId[0].uid;

    const tmpBookDocs = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(uid)
        .collection(VALIDBOOKS)
        .where("bookName", "==", bookName)
        .limit(1)
        .get();

    //ブックドキュメントからブックidを取得
    const tmpBookDocsId = tmpBookDocs.docs.map((x) => {
        return {
            bookId: x.id,
        };
    });

    const bookId = tmpBookDocsId[0].bookId;

    const bookData = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(uid)
        .collection(VALIDBOOKS)
        .doc(bookId)
        .get();

    console.log("◆bookData◆");
    console.log(bookData);
    console.log("◆bookId◆");
    console.log(bookId);
    return {
        userName,
        bookName,
        bookData,
        bookId,
    };
}
//****************************************************************
//
// timestamp形式のデータをいい感じの形式に変換する関数
//
// [in] timestamp形式
//
// [out] いい感じの形式
//
//****************************************************************

/**
 * timestamp形式のデータをいい感じの形式に変換する
 *
 * @param {*} timestamp
 * @return {*} いい感じの形式
 */
export const convertFromTimestampToDatetime = (timestamp) => {
    const _d = timestamp ? new Date(timestamp * 1000) : new Date();
    const Y = _d.getFullYear();
    const m = (_d.getMonth() + 1).toString().padStart(2, "0");
    const d = _d.getDate().toString().padStart(2, "0");
    const H = _d.getHours().toString().padStart(2, "0");
    const i = _d.getMinutes().toString().padStart(2, "0");
    const s = _d.getSeconds().toString().padStart(2, "0");
    return `${Y}/${m}/${d} ${H}:${i}:${s}`;
};
