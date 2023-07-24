import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { selectPlayerById } from "../state/playerSlice";

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

const Player = ({ playerId }: PlayerProps) => {
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));

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
            //border: "1px solid white",
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
                border: "1px solid green",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <span style={{ color: "#fff", fontSize: 200 }}>{player.score}</span>
            </div>
            <button className="player-score-decrease" style={{
                margin: 0,
                padding: 0,
                position: "absolute",
                width: "50%",
                height: "100%",
                backgroundColor: "#0a0",
                opacity: 0.5,
            }}/>
            <button className="player-score-increase" style={{
                left: "50%",
                margin: 0,
                padding: 0,
                position: "absolute",
                width: "50%",
                height: "100%",
                backgroundColor: "#0f0",
                opacity: 0.5,
            }}/>
        </div>
    </div>
};

export default Player;
