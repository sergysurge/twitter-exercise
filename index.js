const express = require('express');
const Twitter = require('twitter');
const cors = require('cors');

const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

const defaults = {
  screen_name: 'realDonaldTrump',
  tweet_mode: 'extended',
  count: 20,
};

function TwtAdapter(items, maxIdIncluded){
  if (maxIdIncluded) items.shift()
  const itemCount = items.length;

  const twts = items.map(({
    created_at,
    id_str:id,
    full_text,
    retweet_count,
    favorite_count,
    retweeted,
    entities
  }) => {

  const {
    urls = [],
    media = [] 
  } = entities;

  const resultTwt = {
    created_at,
    id,
    full_text,
    retweet_count,
    favorite_count,
    retweeted
  }
  if (media.length > 0) {
    const med1 = media[0]
    resultTwt['media_url'] = med1.expanded_url
    resultTwt['media_url_img'] = med1.media_url
    resultTwt['media_type'] = med1.type
  }
  if (urls.length > 0) {
    const urls1 = urls[0]
    resultTwt['web'] = urls1.expanded_url
  }
    return resultTwt
  })

  const tweet = itemCount > 0
    && items[itemCount-1];
  if (!tweet) {
    console.error('Error: no Tweet found: \n' , tweet)
    return {
      user: {},
      items: [],
      itemCount: 0,
      itemLast: null,
      itemsLoading: false
    } 
  }

  const { user, id_str:id } = tweet;

  const userData = [
    'id',
    'created_at',
    'description',
    'followers_count',
    'friends_count',
    'name',
    'profile_background_color',
    'profile_background_image_url',
    'profile_banner_url',
    'profile_image_url',
    'profile_link_color',
    'profile_sidebar_border_color',
    'profile_sidebar_fill_color',
    'profile_text_color',
    'screen_name',
    'statuses_count',
    'verified',
  ].reduce((resultObj, str) => {
    if (user[str]) {
      resultObj[str] = user[str]
    }
    return resultObj;
  },
  {});

  return {
    user: userData,
    items: twts,
    itemCount: itemCount,
    itemsLoading: false,
    itemLast: id,
  } 
}


const corsOptions={
  origin: ['http://localhost:1337', 'http://localhost:3000'],
  methods: 'GET',
  maxAge: 86400
}
const app = express();
app.use(cors(corsOptions))

app.route('/:handle')
  .get(function(req, res) {
    const params = {
      ...defaults,
      max_id: req.query.max_id,
      screen_name: req.params.handle,
      count: typeof req.query.max_id !== 'undefined'
        ? 21 : 20
    };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      if (!error) {
        res.json(TwtAdapter(tweets, typeof max_id !== 'undefined'));
      } else {
        console.error(error)
      }
    });
  });

app.listen(process.env.port, function(error) {
  console.log('Trump listening on port 3000');
});

