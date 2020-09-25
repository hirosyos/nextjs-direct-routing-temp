import styles from "../styles/Layout.module.scss";
import Link from "next/link";

const Layout = (props) => (
    <div>
        <header>
            <Link href="/">
                <a className={styles.header}>
                    <img
                        className={styles.header__img}
                        src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
                        alt="Next.js ロゴ"
                        width="100"
                    />
                </a>
            </Link>
        </header>
        <div className={styles.container}>{props.children}</div>
    </div>
);

export default Layout;
