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
// export const getAllUserNamesPaths = async () => {
//     //有効ユーザコレクションを取り出し
//     const values = await firebase.firestore().collection(VALIDUSERS).get();

//     //有効ユーザコレクションのすべてのユーザドキュメントからユーザネーム取り出し
//     return values.docs.map((userDoc) => {
//         return {
//             params: {
//                 userName: userDoc.data().userName,
//             },
//         };
//     });
// };

export const getAllUserNamesPaths = async () => {
    //有効ユーザコレクションを取り出し
    const querySnapshot = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .get();

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
    //有効ブックコレクションに対してコレクショングループで一括取得
    const querySnapshot = await firebase
        .firestore()
        .collectionGroup(VALIDBOOKS)
        .get();

    //有効ユーザコレクションのすべてのユーザドキュメントからユーザネーム取り出し
    return querySnapshot.docs.map((bookDocSnapshot) => {
        return {
            params: {
                userName: bookDocSnapshot.data().userName,
                bookName: bookDocSnapshot.data().bookName,
            },
        };
    });
};

/**
 * 全セクションIDパス取得
 *
 * @export
 * @return {getStaticPaths専用のオブジェクト配列}
 */
export const getAllSectionIdPaths = async () => {
    //有効ブックコレクションに対してコレクショングループで一括取得
    const querySnapshot = await firebase
        .firestore()
        .collectionGroup(VALIDSECTIONS)
        .get();

    //有効ユーザコレクションのすべてのユーザドキュメントからユーザネーム取り出し
    return querySnapshot.docs.map((sectionDocSnapshot) => {
        return {
            params: {
                userName: sectionDocSnapshot.data().userName,
                bookName: sectionDocSnapshot.data().bookName,
                sectionId: sectionDocSnapshot.data().sectionId,
            },
        };
    });
};

/**
 * ユーザドキュメント情報取得
 *
 * @export
 * @param {*} userName
 * @return {*}
 */
export async function getUserDataFromUserName(userName) {
    console.log("\n関数：getUserDataFromUserName：起動");
    //有効ユーザコレクションのユーザドキュメントからユーザネームが一致するものを取得
    const querySnapshot = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .where("userName", "==", userName)
        .limit(1)
        .get();

    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
    if (querySnapshot.size === 0) {
        console.error(`\n${userName}のドキュメントは存在しません`);
        // console.log(tmpDoc);
        const userData = {};
        return {
            userData: null,
        };
    }

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
    console.log("\n関数：getBookDataFromBookName：起動");
    console.log({ userName, bookName });

    //ユーザデータ取得
    const { userData } = await getUserDataFromUserName(userName);
    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
    if (!userData) {
        console.log(
            "関数：getBookDataFromBookName：該当ユーザ名のデータが存在しない"
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
            "関数：getBookDataFromBookName：該当ブック名のデータが存在しない"
        );
        return {
            userName: userName,
            bookName: bookName,
            bookData: null,
            bookId: null,
        };
    }

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
export async function getSectionDataFromSectionId(
    userName,
    bookName,
    sectionId
) {
    //有効ユーザコレクションのユーザドキュメントからユーザネームが一致するものを取得
    const tmpUserDocs = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .where("userName", "==", userName)
        .limit(1)
        .get();

    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
    if (tmpUserDocs.size === 0) {
        console.log(userName);
        console.log("**************************tmpDoc");
        // console.log(tmpUserDocs);
        const sectionData = {};
        return {
            userName,
            bookName,
            sectionId,
            sectionData,
        };
    }

    //ユーザドキュメントからuidを取得
    const tmpUserDocsId = tmpUserDocs.docs.map((x) => {
        return {
            uid: x.id,
        };
    });

    const uid = tmpUserDocsId[0].uid;

    //有効ブックコレクションのブックドキュメントからブックネームが一致するものを取得
    const tmpBookDocs = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(uid)
        .collection(VALIDBOOKS)
        .where("bookName", "==", bookName)
        .limit(1)
        .get();

    //該当ユーザ名のデータが存在しない場合はデータ部をNullで返す
    if (tmpBookDocs.size === 0) {
        console.log(bookName);
        // console.log(tmpUserDocs);
        const sectionData = {};
        return {
            userName,
            bookName,
            sectionId,
            sectionData,
        };
    }

    //ブックドキュメントからブックidを取得
    const tmpBookDocsId = tmpBookDocs.docs.map((x) => {
        return {
            bookId: x.id,
        };
    });

    const bookId = tmpBookDocsId[0].bookId;

    //有効ユーザコレクションのユーザドキュメントからユーザネームが一致するものを取得
    const sectionData = await firebase
        .firestore()
        .collection(VALIDUSERS)
        .doc(uid)
        .collection(VALIDBOOKS)
        .doc(bookId)
        .collection(VALIDSECTIONS)
        .doc(sectionId)
        .get();

    return {
        userName,
        bookName,
        sectionId,
        sectionData,
    };
}

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
