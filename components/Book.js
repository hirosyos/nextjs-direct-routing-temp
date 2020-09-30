import React, { useState } from "react";
import firebase from "../common/firebase";

//****************************************************************
//
// 手記作成フォーム作成関数コンポーネント
//
// [IN]props.userData ユーザデータ
// [OUT] 手記作成フォーム
//
//****************************************************************
const BookCreateInputForm = (props) => {
    const [isPublic, setIsPublic] = useState("");
    const [bookName, setBookName] = useState("");
    const [bookDisplayName, setBookDisplayName] = useState("");
    const [authorDisplayName, setAuthorDisplayName] = useState("");
    const [authorBirthday, setAuthorBirthday] = useState("");
    const [chapterName, setChapterName] = useState("");
    const [chapterStartDate, setChapterStartDate] = useState("");

    // Firestoreにデータを送信する関数
    const postDataToFirestore = async (
        collectionName,
        userName,
        subCollectionName,
        postData
    ) => {
        const addedData = await firebase
            .firestore()
            .collection(collectionName)
            .doc(userName)
            .collection(subCollectionName)
            .add(postData);
        return addedData;
    };

    // submitボタンクリック時の処理
    const submitData = async () => {
        if (
            isPublic === "" ||
            bookName === "" ||
            bookDisplayName === "" ||
            authorDisplayName === "" ||
            authorBirthday === "" ||
            chapterName === "" ||
            chapterStartDate === ""
        ) {
            alert("いまのところ全部埋めてください");
            return false;
        }
        const postData = {
            isPublic: isPublic,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            userID: "",
            userRef: "",
            bookName: bookName,
            bookDisplayName: bookDisplayName,
            authorDisplayName: authorDisplayName,
            authorBirthday: new Date(authorBirthday),
            authorNowAge: "",
            bookIconImageUrl: "",
            bookCoverImageUrl: "",
            bookIntroduction: "",
            bookFavoritedCount: "",
            chapterName: chapterName,
            chapterStartDate: new Date(chapterStartDate),
        };
        const addedData = await postDataToFirestore(
            "validUsers",
            props.userData.uid,
            "validBooks",
            postData
        );

        setIsPublic("");
        setBookName("");
        setBookDisplayName("");
        setAuthorDisplayName("");
        setAuthorBirthday("");
        setChapterName("");
        setChapterStartDate("");

        // getTodosFromFirestore();
    };

    return (
        <form action="">
            <ul>
                <li>
                    <label htmlFor="isPublic">手記公開設定(true/false)：</label>
                    <input
                        type="text"
                        id="isPublic"
                        value={isPublic}
                        onChange={(e) => setIsPublic(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="bookName">
                        手記管理名(アルファベット)：
                    </label>
                    <input
                        type="text"
                        id="bookName"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="bookDisplayName">手記表示名：</label>
                    <input
                        type="text"
                        id="bookDisplayName"
                        value={bookDisplayName}
                        onChange={(e) => setBookDisplayName(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="authorDisplayName">著者表示名：</label>
                    <input
                        type="text"
                        id="authorDisplayName"
                        value={authorDisplayName}
                        onChange={(e) => setAuthorDisplayName(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="authorBirthday">著者誕生日：</label>
                    <input
                        type="datetime-local"
                        id="authorBirthday"
                        value={authorBirthday}
                        onChange={(e) => setAuthorBirthday(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="chapterName">時代名：</label>
                    <input
                        type="text"
                        id="chapterName"
                        value={chapterName}
                        onChange={(e) => setChapterName(e.target.value)}
                    />
                </li>
                <li>
                    <label htmlFor="chapterStartDate">時代開始日：</label>
                    <input
                        type="datetime-local"
                        id="chapterStartDate"
                        value={chapterStartDate}
                        onChange={(e) => setChapterStartDate(e.target.value)}
                    />
                </li>

                <li>
                    <button type="button" onClick={submitData}>
                        submit
                    </button>
                </li>
            </ul>
        </form>
    );
};

export default BookCreateInputForm;
