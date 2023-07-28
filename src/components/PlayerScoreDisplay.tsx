import { EntityId } from "@reduxjs/toolkit";
import { selectPlayerScoreByPlayerId } from "../state/multiSliceSelectors";
import { useAppSelector } from "../hooks";
import { Orientation } from "../constants";
import ScoreChangeIndicator from "./ScoreChangeIndicator";

interface PlayerScoreDisplayProps {
    playerId: EntityId,
    orientation: Orientation,
}

const PlayerScoreDisplay = ({ playerId, orientation }: PlayerScoreDisplayProps) => {
    const scoreToDisplay = useAppSelector(s => selectPlayerScoreByPlayerId(s, playerId));

    return <div className="player-score" style={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    }}>
        <span style={{ color: "#fff", fontSize: 100 }}>{scoreToDisplay}</span>
        <ScoreChangeIndicator playerId={playerId} orientation={orientation} />
    </div>
};

export default PlayerScoreDisplay;
