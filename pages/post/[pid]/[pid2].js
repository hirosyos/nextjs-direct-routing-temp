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
            pid2: params.pid2,
        },
    };
}

const Post = (props) => {
    console.log({ props });
    // const router = useRouter();
    // console.log({ router });
    // if (router.isFallback) {
    //     return <div>Loading...</div>;
    // }

    // const { pid } = router.query;

    return (
        <>
            <p> pid Post: {props.pid}</p>
            <p> pid2 Post: {props.pid2}</p>;
        </>
    );
};

export default Post;
