import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { playerRemove, selectPlayerById } from "../state/playerSlice";
import { useEffect } from "react";
import { selectPlayerScoreByPlayerId } from "../state/multiSliceSelectors";
import { scoreTransactionAdd } from "../state/scoreTransactionSlice";
import { scoreTransactionInProgressSet, selectScoreTransactionInProgressByPlayerId } from "../state/scoreTransactionInProgressSlice";

interface PlayerProps {
    playerId: EntityId,
    flip?: boolean,
}

const plusMinusStyle: React.CSSProperties = {
    display: "inline-block",
    width: "50%",
    textAlign: "center",
    fontSize: 24,
    color: "#fff",
};

const scoreAdjustStyle: React.CSSProperties = {
    margin: 0,
    padding: 0,
    position: "absolute",
    width: "50%",
    height: "100%",
    opacity: 0,
};

const Player = ({ playerId, flip=false }: PlayerProps) => {
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

    const scoreToDisplay = useAppSelector(s => selectPlayerScoreByPlayerId(s, playerId));

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
            <div className="minus-plus-bar" style={{ position: "relative" }}>
                <span style={plusMinusStyle}>-</span>
                <span style={plusMinusStyle}>+</span>
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
            <div className="player-score" style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <span style={{ color: "#fff", fontSize: 200 }}>{scoreToDisplay}</span>
            </div>
            <button
                className="player-score-decrease"
                style={{ ...scoreAdjustStyle, backgroundColor: "#0a0" }}
                onClick={() => {
                    dispatch(scoreTransactionInProgressSet({
                        playerId,
                        scoreTransaction: {
                            type: "change",
                            value: inProgressTransaction === null ? -1 : inProgressTransaction.value - 1,
                        }
                    }));
                }}
            />
            <button
                className="player-score-increase"
                style={{ ...scoreAdjustStyle, left: "50%", backgroundColor: "#0f0" }}
                onClick={() => {
                    dispatch(scoreTransactionInProgressSet({
                        playerId,
                        scoreTransaction: {
                            type: "change",
                            value: inProgressTransaction === null ? 1 : inProgressTransaction.value + 1,
                        }
                    }));
                }}
            />
        </div>
    </div>
};

export default Player;
