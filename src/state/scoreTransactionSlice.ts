import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ScoreTransaction } from "./models";
import { RootState } from "./store";

interface ScoreTransactionWithPlayerId extends ScoreTransaction {
    playerId: EntityId,
}

interface ScoreTransactionWithId extends ScoreTransactionWithPlayerId {
    id: EntityId,
    orderNumber: number,
}

const scoreTransactionAdapter = createEntityAdapter<ScoreTransactionWithId>({
    selectId: (scoreTransaction) => scoreTransaction.id,
    sortComparer: (a, b) => a.orderNumber - b.orderNumber,
});

const scoreTransactionSlice = createSlice({
    name: "scoreTransactions",
    initialState: scoreTransactionAdapter.getInitialState(),
    reducers: {
        scoreTransactionAdd: (state, action: PayloadAction<ScoreTransactionWithPlayerId>) => {
            const count = state.ids.map(id => state.entities[id]).filter(t => t?.playerId === action.payload.playerId).length;
            scoreTransactionAdapter.addOne(state, { id: uuidv4(), orderNumber: count, ...action.payload });
        },
        scoreTransactionRemove: scoreTransactionAdapter.removeOne,
        scoreTransactionRemoveAll: scoreTransactionAdapter.removeAll,
    },
});

export const { scoreTransactionAdd, scoreTransactionRemove, scoreTransactionRemoveAll } = scoreTransactionSlice.actions;
export const selectScoreTransactionsByPlayerId = (state: RootState, playerId: EntityId) => {
    const entities = state.scoreTransactions.entities;
    return state.scoreTransactions.ids.map(id => entities[id]).filter(t => t?.playerId === playerId);
};

export default scoreTransactionSlice.reducer;
