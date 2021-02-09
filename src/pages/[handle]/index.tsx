import { useRouter } from 'next/router';
import { useReducer, useRef, useEffect } from 'react';
import ExampleWrapper from '../../components/InfinityComponent';
import { Hero } from '../index';
import Header from '../../components/Header';
import {
  TwtReducer,
  TwtDispatchContext,
  TwtStateContext,
  defaultTwtState,
} from '../../contexts/handleContexts';
import { getTwts } from '../../services/getTwts';

export default function Handle({ tweets }) {
  const router = useRouter();
  const [state, dispatch] = useReducer(TwtReducer, tweets);

  useEffect(() => {
    dispatch({
      type: 'reset',
      payload: tweets,
    });
  }, [tweets.user?.id]);

  const { handle, max_id } = router.query;

  async function loadNextItems() {
    dispatch({ type: 'loading' });
    try {
      const moreTweets = await getTwts(handle, max_id);
      dispatch({
        type: 'addTwts',
        payload: moreTweets,
      });
    } catch (e) {
      console.error('Error loading next tweets \n', e);
    }
  }

  const { user, items, itemCount, itemsLoading, itemLast } = state;
  const ListRefEle = useRef({});

  return (
    <main style={{ maxWidth: '1200px', margin: 'auto' }}>
      <TwtDispatchContext.Provider value={dispatch}>
        <TwtStateContext.Provider value={state}>
          <Hero img={user.profile_banner_url} />
          <Header ListRefEle={ListRefEle} />
          <ExampleWrapper
            user={user}
            ListRefEle={ListRefEle}
            itemCount={itemCount}
            itemsLoading={itemsLoading}
            items={items}
            loadNextItems={loadNextItems}
            itemLast={itemLast}
          />
        </TwtStateContext.Provider>
      </TwtDispatchContext.Provider>
    </main>
  );
}
export async function getServerSideProps({ params }) {
  try {
    const { handle, max_id } = params;
    const tweets = max_id
      ? await getTwts(handle)
      : await getTwts(handle, max_id);
    return {
      props: {
        tweets,
      },
    };
  } catch (e) {
    console.error('Error Getting Tweets\n', e);
    return {
      props: {
        tweets: defaultTwtState,
      },
    };
  }
}
