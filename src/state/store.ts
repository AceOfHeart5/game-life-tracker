import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./playerSlice";
import scoreTransactionInProgressReducer from "./scoreTransactionInProgressSlice";
import scoreTransactionReducer from "./scoreTransactionSlice";

/**
 * Loads redux state from local storage.
 * 
 * @returns 
 */
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

/**
 * Saves redux state to local storage.
 * 
 * @param state 
 */
export const saveState = (state: RootState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch {
      // ignore write errors
    }
};

const loadedState = loadState();

export const store = configureStore({
    reducer: {
        players: playersReducer,
        scoreTransactionsInProgress: scoreTransactionInProgressReducer,
        scoreTransactions: scoreTransactionReducer,
    },
    preloadedState: loadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

store.subscribe(() => {
    saveState(store.getState());
});
