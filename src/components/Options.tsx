import { useAppDispatch, useAppSelector } from "../hooks";
import { playerAdd, selectPlayerAllIds } from "../state/playerSlice";

const Options = () => {
    const dispatch = useAppDispatch();
    const playerIds = useAppSelector(s => selectPlayerAllIds(s.players));

    return <div className="options-bar" style={{ padding: "8px" }}>
        <button onClick={() => {
            dispatch(playerAdd({
                name: `Player ${playerIds.length + 1}`,
                backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
            }));
        }}>Add Player</button>
    </div>;
};

export default Options;
