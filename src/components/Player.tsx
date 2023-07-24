import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { selectPlayerById } from "../state/playerSlice";

interface PlayerProps {
    playerId: EntityId
}

const Player = ({ playerId }: PlayerProps) => {
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));
    if (player === undefined) return <div key={playerId}>player not found</div>;

    return <div style={{
        backgroundColor: player.backgroundColor,
    }}>{player.score}</div>
};

export default Player;
