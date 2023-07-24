import { useAppSelector } from "../hooks";
import { selectPlayerAllIds } from "../state/playerSlice";
import Player from "./Player";

const PlayerList = () => {
    const playerIds = useAppSelector(s => selectPlayerAllIds(s.players));
    return playerIds.map(playerId => <Player key={playerId} playerId={playerId}/>);
};

export default PlayerList;
