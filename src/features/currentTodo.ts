/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'; // Импортируем функции RTK для создания слайса и асинхронного thunk
import { User } from '../types/User'; // Тип для пользователя
import { getUser } from '../api'; // Функция для запроса пользователя с сервера

// Асинхронный thunk для получения пользователя по ID
export const fetchUser = createAsyncThunk<User, number>( // Создаем thunk, который возвращает User и принимает userId
  'currentUser/fetchUser', // Название action для Redux DevTools
  async (userId, thunkAPI) => {
    // Асинхронная функция, которая делает запрос
    try {
      const user = await getUser(userId); // Делаем GET-запрос на сервер через функцию getUser

      return user; // Возвращаем полученного пользователя, попадет в fulfilled
    } catch (err: unknown) {
      if (err instanceof Error) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue('Error fetching user');
    }
  },
);

// Интерфейс состояния слайса
export interface CurrentUserState {
  user: User | null; // Хранит объект пользователя или null, если его нет
  loading: boolean; // Флаг загрузки, чтобы показывать Loader в компоненте
  error: string | null; // Ошибка запроса, чтобы показать пользователю сообщение
}

// Начальное состояние слайса
const initialState: CurrentUserState = {
  user: null, // Изначально пользователя нет
  loading: false, // Загрузка не идет
  error: null, // Ошибки нет
};

// Создаем слайс
export const currentUserSlice = createSlice({
  name: 'currentUser', // Название слайса, используется для action type
  initialState, // Подключаем начальное состояние
  reducers: {
    // Синхронные редьюсеры
    resetUser: state => {
      // Экшен для сброса пользователя
      state.user = null; // Убираем пользователя
      state.loading = false; // Сбрасываем флаг загрузки
      state.error = null; // Сбрасываем ошибку
    },
  },
  extraReducers: builder => {
    // Обработка асинхронных thunk
    builder
      .addCase(fetchUser.pending, state => {
        // Когда начинается загрузка
        state.loading = true; // Ставим флаг загрузки
        state.error = null; // Сбрасываем предыдущую ошибку
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        // Когда загрузка успешна
        state.loading = false; // Снимаем флаг загрузки
        state.user = action.payload; // Сохраняем полученного пользователя
      })
      .addCase(fetchUser.rejected, (state, action) => {
        // Если произошла ошибка
        state.loading = false; // Снимаем флаг загрузки
        state.error = (action.payload as string) || 'Error fetching user'; // Сохраняем текст ошибки
      });
  },
});

// Экспортируем синхронный action для сброса пользователя
export const { resetUser } = currentUserSlice.actions;
// Экспортируем reducer, который добавим в store
export default currentUserSlice.reducer;
