import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ScoreTransaction } from "./models";

interface Player {
    name: string,
    score: number,
    backgroundColor: string,
    inProgressTransaction: ScoreTransaction | null,
}

interface PlayerWithId extends Player {
    id: EntityId,
}

const playersAdapter = createEntityAdapter<PlayerWithId>({
    selectId: (player) => player.id,
});

const player1: PlayerWithId = {
    id: uuidv4(),
    name: "Player 1",
    score: 40,
    backgroundColor: "#f44",
    inProgressTransaction: null,
};

const player2: PlayerWithId = {
    id: uuidv4(),
    name: "Player 2",
    score: 40,
    backgroundColor: "#44f",
    inProgressTransaction: null,
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
        playerAdd: (state, action: PayloadAction<Player>) => {
            playersAdapter.addOne(state, { id: uuidv4(), ...action.payload });
        },
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
