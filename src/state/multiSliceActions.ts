import { v4 as uuidv4 } from "uuid";
import { _playerAdd } from "./playerSlice";
import { scoreTransactionAdd } from "./scoreTransactionSlice";
import { Player } from "./models";

/**
 * Thunk which adds new player to redux state and creates set score for said player.
 * 
 * @param newPlayer 
 * @param startingScore 
 * @returns 
 */
export const playerAdd = (newPlayer: Player, startingScore: number) => {
    return (dispatch: any) => {
        const id = uuidv4();
        dispatch(_playerAdd({ id, ...newPlayer}));
        dispatch(scoreTransactionAdd({ playerId: id, type: "set", value: startingScore }));
    };
};
