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
        .get();

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
