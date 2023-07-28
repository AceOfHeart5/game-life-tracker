import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { playerRemove, selectPlayerById } from "../state/playerSlice";
import { useEffect } from "react";
import { scoreTransactionAdd } from "../state/scoreTransactionSlice";
import { Orientation } from "../utilsAndConstants";
import PlayerScoreDisplay from "./PlayerScoreDisplay";
import ScoreAdjustButton from "./ScoreAdjustButton";

interface PlayerProps {
    playerId: EntityId,
    orientation: Orientation,
    flip?: boolean,
}

const plusMinusStyle: React.CSSProperties = {
    fontSize: 24,
    padding: "8px",
    color: "#fff",
};

const Player = ({ playerId, orientation, flip=false }: PlayerProps) => {
    const dispatch = useAppDispatch();
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));

    useEffect(() => {
        dispatch(scoreTransactionAdd({ playerId, type: "set", value: 0 }));
    }, [dispatch, playerId]);

    return player === undefined ? null : <div 
        className="player-card"
        style={{
            backgroundColor: player.backgroundColor,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            transform: flip ? "rotate(180deg)" : "",
            padding: "4px",
        }}
    >
        <div className="name-and-actions-bar" style={{ padding: "8px", display: "flex", gap: "16px" }}>
            <div style={{ fontSize: 24, textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{player.name}</div>
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
                    <div className="player-info-row-style" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
                        <div style={{ ...plusMinusStyle, textAlign: "center" }}>+</div>
                        <PlayerScoreDisplay playerId={playerId} orientation={orientation}/>
                        <div style={{ ...plusMinusStyle, textAlign: "center" }}>-</div>
                    </div>
                : 
                    <div className="player-info-column-style" style={{ height: "100%", display: "flex" }}>
                        <span style={{...plusMinusStyle, margin: "auto 0" }}>-</span>
                        <PlayerScoreDisplay playerId={playerId} orientation={orientation}/>
                        <span style={{...plusMinusStyle, margin: "auto 0" }}>+</span>
                    </div>
            }
            <ScoreAdjustButton playerId={playerId} type={"decrement"} orientation={orientation} />
            <ScoreAdjustButton playerId={playerId} type={"increment"} orientation={orientation} />
        </div>
    </div>
};

export default Player;
