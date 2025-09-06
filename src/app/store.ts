import { combineReducers, configureStore } from '@reduxjs/toolkit';

import todosReducer from '../features/todos';
import filterReducer from '../features/filter';
import userReducer from '../features/currentTodo';

const rootReducer = combineReducers({
  todos: todosReducer,
  filter: filterReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
