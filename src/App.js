import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CurrentUser from './CurrentUser';
import TodoList from './TodoList';
import * as api from './api';
import { actions, selectors } from './store';

const App = () => {
  const [hasError, setError] = useState(false);
  const [isInitialized, setInitialized] = useState(false);
  const [currentUser, setCurrentUse] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector(selectors.getTodos);
  const isLoading = useSelector(selectors.isLoading);

  const loadTodos = async () => {
    dispatch(actions.enableLoading());
    setError(false);

    try {
      const todosFromServer = await api.getTodos();

      dispatch(actions.setTodos(todosFromServer));

      setInitialized(true);
    } catch (error) {
      setError(true);
    } finally {
      dispatch(actions.disableLoading());
    }
  };

  const clearTodos = () => {
    dispatch(actions.setTodos([]));

    setInitialized(false);
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

