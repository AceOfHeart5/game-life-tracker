import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { playerAdjustScore, selectPlayerById } from "../state/playerSlice";
import { useRef, useState } from "react";

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
    const refTimeout = useRef<number>();
    const [scoreAdjust, setScoreAdjust] = useState<number | null>(null);

    const onAdjust = (plusMinus: "+" | "-") => {
        clearTimeout(refTimeout.current);
        const adjustment = (scoreAdjust === null ? 0 : scoreAdjust) + (plusMinus === "+" ? 1 : -1);
        setScoreAdjust(adjustment);
        refTimeout.current = setTimeout(() => {
            dispatch(playerAdjustScore({ playerId, amount: adjustment }));
            setScoreAdjust(null);
        }, 1500);
    };

    return player === undefined ? null : <div style={{
        backgroundColor: player.backgroundColor,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        transform: flip ? "rotate(180deg)" : "",
    }}>
        <div style={{ padding: "8px" }}>
            <div style={{ fontSize: 24 }}>{player.name}</div>
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
                { scoreAdjust === null ? null : <div style={{
                    width: "100%",
                    position: "absolute",
                    top: 0,
                    textAlign: "center",
                    fontSize: 52,
                    color: "#fff",
                }}>{(scoreAdjust >= 0 ? "+" : "-") + Math.abs(scoreAdjust)}</div>}
            </div>
            <div className="player-score-container" style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <span style={{ color: "#fff", fontSize: 200 }}>{player.score + (scoreAdjust === null ? 0 : scoreAdjust)}</span>
            </div>
            <button
                className="player-score-decrease"
                style={{ ...scoreAdjustStyle, backgroundColor: "#0a0" }}
                onClick={() => onAdjust("-")}
            />
            <button
                className="player-score-increase"
                style={{ ...scoreAdjustStyle, left: "50%", backgroundColor: "#0f0" }}
                onClick={() => onAdjust("+")}
            />
        </div>
    </div>
};

export default Player;
