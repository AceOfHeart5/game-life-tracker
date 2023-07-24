import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Player {
    id: string,
    name: string,
    score: number,
}

const playersAdapter = createEntityAdapter<Player>({
    selectId: (player) => player.id,
});

const player1: Player = {
    id: uuidv4(),
    name: "Player 1",
    score: 40,
};

const player2: Player = {
    id: uuidv4(),
    name: "Player 2",
    score: 40,
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
        addPlayer: playersAdapter.addOne,
        removePlayer: playersAdapter.removeOne,
        adjustPlayerScore: (state, action: PayloadAction<{ playerId: string, amount: number }>) => {
            const { playerId, amount } = action.payload;
            if (state.entities[playerId] === undefined) return;
            state.entities[playerId].score += amount;
        },
    },
});

export const {
    selectById: selectPlayerById,
} = playersAdapter.getSelectors();

export default playersSlice.reducer;
