/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export interface TodosState {
  todos: Todo[];
  loaded: boolean;
  hasError: boolean;
  selectedTodo: Todo | null;
}

const initialState: TodosState = {
  todos: [],
  loaded: false,
  hasError: false,
  selectedTodo: null,
};

// ✅ Асинхронный thunk
export const fetchTodos = createAsyncThunk<Todo[]>(
  'todos/fetchTodos', // название экшена
  async () => {
    const todosFromServer = await getTodos();

    return todosFromServer; // это попадёт в payload.fulfilled
  },
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // можно оставить для локальных синхронных действий
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },

    setSelectedTodo: (state, action: PayloadAction<Todo | null>) => {
      state.selectedTodo = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.loaded = false; // начало загрузки
        state.hasError = false; // сброс ошибки
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload; // кладём тудушки
        state.loaded = true; // загрузка завершена
      })
      .addCase(fetchTodos.rejected, state => {
        state.hasError = true; // ошибка загрузки
        state.loaded = true; // загрузка завершена с ошибкой
      });
  },
});

export const { setTodos, setSelectedTodo } = todosSlice.actions;
export default todosSlice.reducer;
