import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'
import saga from './saga'
import reducer from './reducer'

export default function configureStore(initialState = {}, history, location) {
  const middlewares = [routerMiddleware(history)]
  const sagaMiddleware = (createSagaMiddleware.default) ? createSagaMiddleware.default() : createSagaMiddleware()
  middlewares.push(sagaMiddleware)

  const enhancers = [applyMiddleware(...middlewares)]
  if (typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension())
  }

  const store = createStore(
    reducer,
    initialState,
    compose(...enhancers)
  )

  sagaMiddleware.run(saga)

  if (module.hot) {
    System.import('./reducer').then((reducerModule) => {
      store.replaceReducer(reducerModule)
    })
  }

  return store
}
