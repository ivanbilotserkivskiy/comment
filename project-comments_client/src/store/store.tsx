import { useState } from 'react';
import { createContainer } from 'react-tracked';
import { SharedStateType } from '../types/SharedStateType'
const initialState: SharedStateType = {
  comments: [],
  order: "DESC",
  sortBy: 'created',
  tred: '',
  parent: '',
  page: 1,
  total: 0,
};

const useMyState = () => useState(initialState);

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useMyState);