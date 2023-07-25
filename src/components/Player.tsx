import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { playerRemove, playerSetScore, selectPlayerById } from "../state/playerSlice";
import { useEffect, useState } from "react";

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
    const [temporaryScore, setTemporaryScore] = useState<{ score: number, adjustment: number} | null>(null);
    const adjustmentIndicatorId = `player-${playerId}score-adjustment-indicator`;

    useEffect(() => {
        if (temporaryScore === null) return;
        const adjustmentIndicator = document.getElementById(adjustmentIndicatorId);
        if (adjustmentIndicator === null) return;
        // here we restart the score adjustment CSS animation by removing it, reflowing the DOM, and re-adding it
        adjustmentIndicator.style.animation = "none";
        void adjustmentIndicator.offsetWidth; // requesting offsetWidth/offsetHeight triggers DOM reflow
        adjustmentIndicator.style.animation = "2s disappear";
    }, [adjustmentIndicatorId, temporaryScore]);

    useEffect(() => console.log("redux score updated:", player?.score), [player?.score]); // debug

    const scoreToDisplay = temporaryScore ? temporaryScore.score : player === undefined ? 0 : player.score;

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
                    temporaryScore === null ? null : 
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
                            dispatch(playerSetScore({ playerId, score: temporaryScore.score }));
                            setTemporaryScore(null);
                        }}
                    >
                        {(temporaryScore.adjustment >= 0 ? "+" : "-") + Math.abs(temporaryScore.adjustment)}
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
                    if (temporaryScore === null) {
                        setTemporaryScore({
                            score: scoreToDisplay - 1,
                            adjustment: -1,
                        });
                    } else {
                        setTemporaryScore({
                            score: temporaryScore.score - 1,
                            adjustment: temporaryScore.adjustment - 1,
                        })
                    }
                }}
            />
            <button
                className="player-score-increase"
                style={{ ...scoreAdjustStyle, left: "50%", backgroundColor: "#0f0" }}
                onClick={() => {
                    if (temporaryScore === null) {
                        setTemporaryScore({
                            score: scoreToDisplay + 1,
                            adjustment: 1,
                        });
                    } else {
                        setTemporaryScore({
                            score: temporaryScore.score + 1,
                            adjustment: temporaryScore.adjustment + 1,
                        })
                    }
                }}
            />
        </div>
    </div>
};

export default Player;
