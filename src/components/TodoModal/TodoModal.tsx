import React, { useEffect } from 'react';
import { Loader } from '../Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { setSelectedTodo } from '../../features/todos';
import { fetchUser, resetUser } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const selectedTodo = useSelector(
    (state: RootState) => state.todos.selectedTodo,
  );
  const { user, error, loading } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    if (selectedTodo) {
      dispatch(fetchUser(selectedTodo.userId));
    }

    return () => {
      dispatch(resetUser());
    };
  }, [selectedTodo, dispatch]);

  if (!selectedTodo) {
    return null;
  }

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {!loading ? (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              Todo #{selectedTodo?.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => dispatch(setSelectedTodo(null))}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {selectedTodo.title}
            </p>

            <p className="block" data-cy="modal-user">
              {selectedTodo.completed === false ? (
                <strong className="has-text-danger">Planned</strong>
              ) : (
                <strong className="has-text-success">Done</strong>
              )}
              {' by '}
              <a href={`mailto: ${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      ) : (
        error && <p className="has-text-danger">Error: {error}</p>
      )}
    </div>
  );
};
