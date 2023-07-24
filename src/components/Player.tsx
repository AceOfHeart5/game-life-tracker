import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { playerAdjustScore, selectPlayerById } from "../state/playerSlice";

interface PlayerProps {
    playerId: EntityId,
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
    opacity: 0.5,
};

const Player = ({ playerId }: PlayerProps) => {
    const dispatch = useAppDispatch();

    const player = useAppSelector(s => selectPlayerById(s.players, playerId));

    const onAdjust = (plusMinus: "+" | "-") => {
        dispatch(playerAdjustScore({ playerId, amount: plusMinus === "+" ? 1 : -1}))
    };

    return player === undefined ? null : <div style={{
        backgroundColor: player.backgroundColor,
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
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
            <div className="minus-plus-bar">
                <span style={plusMinusStyle}>-</span>
                <span style={plusMinusStyle}>+</span>
            </div>
            <div className="player-score-container" style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <span style={{ color: "#fff", fontSize: 200 }}>{player.score}</span>
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
