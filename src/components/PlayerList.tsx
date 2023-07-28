import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks";
import { selectPlayerAllIds } from "../state/playerSlice";
import Player from "./Player";
import { Orientation } from "../utilsAndConstants";

const PlayerList = () => {
    const [listDirection, setListDirection] = useState<Orientation>(window.innerHeight > window.innerWidth ? "column" : "row");

    useEffect(() => {
        const onResize = () => {
            if (window.innerHeight > window.innerWidth) setListDirection("column");
            else setListDirection("row");
        }
        addEventListener("resize", onResize);
        return () => removeEventListener("resize", onResize);
    }, [setListDirection]);

    const playerIds = useAppSelector(s => selectPlayerAllIds(s.players));
    const flipOpponent = false;
    return <div
        className="player-list"
        style={{
            height: "100%",
            display: "flex",
            flexDirection: listDirection,
            overflow: "scroll",
        }}
    >
        {
            playerIds.map((playerId, i) => {
                return <Player
                    key={playerId}
                    playerId={playerId}
                    orientation={listDirection}
                    flip={playerIds.length === 2 && i === 0 && flipOpponent}
                />;
            })
        }
    </div>
};

export default PlayerList;
