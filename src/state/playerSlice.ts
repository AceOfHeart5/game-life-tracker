import { createEntityAdapter, createSlice, EntityId, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

interface Player {
    name: string,
    backgroundColor: string,
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
    backgroundColor: "#f44",
};

const player2: PlayerWithId = {
    id: uuidv4(),
    name: "Player 2",
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
        playerAdd: (state, action: PayloadAction<Player>) => {
            playersAdapter.addOne(state, { id: uuidv4(), ...action.payload });
        },
        playerRemove: playersAdapter.removeOne,
    },
});

export const { playerAdd, playerRemove } = playersSlice.actions;

export const {
    selectById: selectPlayerById,
    selectEntities: selectPlayerAll,
    selectIds: selectPlayerAllIds,
} = playersAdapter.getSelectors();

export default playersSlice.reducer;
