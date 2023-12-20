import { createEntityAdapter, createSelector, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ScoreTransaction } from "./models";
import { RootState } from "./store";

interface ScoreTransactionWithPlayerId extends ScoreTransaction {
    playerId: EntityId,
}

interface ScoreTransactionWithId extends ScoreTransactionWithPlayerId {
    id: EntityId,
    time: number,
    active: boolean,
    canBeDisabled: boolean,
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
            if (action.payload.type === "change" && action.payload.value === 0) return;
            // the first "set" transaction for a given playerId cannot be disabled
            scoreTransactionAdapter.addOne(state, {
                id: uuidv4(),
                time: Date.now(),
                active: true,
                canBeDisabled: Object.values(state.entities).filter(t => t?.playerId === action.payload.playerId && t?.type === "set").length > 0,
                ...action.payload,
            });
        },
        scoreTransactionUpdate: scoreTransactionAdapter.updateOne,
        scoreTransactionRemove: scoreTransactionAdapter.removeOne,
        scoreTransactionRemoveAll: scoreTransactionAdapter.removeAll,
    },
});

export const { scoreTransactionAdd, scoreTransactionUpdate, scoreTransactionRemove, scoreTransactionRemoveAll } = scoreTransactionSlice.actions;
export const selectScoreTransactionById = (state: RootState, transactionId: EntityId) => state.scoreTransactions.entities[transactionId];

export const selectScoreTransactionsByPlayerIds = createSelector([
    (state: RootState) => state.scoreTransactions,
    (_: RootState, playerId: EntityId | EntityId[]) => playerId,
],
    (state, playerId) => {
        const ids = Array.isArray(playerId) ? playerId : [playerId];
        return Object.values(state.entities).filter(t => t && ids.includes(t.playerId));
    }
);

export const selectScoreTransactionsByPlayerIdsB = (state: RootState, playerId: EntityId | EntityId[]) => {
    const ids = Array.isArray(playerId) ? playerId : [playerId];
    const entities = state.scoreTransactions.entities;
    return Object.values(entities).filter(t => t &&  ids.includes(t.playerId));
};

export default scoreTransactionSlice.reducer;
