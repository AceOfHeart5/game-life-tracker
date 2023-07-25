import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Player {
    id: EntityId,
    name: string,
    score: number,
    backgroundColor: string,
}

const playersAdapter = createEntityAdapter<Player>({
    selectId: (player) => player.id,
});

const player1: Player = {
    id: uuidv4(),
    name: "Player 1",
    score: 40,
    backgroundColor: "#f44",
};

const player2: Player = {
    id: uuidv4(),
    name: "Player 2",
    score: 40,
    backgroundColor: "#44f",
};

const playersSlice = createSlice({
    name: "players",
    initialState: playersAdapter.getInitialState({
        ids: [player1.id, player2.id],
        entities: {
            [player1.id]: player1,
            [player2.id]: player2,
        },
    }),
    reducers: {
        playerAdd: playersAdapter.addOne,
        playerRemove: playersAdapter.removeOne,
        playerSetScore: (state, action: PayloadAction<{ playerId: EntityId, score: number }>) => {
            const { playerId, score } = action.payload;
            const player = state.entities[playerId];
            if (player === undefined) return;
            player.score = score;
        },
    },
});

export const { playerAdd, playerRemove, playerSetScore } = playersSlice.actions;

export const {
    selectById: selectPlayerById,
    selectEntities: selectPlayerAll,
    selectIds: selectPlayerAllIds,
} = playersAdapter.getSelectors();

export default playersSlice.reducer;
