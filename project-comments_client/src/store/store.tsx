import { useState } from 'react';
import { createContainer } from 'react-tracked';
import { SharedStateType } from '../types/SharedStateType'
const initialState: SharedStateType = {
  comments: { data: [] },
};

const useMyState = () => useState(initialState);

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useMyState);