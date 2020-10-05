import { useState, useRef, useEffect } from "react";
import firebase from "common/firebase";

const Logout = () => {
    //
    //デバッグ情報
    //
    console.log("\nファイル Logout.js");
    console.log("関数 Logout");

    const [pending, setPending] = useState(false);
    const mounted = useRef(true);
    useEffect(() => {
        const cleanup = () => {
            mounted.current = false;
        };
        return cleanup;
    }, []);
    const logout = async () => {
        setPending(true);
        await firebase.auth().signOut();
        if (mounted.current) setPending(false);
    };
    return (
        <>
            <button type="button" onClick={logout}>
                Logout
            </button>
            {pending && "Pending..."}
        </>
    );
};

export default Logout;
