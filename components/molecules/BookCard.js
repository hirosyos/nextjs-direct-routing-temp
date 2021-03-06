import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { convertFromTimestampToDatetime } from '@/common/common';
import CardActionArea from '@material-ui/core/CardActionArea';
import Link from 'src/Link';
import { Autorenew } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
    maxWidth: 400,
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

// export default function SectionCard() {
const BookCard = ({ userName, bookName, bookData }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            著
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={bookData.bookDisplayName}
        subheader={convertFromTimestampToDatetime(bookData.updatedAt.seconds)}
      />
      <CardActionArea>
        <Link underline="none" href={`/users/${userName}/${bookName}`}>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              手記作成日：
              {convertFromTimestampToDatetime(bookData.createdAt.seconds)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              手記更新日：
              {convertFromTimestampToDatetime(bookData.updatedAt.seconds)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              手記公開設定：{bookData.isPublic}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ユーザドキュメントへのリファレンス：{bookData.userDocRef}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              手記ドキュメントID：{bookData.bookId}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              手記ドキュメントへのリファレンス：{bookData.bookDocRef}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              管理上の手記名：{bookData.bookName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              画面上に見せる手記名：{bookData.bookDisplayName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              画面上に見せる著者名：{bookData.authorDisplayName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              著者誕生日：
              {convertFromTimestampToDatetime(bookData.authorBirthday.seconds)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              著者の現在の年齢：{bookData.authorNowAge}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              手記アイコン画像URL：{bookData.bookIconImageUrl}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              手記カバー画像URL：{bookData.bookCoverImageUrl}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              手記はじめに：{bookData.bookIntroduction}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              手記がお気に入りに入れられている数：{bookData.bookFavoritedCount}
            </Typography>
          </CardContent>
        </Link>
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography component={'span'} paragraph>
            Method:
          </Typography>
          <Typography component={'span'} paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and
            set aside for 10 minutes.
          </Typography>
          <Typography component={'span'} paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
            over medium-high heat. Add chicken, shrimp and chorizo, and cook,
            stirring occasionally until lightly browned, 6 to 8 minutes.
            Transfer shrimp to a large plate and set aside, leaving chicken and
            chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes,
            onion, salt and pepper, and cook, stirring often until thickened and
            fragrant, about 10 minutes. Add saffron broth and remaining 4 1/2
            cups chicken broth; bring to a boil.
          </Typography>
          <Typography component={'span'} paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is
            absorbed, 15 to 18 minutes. Reduce heat to medium-low, add reserved
            shrimp and mussels, tucking them down into the rice, and cook again
            without stirring, until mussels have opened and rice is just tender,
            5 to 7 minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography component={'span'}>
            Set aside off of the heat to let rest for 10 minutes, and then
            serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default BookCard;
