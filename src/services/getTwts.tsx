import { TwtStateProps, defaultTwtState } from '../contexts/handleContexts';

export async function getTwts(
  handle: string,
  max_id?: string | number
): Promise<TwtStateProps> {
  const url = max_id
    ? `http://localhost:3000/${handle}?max_id=${max_id}`
    : `http://localhost:3000/${handle}`;

  try {
    const text = await fetch(url);
    const tweets = await text.json();
    return tweets;
  } catch (e) {
    return defaultTwtState;
  }
}
