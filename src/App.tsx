import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { fetchTodos } from './features/todos'; // thunk теперь вместо setTodos и т.п.

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Читаем из Redux состояние
  const todos = useSelector((state: RootState) => state.todos.todos);
  const loaded = useSelector((state: RootState) => state.todos.loaded);
  const hasError = useSelector((state: RootState) => state.todos.hasError);
  // const filter = useSelector((state: RootState) => state.filter);
  const selectedTodo = useSelector(
    (state: RootState) => state.todos.selectedTodo,
  );

  // Диспатчим thunk один раз при монтировании
  useEffect(() => {
    dispatch(fetchTodos()); // thunk сам выполнит fetch, обновит loaded, todos и hasError
  }, [dispatch]);
  // console.log('selectedTodo?.id', selectedTodo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {!loaded && <Loader />}
              {hasError && <p>Error loading todos!</p>}
              {todos.length > 0 && !hasError && <TodoList />}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
