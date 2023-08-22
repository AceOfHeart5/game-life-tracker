import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { playerRemove, selectPlayerById } from "../state/playerSlice";
import { Orientation } from "../utilsAndConstants";
import PlayerScoreDisplay from "./PlayerScoreDisplay";
import ScoreAdjustButton from "./ScoreAdjustButton";
import Button from "./Button";
import EditPlayerButtonAndModal from "./EditPlayerButtonAndModal";
import { Typography } from "@mui/material";

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

    return player === undefined ? null : <div 
        className="player-card"
        style={{
            backgroundColor: player.backgroundColor,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            transform: flip ? "rotate(180deg)" : "",
            padding: "8px",
        }}
    >
        <div className="name-and-actions-bar" style={{
            paddingTop: "8px",
            paddingBottom: "8px",
            display: "flex",
            flexDirection: "column",
        }}>
            <Typography style={{
                fontSize: 24,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            }}>
                {player.name}
            </Typography>
            <div style={{ display: "flex", gap: "8px", alignSelf: "end" }}>
                <EditPlayerButtonAndModal playerId={playerId}/>
                <Button onClick={() => dispatch(playerRemove(playerId))}>Remove</Button>
            </div>
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
