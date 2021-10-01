import React, { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';

import TodoList from './TodoList';
import CurrentUser from './CurrentUser';

import { selectors, actions } from './store';
import { getUser } from './api'

const App = () => {
  const dispatch = useDispatch();

  const todos = useSelector(selectors.getTodos);
  const isLoading = useSelector(selectors.areTodosLoading);
  const isInitialized = useSelector(selectors.areTodosInitialized);
  const hasError = useSelector(selectors.hasTodosError);

 const user = useSelector(selectors.getUser);
 const isUserLoading = useSelector(selectors.isUserLoading);
 const hasUserError = useSelector(selectors.hasUserError);
 const isUserInitialized = useSelector(selectors.areUserInitialized);

  return (
    <main className="App">
      <section>
        <p className="info">

          {!isInitialized && !isLoading && !hasError && <>
            Todos are not loaded yet
            <button type="button" onClick={() => {
              dispatch(actions.loadTodos())
            }}>Load</button>
          </>}

          {isLoading && 'Loading...'}

          {hasError  && <>
            Failed loading todos
            <button type="button" onClick={
              dispatch(actions.loadTodos())
            }>Reload</button>
          </>}


          {isInitialized && todos.length === 0 && <>
            Todos are no todos
            <button type="button"  onClick={() => {
              dispatch(actions.loadTodos())
            }}>Reload</button>
          </>}

          {isInitialized && todos.length > 0 && <>
            {todos.length} todos are loaded
            <button type="button" onClick = {() => {
              dispatch(actions.clearTodos())
            }}>Clear</button>
          </>}

        </p>

        <p className="info">
          <span>
            {!user && !isUserLoading && !hasUserError && <>
              User is not selected
            </>}

            {isUserLoading && 'Loading...'}

            {isUserInitialized && user && !isUserLoading && <>
              User #{user.id} is loaded
              <button type="button" onClick = {() => {
                dispatch(actions.clearUser())
              }}>Clear</button>
            </>}

            <span>
              {hasUserError && <>
                Failed loading user
                <button type="button" onClick={() => dispatch(actions.showUser(user.id)) }> Reload</button>
              </>}
            </span>
          </span>
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
            <TodoList todos={todos}/>
          )}
        </div>

        <div className="content">
          {!isUserLoading && !user && <>
            <p>-</p>
          </>}

          {isUserLoading && (
            <div className="loader" />
          )}

          {user && !isUserLoading && <CurrentUser user={user} />}
        </div>
      </section>
    </main>
  )
}

export default App;
