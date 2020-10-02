import "../styles/globals.scss";
/**
 * すべてのページで呼ばれるコンポーネント
 *
 * @param {*} { Component, pageProps }
 * @return {*}
 */
function MyApp({ Component, pageProps }) {
    //
    //デバッグ情報
    //
    console.log("\nファイル /pages/_app.js");
    console.log("関数 UserNamePage");
    console.log({ Component, pageProps });

    //
    //デバッグ情報
    //
    console.log("正常終了\n");

    return <Component {...pageProps} />;
}

export default MyApp;
