import firebase from "../common/firebase";

export const VALIDUSERS = "validUsers";
export const INVALIDUSERS = "invalidUsers";

export const VALIDBOOKS = "validBooks";
export const INVALIDBOOKS = "invalidBooks";

export const VALIDSECTIONS = "varidSections";
export const INVALIDSECTIONS = "invaridSections";

/**
 * 全ユーザネームパス取得
 *
 * @export
 * @return {getStaticPaths専用のオブジェクト配列}
 */
export const getAllUserNamesPaths = async () => {
    //
    //デバッグ情報
    //
    console.log("\nファイル common.js");
    console.log("関数 getAllUserNamesPaths");

    //有効ユーザコレクションを取り出し
    const querySnapshot = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .get();

    if (querySnapshot.size === 0) {
        //ユーザが一人もいないタイミング

        //
        //デバッグ情報
        //
        console.log("準正常終了\n");

        const paths = [];
        return paths;
    }

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    //有効ユーザコレクションのすべてのユーザドキュメントからユーザネーム取り出し
    return querySnapshot.docs.map((userDocSnapshot) => {
        return {
            params: {
                userName: userDocSnapshot.data().userName,
            },
        };
    });
};

/**
 * 全ブックネームパス取得
 *
 * @export
 * @return {getStaticPaths専用のオブジェクト配列}
 */
export const getAllBookNamePaths = async () => {
    //
    //デバッグ情報
    //
    console.log("\nファイル common.js");
    console.log("関数 getAllBookNamePaths");

    //有効ブックコレクションに対してコレクショングループで一括取得
    const querySnapshot = await firebase
        .firestore()
        .collectionGroup(VALIDBOOKS)
        .get();

    if (querySnapshot.size === 0) {
        //サービス開始時などブックが一つもないタイミング

        //
        //デバッグ情報
        //
        console.log("準正常終了\n");

        const paths = [];
        return paths;
    }

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    //有効ブックコレクションの親ユーザドキュメントからユーザネーム取り出し
    const paths = await Promise.all(
        querySnapshot.docs.map(async (bookDocSnapshot) => {
            const userDocSnapshot = await bookDocSnapshot.ref.parent.parent.get();

            return {
                params: {
                    userName: userDocSnapshot.data().userName,
                    bookName: bookDocSnapshot.data().bookName,
                },
            };
        })
    );

    return paths;
};

/**
 * 全セクションIDパス取得
 *
 * @export
 * @return {getStaticPaths専用のオブジェクト配列}
 */
export const getAllSectionIdPaths = async () => {
    //
    //デバッグ情報
    //
    console.log("\nファイル common.js");
    console.log("関数 getAllSectionIdPaths");

    //有効セクションコレクションに対してコレクショングループで一括取得
    const querySnapshot = await firebase
        .firestore()
        .collectionGroup(VALIDSECTIONS)
        .get();

    if (querySnapshot.size === 0) {
        //サービス開始時などセクションが一つもないタイミング

        //
        //デバッグ情報
        //
        console.log("準正常終了\n");

        const paths = [];
        return paths;
    }

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    //有効セクションコレクションの親ブックドキュメントからブックネーム取り出し
    //親ブックドキュメントの親ユーザ毒面とからユーザネーム取り出し
    const paths = await Promise.all(
        querySnapshot.docs.map(async (sectionDocSnapshot) => {
            const userDocSnapshot = await sectionDocSnapshot.ref.parent.parent.parent.parent.get();
            const bookDocSnapshot = await sectionDocSnapshot.ref.parent.parent.get();
            return {
                params: {
                    userName: userDocSnapshot.data().userName,
                    bookName: bookDocSnapshot.data().bookName,
                    sectionId: sectionDocSnapshot.data().sectionId,
                },
            };
        })
    );

    return paths;
};

/**
 * ユーザドキュメント情報取得
 *
 * @export
 * @param {*} userName
 * @return {*}
 */
export async function getUserDataFromUserName(userName) {
    //
    //デバッグ情報
    //
    console.log("\nファイル common.js");
    console.log("関数 getUserDataFromUserName");
    console.log({ userName });

    //有効ユーザコレクションのユーザドキュメントからユーザネームが一致するものを取得
    const querySnapshot = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .where("userName", "==", userName)
        .limit(1)
        .get();

    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
    if (querySnapshot.size === 0) {
        console.log(
            `異常終了 getUserDataFromUserName ${userName}のドキュメントは存在しません\n`
        );
        return {
            userData: null,
        };
    }

    //
    //デバッグ情報
    //
    console.log("正常終了 getUserDataFromUserName\n");

    return {
        userData: querySnapshot.docs[0].data(),
    };
}

/**
 * ブックドキュメント情報取得
 *
 * @export
 * @param {*} userName
 * @param {*} bookName
 * @return {*}
 */
export async function getBookDataFromBookName(userName, bookName) {
    //
    //デバッグ情報
    //
    console.log("\nファイル common.js");
    console.log("関数 getBookDataFromBookName");
    console.log({ userName, bookName });

    //ユーザデータ取得
    const { userData } = await getUserDataFromUserName(userName);
    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
    if (!userData) {
        console.log(
            "異常終了 getBookDataFromBookName 該当ユーザ名のデータが存在しない\n"
        );
        return {
            userName: userName,
            bookName: bookName,
            bookData: null,
            bookId: null,
        };
    }

    //有効ブックコレクションのブックドキュメントからブックネームが一致するものを取得
    const querySnapshot = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(userData.uid)
        .collection(VALIDBOOKS)
        .where("bookName", "==", bookName)
        .limit(1)
        .get();

    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
    if (querySnapshot.size === 0) {
        console.log(
            "異常終了 getBookDataFromBookName 該当ブック名のデータが存在しない\n"
        );
        return {
            userName: userName,
            bookName: bookName,
            bookData: null,
            bookId: null,
        };
    }

    //
    //デバッグ情報
    //
    console.log("正常終了 getBookDataFromBookName\n");

    return {
        userName: userName,
        bookName: bookName,
        bookData: querySnapshot.docs[0].data(),
        bookId: querySnapshot.docs[0].data().bookId,
    };
}

/**
 * セクションドキュメント情報取得関数
 *
 * @export
 * @param {*} userName
 * @param {*} bookName
 * @param {*} sectionId
 * @return {*}
 */
// export async function getSectionDataFromSectionId(
export const getSectionDataFromSectionId = async (
    userName,
    bookName,
    sectionId
) => {
    //
    //デバッグ情報
    //
    console.log("\nファイル common.js");
    console.log("関数 getSectionDataFromSectionId");
    console.log({ userName, bookName, sectionId });

    //ブックデータ取得
    const { bookData } = await getBookDataFromBookName(userName, bookName);
    console.log({ bookData });
    //ブックデータが存在しない場合はデータ部をNullで返す
    if (!bookData) {
        console.log(
            "異常終了 getSectionDataFromSectionId 該当ブック名のデータが存在しない\n"
        );
        return {
            userName: userName,
            bookName: bookName,
            sectionId: sectionId,
            sectionData: null,
        };
    }

    //有効ユーザコレクションのユーザドキュメントからユーザネームが一致するものを取得
    const querySnapshot = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(bookData.uid)
        .collection(VALIDBOOKS)
        .doc(bookData.bookId)
        .collection(VALIDSECTIONS)
        .doc(sectionId)
        .get();

    if (!querySnapshot.exists) {
        console.log(
            "異常終了 getSectionDataFromSectionId セクションドキュメントスナップショットが取れなかった\n"
        );
        return {
            userName: userName,
            bookName: bookName,
            sectionId: sectionId,
            sectionData: null,
        };
    }

    //
    //デバッグ情報
    //
    console.log("正常終了  getSectionDataFromSectionId\n");
    return {
        userName: userName,
        bookName: bookName,
        sectionId: sectionId,
        sectionData: querySnapshot.data(),
    };
};

/**
 * ブックデータ配下のセクションリストを取得
 *
 * @param {*} uid
 * @param {*} bookId
 */
export const getSectionDataListFromBookData = async (bookData) => {
    //
    //デバッグ情報
    //
    console.log("\nファイル common.js");
    console.log("関数 getSectionDataListFromBookData");
    console.log(bookData.uid);
    console.log(bookData.bookId);
    const querySnapshot = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(bookData.uid)
        .collection(VALIDBOOKS)
        .doc(bookData.bookId)
        .collection(VALIDSECTIONS)
        .orderBy("updatedAt")
        .get();
    console.log({ querySnapshot });
    console.log("querySnapshot.size");
    console.log(querySnapshot.size);
    if (querySnapshot.size === 0) {
        return null;
    }
    const sectionList = querySnapshot.docs.map((x) => {
        console.log("x.data()");
        console.log(x.data());
        return {
            userName: x.data.userName,
            bookName: x.data.bookName,
            data: x.data(),
        };
    });

    console.log("正常終了 getSectionDataListFromBookData\n");
    return sectionList;
};

/**
 * ユーザデータ配下のブックリストを取得
 *
 * @param {*} uid
 * @param {*} bookId
 */
export const getBookDataListFromUserData = async (userData) => {
    //
    //デバッグ情報
    //
    console.log("\nファイル common.js");
    console.log("関数 getBookDataListFromUserData");
    console.log(userData.uid);
    const querySnapshot = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(userData.uid)
        .collection(VALIDBOOKS)
        .orderBy("updatedAt")
        .get();
    console.log({ querySnapshot });
    console.log("querySnapshot.size");
    console.log(querySnapshot.size);
    if (querySnapshot.size === 0) {
        return null;
    }
    const sectionList = querySnapshot.docs.map((x) => {
        console.log("x.data()");
        console.log(x.data());
        return {
            bookName: x.data.bookName,
            data: x.data(),
        };
    });

    console.log("正常終了 getBookDataListFromUserData\n");
    return sectionList;
};

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
