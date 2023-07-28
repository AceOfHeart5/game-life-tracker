import { EntityId } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { selectScoreTransactionInProgressByPlayerId } from "./scoreTransactionInProgressSlice";
import { selectScoreTransactionsByPlayerId } from "./scoreTransactionSlice";

export const selectPlayerScoreByPlayerId = (state: RootState, playerId: EntityId) => {
    const inProgress = selectScoreTransactionInProgressByPlayerId(state, playerId)?.scoreTransaction;
    const scoreTransactions = selectScoreTransactionsByPlayerId(state, playerId);
    if (inProgress === undefined && scoreTransactions.length === 0) return null;
    let result: null | number = null;
    scoreTransactions.forEach(transaction => {
        if (transaction === undefined) return null;
        result = transaction.type === "set" ? transaction.value : result === null ? null : result + transaction.value
    });
    if (inProgress !== undefined && inProgress !== null) {
        result = inProgress.type === "set" ? inProgress.value : result === null ? null : result + inProgress.value;
    }
    return result;
};
