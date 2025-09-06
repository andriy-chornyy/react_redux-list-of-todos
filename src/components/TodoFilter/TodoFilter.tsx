// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState, AppDispatch } from '../../app/store';
// import { setFilter } from '../../features/filter';

// export const TodoFilter: React.FC = () => {
//   const filter = useSelector((state: RootState) => state.filter.query);

//   const dispatch = useDispatch<AppDispatch>();

//   const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     dispatch(setFilter({ ...filter, status: event.target.value }));
//   };

//   const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     dispatch(setFilter({ ...filter, query: event.target.value }));
//   };

//   const handleClearSearch = () => {
//     dispatch(setFilter({ ...filter, query: '' }));
//   };

//   return (
//     <form
//       className="field has-addons"
//       onSubmit={event => event.preventDefault()}
//     >
//       <p className="control">
//         <span className="select">
//         <select data-cy="statusSelect" value={filter.status} onChange={handleStatusChange}>
//             <option value="all">All</option>
//             <option value="active">Active</option>
//             <option value="completed">Completed</option>
//           </select>
//         </span>
//       </p>

//       <p className="control is-expanded has-icons-left has-icons-right">
//         <input
//           data-cy="searchInput"
//           type="text"
//           className="input"
//           placeholder="Search..."
//           value={filter.query}
//           onChange={handleQueryChange}
//         />
//         <span className="icon is-left">
//           <i className="fas fa-magnifying-glass" />
//         </span>

//         <span className="icon is-right" style={{ pointerEvents: 'all' }}>
//           {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
//           <button
//             data-cy="clearSearchButton"
//             type="button"
//             className="delete"
//           />
//         </span>
//       </p>
//     </form>
//   );
// };

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { setStatus, setQuery } from '../../features/filter';

export const TodoFilter: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filter = useSelector((state: RootState) => state.filter);

  // Изменение статуса (all / active / completed)
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setStatus(event.target.value as 'all' | 'active' | 'completed'));
  };

  // Изменение текста поиска
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  // Очистка поля поиска
  const handleClearSearch = () => {
    dispatch(setQuery(''));
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={handleStatusChange}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filter.query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={handleClearSearch}
          />
        </span>
      </p>
    </form>
  );
};
