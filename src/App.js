import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CurrentUser from './CurrentUser';
import TodoList from './TodoList';
import * as api from './api';
import { actions as todosActions } from './store/todos';
import { actions as currentUserActions } from './store/currentUser';
import { selectors } from './store'

const App = () => {
  const [currentUser, setCurrentUse] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector(selectors.getTodos);
  const isLoading = useSelector(selectors.areTodosLoading);
  const isInitialized = useSelector(selectors.areTodosInitialized);
  const hasError = useSelector(selectors.hasTodosError);

  const loadTodos = async () => {
    dispatch(todosActions.enableLoading());
    dispatch(todosActions.setError(false));

    try {
      const todosFromServer = await api.getTodos();

      dispatch(todosActions.setTodos(todosFromServer));
      dispatch(todosActions.initialize());
    } catch (error) {
      dispatch(todosActions.setError(true));
    } finally {
      dispatch(todosActions.disableLoading());
    }
  };

  const clearTodos = () => {
    dispatch(todosActions.setTodos([]));
    dispatch(todosActions.cancelInitialization());
  };

  return (
    <main className="App">
      <section>
        <p className="info">
          {!isInitialized && !isLoading && !hasError && <>
            Todos are not loaded yet
            <button type="button" onClick={loadTodos}>Load</button>
          </>}

          {isLoading && 'Loading...'}

          {hasError && <>
            Failed loading todos
            <button type="button" onClick={loadTodos}>Reload</button>
          </>}


          {isInitialized && todos.length === 0 && <>
            There are no todos
            <button type="button" onClick={loadTodos}>Reload</button>
          </>}


          {isInitialized && todos.length > 0 && <>
            {todos.length} todos are loaded
            <button type="button" onClick={clearTodos}>Clear</button>
          </>}
        </p>

        <p className="info">
          User is not selected
          Loading...
          User #1 is loaded
          User #999 does not exist
          Failed loading user
          <button type="button">Reload</button>
        </p>
      </section>

      <section>
        <div className="content">
          {!isLoading && todos.length === 0 && (
            <p>-</p>
          )}

          {isLoading && (
            <div className="loader" />
          )}

          {!isLoading && todos.length > 0 && (
            <TodoList todos={todos} />
          )}

        </div>
        <div className="content">
          {currentUser && <CurrentUser user={currentUser} />}
        </div>
      </section>
    </main>
  );
};

export default App;

