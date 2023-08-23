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

const startingIds = [uuidv4(), uuidv4()];

export const STARTING_PLAYERS = {
    player1: { name: "Player 1", backgroundColor: "#f44" } as Player,
    player2: { name: "Player 2", backgroundColor: "#44f" } as Player,
};

const playersSlice = createSlice({
    name: "players",
    initialState: playersAdapter.getInitialState({
        ids: startingIds,
        entities: {
            [startingIds[0]]: { id: startingIds[0], ...STARTING_PLAYERS.player1 },
            [startingIds[1]]: { id: startingIds[1], ...STARTING_PLAYERS.player2 },
        },
    }),
    reducers: {
        playerAdd: (state, action: PayloadAction<Player>) => {
            playersAdapter.addOne(state, { id: uuidv4(), ...action.payload });
        },
        playerRemove: playersAdapter.removeOne,
        playerRemoveAll: playersAdapter.removeAll,
        playerUpdate: playersAdapter.updateOne,
    },
});

export const { playerAdd, playerRemove, playerRemoveAll, playerUpdate } = playersSlice.actions;

export const {
    selectById: selectPlayerById,
    selectEntities: selectPlayerAll,
    selectIds: selectPlayerAllIds,
} = playersAdapter.getSelectors();

export default playersSlice.reducer;
