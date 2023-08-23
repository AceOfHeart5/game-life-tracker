import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ScoreTransaction } from "./models";
import { RootState } from "./store";

interface ScoreTransactionWithPlayerId extends ScoreTransaction {
    playerId: EntityId,
}

interface ScoreTransactionWithId extends ScoreTransactionWithPlayerId {
    id: EntityId,
    time: number,
}

const scoreTransactionAdapter = createEntityAdapter<ScoreTransactionWithId>({
    selectId: (scoreTransaction) => scoreTransaction.id,
    sortComparer: (a, b) => a.time - b.time,
});

const scoreTransactionSlice = createSlice({
    name: "scoreTransactions",
    initialState: scoreTransactionAdapter.getInitialState(),
    reducers: {
        scoreTransactionAdd: (state, action: PayloadAction<ScoreTransactionWithPlayerId>) => {
            scoreTransactionAdapter.addOne(state, {
                id: uuidv4(),
                time: Date.now(),
                ...action.payload,
            });
        },
        scoreTransactionRemove: scoreTransactionAdapter.removeOne,
        scoreTransactionRemoveAll: scoreTransactionAdapter.removeAll,
    },
});

export const { scoreTransactionAdd, scoreTransactionRemove, scoreTransactionRemoveAll } = scoreTransactionSlice.actions;
export const selectScoreTransactionById = (state: RootState, transactionId: EntityId) => state.scoreTransactions.entities[transactionId];
export const selectScoreTransactionsByPlayerIds = (state: RootState, playerId: EntityId | EntityId[]) => {
    const ids = Array.isArray(playerId) ? playerId : [playerId];
    const entities = state.scoreTransactions.entities;
    // see if there is more efficient way to get array of entities
    return state.scoreTransactions.ids.map(id => entities[id]).filter(t => t &&  ids.includes(t.playerId));
};

export default scoreTransactionSlice.reducer;
