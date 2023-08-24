import { Typography } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { selectPlayerById } from "../state/playerSlice";
import { selectPlayerScoreByPlayerId } from "../state/multiSliceSelectors";

interface PlayerNameAndScoreProps {
    playerId: EntityId,
}

const PlayerNameAndScore = ({ playerId }: PlayerNameAndScoreProps) => {
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));
    const score = useAppSelector(s => selectPlayerScoreByPlayerId(s, playerId));

    return <div style={{ display: "flex", gap: "16px" }}>
        <Typography>{player?.name}:</Typography>
        <Typography>{score}</Typography>
    </div>;
};

export default PlayerNameAndScore;
