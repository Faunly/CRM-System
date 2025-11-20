import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

const selectUI = (state: RootState) => state.ui;

export const selectIsAuth = createSelector(selectUI, (ui) => ui.isAuth);
export const selectIsFetching = createSelector(selectUI, (ui) => ui.isFetching);
