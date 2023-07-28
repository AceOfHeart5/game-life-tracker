import { EntityId } from "@reduxjs/toolkit";
import { selectPlayerScoreByPlayerId } from "../state/multiSliceSelectors";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Orientation } from "../utilsAndConstants";
import ScoreChangeIndicator from "./ScoreChangeIndicator";
import { useEffect } from "react";
import { scoreTransactionAdd } from "../state/scoreTransactionSlice";

interface PlayerScoreDisplayProps {
    playerId: EntityId,
    orientation: Orientation,
}

const PlayerScoreDisplay = ({ playerId, orientation }: PlayerScoreDisplayProps) => {
    const dispatch = useAppDispatch();
    const scoreToDisplay = useAppSelector(s => selectPlayerScoreByPlayerId(s, playerId));

    useEffect(() => {
        if (scoreToDisplay !== null) return;
        console.log("setting score playerId:", playerId);
        dispatch(scoreTransactionAdd({ playerId, type: "set", value: 0 }));
    }, [dispatch, playerId, scoreToDisplay]);

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
