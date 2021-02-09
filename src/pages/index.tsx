import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Header from '../components/Header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    offset: {
      backgroundAttachment: 'fixed',
      backgroundPosition: `center 64px`,
      backgroundRepeat: 'no-repeat',
      height: '426px',
      width: '100%',
      objectFit: 'fill',
    },
  })
);

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />
      <h1>Easy to read Twitter status' from your favorite people!</h1>
      <h2>Click on one of the saved screen_names in the nav bar!</h2>
      <h3>More in the ReadME.MD</h3>
    </div>
  );
}

export function Hero({ img }) {
  const classes = useStyles();

  return (
    <div
      className={classes.offset}
      style={{ backgroundImage: `url(${img})` }}
    ></div>
  );
}
