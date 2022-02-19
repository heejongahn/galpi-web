import { useCallback, useEffect, useMemo, useState } from 'react';

import { BookPayload } from '../model/Book';

const SESSION_KEY_BOOK_STATE = 'galpi.review.selected_book';

interface State {
  bookPayload: BookPayload;
}

const sessionStorage =
  typeof window === 'undefined' ? null : window.sessionStorage;

// TODO:
// 서버가 주는 게 낫겠다.
export const useSelectedBook = () => {
  const [state, setState] = useState<null | State>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const revalidate = useCallback(() => {
    const stateFromSessionStorage = sessionStorage?.getItem(
      SESSION_KEY_BOOK_STATE
    );

    if (stateFromSessionStorage == null) {
      return;
    }

    setState(JSON.parse(stateFromSessionStorage));
    return stateFromSessionStorage;
  }, [sessionStorage]);

  // 브라우저 사이드에서 최초 1회 실행
  useEffect(() => {
    revalidate();
    setIsInitialized(true);
  }, [revalidate]);

  const updateState = useCallback(
    (nextValue: State) => {
      setState(nextValue);
      sessionStorage?.setItem(
        SESSION_KEY_BOOK_STATE,
        JSON.stringify(nextValue)
      );
    },
    [sessionStorage]
  );

  return useMemo(
    () => ({ isInitialized, state, updateState, revalidate }),
    [isInitialized, state, updateState, revalidate]
  );
};

export default useSelectedBook;
