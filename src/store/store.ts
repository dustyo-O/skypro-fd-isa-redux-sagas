import { applyMiddleware, compose, createStore } from 'redux'
import { weatherReducer } from './reducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';

const devTools = composeWithDevTools();

const sagaMiddleware = createSagaMiddleware();

// @ts-ignore
const composedEnhancer = devTools ? compose(
    applyMiddleware(sagaMiddleware),
    composeWithDevTools()
) : applyMiddleware(sagaMiddleware);

export const store = createStore(weatherReducer, undefined, composedEnhancer);

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
