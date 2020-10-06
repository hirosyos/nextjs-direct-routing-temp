import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "common/firebase";

// export const AuthInfo = () => {
//     const [user, initialising, error] = useAuthState(firebase.auth());
//     if (initialising) {
//         return (
//             <Layout>
//                 <div>認証確認中...</div>
//             </Layout>
//         );
//     }
//     if (error) {
//         return (
//             <Layout>
//                 <div>認証確認エラー: {error}</div>
//             </Layout>
//         );
//     }
//     if (user) {
//         <UserLoginInfo myUid={user.uid} />;
//     }
//     return (
//         <Layout>
//             <div>aaaaaaa: </div>
//         </Layout>
//     );
// };

const login = () => {
    firebase.auth().signInWithEmailAndPassword("test@test.com", "password");
};
const logout = () => {
    firebase.auth().signOut();
};

const CurrentUser = () => {
    const [user, loading, error] = useAuthState(firebase.auth());

    if (loading) {
        return (
            <div>
                <p>Initialising User...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }
    if (user) {
        return (
            <div>
                <p>Current User: {user.email}</p>
                <button type="submit" onClick={logout}>
                    Log out
                </button>
            </div>
        );
    }
    return (
        <button type="submit" onClick={login}>
            Log in
        </button>
    );
};

export default CurrentUser;
