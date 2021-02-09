import React from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import {
  Card,
  CardContent,
  Typography,
  withStyles,
  Theme,
  createStyles,
  CardActions,
} from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import {
  Language as WebIcon,
  Launch as OpenInTwitter,
  Movie,
  Photo,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

const useStyles = makeStyles(
  (theme): Theme => ({
    root: {
      display: 'flex',
      margin: 'auto',
      flexDirection: 'column',
      padding: '8px',
      width: '90%',
    },
    cardDate: {
      width: '90%',
      margin: 'auto',
      paddingTop: '8px',
      color: 'grey',
    },
    cardDescriptionText: {
      maxHeight: `${100 - 16}px`,
      overflow: 'scroll',
    },
    cardActions: {
      justifyContent: 'space-between',
    },
    cardWrapper: {
      height: '100px',
      padding: '8px 0',
    },
    sectionWrapper: {
      padding: '10px 0',
      maxHeight: '200px',
    },
    media: {
      height: 140,
    },
    fixedSizedList: {
      margin: 'auto',
    },
    cardButtons: { display: 'flex' },
  })
);

export default function ExampleWrapper({
  ListRefEle,
  itemCount,
  itemsLoading,
  items,
  loadNextItems,
  itemLast,
  user,
}) {
  const classes = useStyles();
  const isTabletUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

  const loadMoreItems = itemsLoading ? () => {} : loadNextItems;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index) => index < itemCount;
  const itemCountForList = itemCount + 1;

  function renderRow({ index, style }: ListChildComponentProps) {
    const { created_at, full_text, id, media_url, web, media_type } = items[
      index
    ];

    const timestamp = dayjs(created_at).format('DD/MM/YYYY hh:mm a');
    return (
      <section style={style} className={classes.sectionWrapper}>
        <Typography variant="body1" component="p" className={classes.cardDate}>
          {timestamp}
        </Typography>
        <Card className={classes.root} component="section">
          <CardContent className={classes.cardWrapper}>
            <Typography
              variant="body1"
              component="p"
              className={classes.cardDescriptionText}
            >
              {full_text}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <a
              target="_blank"
              href={`https://twitter.com/${user.screen_name}/status/${id}`}
              className={classes.cardButtons}
            >
              <OpenInTwitter fontSize={'large'} />
            </a>
            {web && (
              <a target="_blank" href={web} className={classes.cardButtons}>
                <WebIcon fontSize={'large'}></WebIcon>
              </a>
            )}

            {media_url && media_type === 'photo' && (
              <a
                target="_blank"
                href={media_url}
                className={classes.cardButtons}
              >
                <Photo fontSize={'large'} />
              </a>
            )}
            {media_url && media_type === 'video' && (
              <a
                target="_blank"
                href={media_url}
                className={classes.cardButtons}
              >
                <Movie fontSize={'large'} />
              </a>
            )}
          </CardActions>
        </Card>
      </section>
    );
  }

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCountForList}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          onItemsRendered={onItemsRendered}
          ref={(list) => {
            ref(list);
            // @ts-ignore
            ListRefEle.current = list;
          }}
          outerElementType={'article'}
          className={classes.fixedSizedList}
          height={900}
          itemSize={200}
          itemCount={itemCountForList}
        >
          {renderRow}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}
