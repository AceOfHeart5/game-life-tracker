import { EntityId } from "@reduxjs/toolkit";
import { selectPlayerScoreByPlayerId } from "../state/multiSliceSelectors";
import { useAppSelector } from "../hooks";

interface PlayerScoreDisplayProps {
    playerId: EntityId,
}

const PlayerScoreDisplay = ({ playerId }: PlayerScoreDisplayProps) => {
    const scoreToDisplay = useAppSelector(s => selectPlayerScoreByPlayerId(s, playerId));

    return <div className="player-score" style={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}>
        <span style={{ color: "#fff", fontSize: 100 }}>{scoreToDisplay}</span>
    </div>
};

export default PlayerScoreDisplay;
