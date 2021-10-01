import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

import CurrentUser from './CurrentUser';
import TodoList from './TodoList';
import * as api from './api';
import {actions, selectors} from './store';


const App = () => {
  const dispatch = useDispatch();

  const todos = useSelector(selectors.getTodos);
  const isLoading = useSelector(selectors.isLoading);
  const isInitialized = useSelector(selectors.isInitialized);
  const hasError = useSelector(selectors.hasError);

  const loadTodos = async() => {
    dispatch(actions.enableLoading());
    dispatch(actions.setError(false));

    try {
      const todosFromServer = await api.getTodos();
      const action = actions.setTodos(todosFromServer);
      dispatch(action);
      dispatch(actions.initialized());
    } catch(error) {
      dispatch(actions.setError(true));
    } finally { 
      dispatch(actions.disableLoading());
    }
  };

  const cleatTodos = () => {
    const action = actions.setTodos([]);
    dispatch(action);
    dispatch(actions.cancelInitialized());
  }

  return (
    <main className="App">
      <section>
        <p className="info">

          {!isInitialized && !isLoading && !hasError && <>
            Todos are not loaded yet
            <button type="button" onClick={loadTodos}>Load</button>
          </>}

          {isLoading && 'Loading...'}

          {hasError  && <>
            Failed loading todos
            <button type="button" onClick={loadTodos}>Reload</button>
          </>}


          {isInitialized && todos.length === 0 && <>
            Todos are no todos
            <button type="button" onClick={loadTodos}>Reload</button>
          </>}

          {isInitialized && todos.length > 0 && <>
            {todos.length} todos are loaded
            <button type="button" onClick = {cleatTodos}>Clear</button>
          </>}

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
      </section>

    </main>
  )
}

export default App;
