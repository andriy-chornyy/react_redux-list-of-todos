/* eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setSelectedTodo } from '../../features/todos';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const todos = useSelector((state: RootState) => state.todos.todos);
  const filter = useSelector((state: RootState) => state.filter);
  const selectedTodo = useSelector(
    (state: RootState) => state.todos.selectedTodo,
  );

  const normalizFilterValue = filter.query.trim().toLowerCase();
  let filteredTodos = todos;

  if (filter.status === 'active') {
    filteredTodos = todos.filter(todo => todo.completed === false);
  } else if (filter.status === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed === true);
  }

  if (normalizFilterValue.length > 0) {
    filteredTodos = filteredTodos.filter(todo =>
      todo.title.toLowerCase().includes(normalizFilterValue),
    );
  }

  const handleClick = (todo: Todo) => {
    dispatch(setSelectedTodo(todo));
  };

  return (
    <>
      {filteredTodos.length === 0 ? (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      ) : (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {filteredTodos.length > 0
              ? filteredTodos.map(todo => {
                  return (
                    <tr
                      data-cy="todo"
                      key={todo.id}
                      className={
                        selectedTodo?.id === todo.id
                          ? 'has-background-info-light'
                          : ''
                      }
                    >
                      <td className="is-vcentered">{todo.id}</td>
                      {/* <td className="is-vcentered"> </td> */}

                      <td className="is-vcentered">
                        {todo.completed && (
                          <span className="icon" data-cy="iconCompleted">
                            <i className="fas fa-check" />
                          </span>
                        )}
                      </td>

                      <td className="is-vcentered is-expanded">
                        <p
                          className={
                            todo.completed
                              ? 'has-text-success'
                              : 'has-text-danger'
                          }
                        >
                          {todo.title}
                        </p>
                      </td>

                      <td className="has-text-right is-vcentered">
                        <button
                          data-cy="selectButton"
                          className="button"
                          type="button"
                          onClick={() => handleClick(todo)}
                        >
                          <span className="icon">
                            <i
                              className={
                                selectedTodo && selectedTodo.id === todo.id
                                  ? 'far fa-eye-slash'
                                  : 'far fa-eye'
                              }
                            />
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      )}
    </>
  );
};
