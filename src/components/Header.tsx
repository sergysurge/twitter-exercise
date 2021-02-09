import React, { useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Avatar, Chip, useMediaQuery } from '@material-ui/core';
import { TwtStateContext } from '../contexts/handleContexts';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      top: 0,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    offset: theme.mixins.toolbar,
    toolbarWrapper: {
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
  })
);

const Elon = (
  <Avatar src="https://pbs.twimg.com/profile_images/1295975423654977537/dHw9JcrK_normal.jpg" />
);
const Biden = (
  <Avatar src="http://pbs.twimg.com/profile_images/1349837426626330628/CRMNXzQJ_normal.jpg" />
);

function checkStrEquals(str1, str2) {
  if (!str1) {
    return false;
  }
  return str1.toUpperCase() === str2.toUpperCase();
}

export default function Header({ ListRefEle }) {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.only('xs'));
  const isTabletUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const isDesktopUp = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const router = useRouter();
  const { user } = useContext(TwtStateContext);
  const classes = useStyles();

  function handleFavoriteHandleClick(screenName) {
    const userScreenName = user?.screen_name;
    if (checkStrEquals(userScreenName, screenName)) {
      return () => {
        ListRefEle?.current?.scrollToItem(0);
      };
    } else {
      return () => {
        ListRefEle?.current?.scrollToItem(0);
        router.push(`/${screenName}`);
      };
    }
  }
  const isElon = (user?.screen_name || 'A').toUpperCase() === 'ELONMUSK';
  const isBiden = (user?.screen_name || 'A').toUpperCase() === 'POTUS';

  const headerText = isTabletUp ? 'TwTRead' : 'TwTrD';
  return (
    <AppBar
      className={`${classes.root} ${classes.offset}`}
      position="sticky"
      color="primary"
    >
      <Toolbar className={classes.toolbarWrapper}>
        <Typography variant="h2" className={classes.title}>
          {headerText}
        </Typography>
        <Chip
          component={'a'}
          clickable
          color={isElon ? 'secondary' : 'primary'}
          onClick={handleFavoriteHandleClick('elonmusk')}
          label={<Typography noWrap={true}>@ELON MUSK</Typography>}
          avatar={Elon}
        />
        <Chip
          component={'a'}
          clickable
          color={isBiden ? 'secondary' : 'primary'}
          onClick={handleFavoriteHandleClick('potus')}
          label={<Typography noWrap={true}>@POTUS</Typography>}
          avatar={Biden}
        />
      </Toolbar>
    </AppBar>
  );
}
