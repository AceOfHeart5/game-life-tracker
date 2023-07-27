import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { playerRemove, selectPlayerById } from "../state/playerSlice";
import { useEffect } from "react";
import { scoreTransactionAdd } from "../state/scoreTransactionSlice";
import { scoreTransactionInProgressSet, selectScoreTransactionInProgressByPlayerId } from "../state/scoreTransactionInProgressSlice";
import { Orientation } from "../constants";
import PlayerScoreDisplay from "./PlayerScoreDisplay";
import ScoreAdjustButton from "./ScoreAdjustButton";

interface PlayerProps {
    playerId: EntityId,
    orientation: Orientation,
    flip?: boolean,
}

const plusMinusStyle: React.CSSProperties = {
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
};

const Player = ({ playerId, orientation, flip=false }: PlayerProps) => {
    const dispatch = useAppDispatch();
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));
    const selectedInProgressTransaction = useAppSelector(s => selectScoreTransactionInProgressByPlayerId(s, playerId))?.scoreTransaction;
    const inProgressTransaction = selectedInProgressTransaction !== null && selectedInProgressTransaction !== undefined ? selectedInProgressTransaction : null;
    const adjustmentIndicatorId = `player-${playerId}score-adjustment-indicator`;

    useEffect(() => {
        if (inProgressTransaction === null) return;
        const adjustmentIndicator = document.getElementById(adjustmentIndicatorId);
        if (adjustmentIndicator === null) return;
        // here we restart the score adjustment CSS animation by removing it, reflowing the DOM, and re-adding it
        adjustmentIndicator.style.animation = "none";
        void adjustmentIndicator.offsetWidth; // requesting offsetWidth/offsetHeight triggers DOM reflow
        adjustmentIndicator.style.animation = "2s disappear";
    }, [adjustmentIndicatorId, inProgressTransaction]);

    useEffect(() => {
        dispatch(scoreTransactionAdd({ playerId, type: "set", value: 0 }));
    }, [dispatch, playerId]);

    return player === undefined ? null : <div style={{
        backgroundColor: player.backgroundColor,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        transform: flip ? "rotate(180deg)" : "",
    }}>
        <div style={{ padding: "8px", display: "flex", gap: "16px" }}>
            <div style={{ fontSize: 24 }}>{player.name}</div>
            <button onClick={() => dispatch(playerRemove(playerId))}>Remove</button>
        </div> 
        <div className="score-adjustment-container" style={{
            backgroundColor: "#333",
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
        }}>
            {
                orientation === "row" ? 
                    <>
                        <span style={plusMinusStyle}>+</span>
                        <PlayerScoreDisplay playerId={playerId}/>
                        <span style={plusMinusStyle}>-</span>
                    </>
                : 
                    <>
                        <div className="minus-plus-bar" style={{ position: "relative" }}>
                            <span style={{...plusMinusStyle, display: "inline-block", width: "50%"}}>-</span>
                            <span style={{...plusMinusStyle, display: "inline-block", width: "50%"}}>+</span>
                            {
                                inProgressTransaction === null ? null : 
                                <div
                                    id={adjustmentIndicatorId}
                                    style={{
                                        width: "100%",
                                        position: "absolute",
                                        top: 0,
                                        textAlign: "center",
                                        fontSize: 52,
                                        color: "#fff",
                                        opacity: 0,
                                    }}
                                    onAnimationEnd={() => {
                                        dispatch(scoreTransactionAdd({ playerId, ...inProgressTransaction}));
                                        dispatch(scoreTransactionInProgressSet({ playerId, scoreTransaction: null }));
                                    }}
                                >
                                    {(inProgressTransaction.value >= 0 ? "+" : "-") + Math.abs(inProgressTransaction.value)}
                                </div>
                            }
                        </div>
                        <PlayerScoreDisplay playerId={playerId}/>
                    </>
            }
            <ScoreAdjustButton playerId={playerId} type={"decrement"} orientation={orientation} />
            <ScoreAdjustButton playerId={playerId} type={"increment"} orientation={orientation} />
        </div>
    </div>
};

export default Player;
