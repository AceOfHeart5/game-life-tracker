import { EntityId } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { selectScoreTransactionInProgressByPlayerId } from "./scoreTransactionInProgressSlice";
import { selectScoreTransactionsByPlayerIds } from "./scoreTransactionSlice";
import { selectPlayerAllIds } from "./playerSlice";

export const selectPlayerScoreByPlayerId = (state: RootState, playerId: EntityId) => {
    const inProgress = selectScoreTransactionInProgressByPlayerId(state, playerId)?.scoreTransaction;
    const scoreTransactions = selectScoreTransactionsByPlayerIds(state, playerId);
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

/**
 * If all players share the same score, returns that score.
 * Otherwise returns null.
 * 
 * @param state 
 * @returns 
 */
export const selectAllPlayersSameScore = (state: RootState) => {
    const playerIds = selectPlayerAllIds(state.players);
    const playerScores = playerIds.map(id => selectPlayerScoreByPlayerId(state, id));
    const result = playerScores[0];
    for (let i = 0; i < playerScores.length; i++) {
        if (playerScores[i] === null) return null;
        if (playerScores[i] !== result) return null;
    }
    return result;
}
