import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const selectAuth = (state: RootState) => state.auth;
const selectInit = (state: RootState) => state.auth;

export const selectIsAuth = createSelector(selectAuth, (auth) => auth.isAuth);
export const selectIsInit = createSelector(selectInit, (auth) => auth.isInit);
export const selectIsFetching = createSelector(
  selectAuth,
  (auth) => auth.isFetching,
);
