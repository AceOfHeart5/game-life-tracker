import { useAppDispatch, useAppSelector } from "../hooks";
import { playerAdd } from "../state/multiSliceActions";
import { selectPlayerAllIds } from "../state/playerSlice";
import Button from "./Button";
import EditGameButtonAndModal from "./EditGameButtonAndModal";

const Options = () => {
    const dispatch = useAppDispatch();
    const playerIds = useAppSelector(s => selectPlayerAllIds(s.players));

    return <div className="options-bar" style={{ display: "flex", gap: "8px", padding: "8px" }}>
        <Button onClick={() => {
            dispatch(playerAdd({
                name: `Player ${playerIds.length + 1}`,
                backgroundColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
            }, 0));
        }}>Add Player</Button>
        <EditGameButtonAndModal/>
    </div>;
};

export default Options;
