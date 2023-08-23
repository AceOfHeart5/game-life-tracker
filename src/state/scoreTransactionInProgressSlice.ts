import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { ScoreTransaction } from "./models";
import { RootState } from "./store";

interface ScoreTransactionInProgress {
    playerId: EntityId,
    scoreTransaction: ScoreTransaction | null,
}

const scoreTransactionInProgressAdapter = createEntityAdapter<ScoreTransactionInProgress>({
    selectId: (scoreTransaction) => scoreTransaction.playerId,
});

const scoreTransactionInProgressSlice = createSlice({
    name: "scoreTransactionsInProgress",
    initialState: scoreTransactionInProgressAdapter.getInitialState(),
    reducers: {
        scoreTransactionInProgressSet: (state, action: PayloadAction<ScoreTransactionInProgress>) => {
            scoreTransactionInProgressAdapter.setOne(state, action.payload);
        },
        scoreTransactionInProgressRemoveAll: scoreTransactionInProgressAdapter.removeAll,
    },
});

export const { scoreTransactionInProgressSet, scoreTransactionInProgressRemoveAll } = scoreTransactionInProgressSlice.actions;
export const selectScoreTransactionInProgressByPlayerId = (state: RootState, playerId: EntityId) => {
    const entities = Object.values(state.scoreTransactionsInProgress.entities);
    return entities.find(entity => entity?.playerId === playerId);
}

export default scoreTransactionInProgressSlice.reducer;
