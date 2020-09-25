import { useRouter } from "next/router";

// export async function getServerSideProps() {
//     return {
//         props: {}, // will be passed to the page component as props
//     };
// }

// 最初に実行される。事前ビルドするパスを配列でreturnする。
export async function getStaticPaths() {
    // const paths = ["/post/1", "/post/2"];
    const paths = [];
    return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
    console.log({ params });
    return {
        props: {
            pid: params.pid,
        },
    };
}

const Post = (getpid) => {
    console.log({ getpid });
    // const router = useRouter();
    // console.log({ router });
    // if (router.isFallback) {
    //     return <div>Loading...</div>;
    // }

    // const { pid } = router.query;

    return <p>Post: {getpid.pid}</p>;
};

export default Post;
