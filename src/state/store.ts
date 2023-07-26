import { configureStore } from "@reduxjs/toolkit";
import playersReducer from "./playerSlice";
import scoreTransactionInProgressReducer from "./scoreTransactionInProgressSlice";
import scoreTransactionReducer from "./scoreTransactionSlice";

export const store = configureStore({
    reducer: {
        players: playersReducer,
        scoreTransactionsInProgress: scoreTransactionInProgressReducer,
        scoreTransactions: scoreTransactionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
