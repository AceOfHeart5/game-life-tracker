import { useAppSelector } from "../hooks";
import { selectPlayerAllIds } from "../state/playerSlice";
import Player from "./Player";

const PlayerList = () => {
    const playerIds = useAppSelector(s => selectPlayerAllIds(s.players));
    const flipOpponent = false;
    return playerIds.map((playerId, i) => {
        return <Player
            key={playerId}
            playerId={playerId}
            flip={playerIds.length === 2 && i === 0 && flipOpponent}
        />;
    });
};

export default PlayerList;
