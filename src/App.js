import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CurrentUser from './CurrentUser';
import TodoList from './TodoList';
import { selectors, actions } from './store'

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const dispatch = useDispatch();
  const todos = useSelector(selectors.getTodos);
  const isLoading = useSelector(selectors.areTodosLoading);
  const isInitialized = useSelector(selectors.areTodosInitialized);
  const hasError = useSelector(selectors.hasTodosError);

  return (
    <main className="App">
      <section>
        <p className="info">
          {!isInitialized && !isLoading && !hasError && <>
            Todos are not loaded yet
            <button type="button" onClick={() => {
              dispatch(actions.loadTodos())
                .then((value) => {
                  console.log(value);
                });
            }}>Load</button>
          </>}

          {isLoading && 'Loading...'}

          {hasError && <>
            Failed loading todos
            <button type="button" onClick={() => {
              dispatch(actions.loadTodos())
                .then((value) => {
                  console.log(value);
                })
            }}>Reload</button>
          </>}


          {isInitialized && todos.length === 0 && <>
            There are no todos
            <button type="button" onClick={() => {
              dispatch(actions.loadTodos())
            }}>Reload</button>
          </>}


          {isInitialized && todos.length > 0 && <>
            {todos.length} todos are loaded
            <button type="button" onClick={() => {
              dispatch(actions.clearTodos());
            }}>Clear</button>
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

