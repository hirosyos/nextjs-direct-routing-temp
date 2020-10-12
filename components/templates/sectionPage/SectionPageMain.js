import Link from 'next/link';
import { useRouter } from 'next/router';

import { convertFromTimestampToDatetime } from '@/common/common';

import AppMain from '@/components/organisms/AppMain';

import styles from 'styles/Home.module.scss';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SectionCard from 'components/molecules/SectionCard';

const SectionPageMain = ({ userName, bookName, sectionId, sectionData }) => {
  // 事前ビルドされていない場合はここで作成する
  const router = useRouter();
  if (router.isFallback) {
    console.log(`${userName}/${bookName}/${sectionId}静的ページ作成中...`);
    return (
      <div>{`${userName}/${bookName}/${sectionId}静的ページ作成中...`}</div>
    );
  }
  // ユーザネームがない段階では何もしない;
  if (!sectionId) {
    console.log('異常終了 そんなセクションはありません\n');
    return <div>そんなセクションはありません...</div>;
  }

  if (!sectionData) {
    console.log('異常終了 指定されたセクションは存在しません...\n');
    return <div>指定されたセクションは存在しません...</div>;
  }

  return (
    <>
      {/* <AppMain /> */}

      <main className={styles.main}>
        <h1>
          セクション
          {sectionId}{' '}
        </h1>

        <SectionCard
          userName={userName}
          bookName={bookName}
          sectionId={sectionId}
          sectionData={sectionData}
        />

        <Link href={`/users/${userName}`}>
          <a>ユーザページ</a>
        </Link>
        <Link href={`/users/${userName}/${bookName}`}>
          <a>手記ページ</a>
        </Link>
      </main>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default SectionPageMain;
