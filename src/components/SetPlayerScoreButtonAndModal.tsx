import { EntityId } from "@reduxjs/toolkit";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Dialog, Typography } from "@mui/material";
import { useState } from "react";
import { DialogPaperSX } from "../utilsAndConstants";
import { selectAllPlayersSameScore, selectPlayerScoreByPlayerId } from "../state/multiSliceSelectors";
import { scoreTransactionAdd } from "../state/scoreTransactionSlice";

interface SetPlayerScoreButtonAndModalProps {
    playerIds: EntityId | EntityId[],
}

const SetPlayerScoreButtonAndModal = ({ playerIds }: SetPlayerScoreButtonAndModalProps) => {
    const dispatch = useAppDispatch();
    const ids = Array.isArray(playerIds) ? playerIds : [playerIds];
    const score = useAppSelector(s => ids.length === 1 ? selectPlayerScoreByPlayerId(s, ids[0]) : selectAllPlayersSameScore(s));;
    if (score === null) return null;
    const [open, setOpen] = useState(false);
    const [newScore, setNewScore] = useState(score === "varied" ? 0 : score);

    const extraS = ids.length === 1 ? "" : "s";

    return <div>
        <Button onClick={() => setOpen(true)}>Set Score{extraS}</Button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{ sx: DialogPaperSX }}
        >
            {ids.length === 1 ? <Typography>Current Score: {score}</Typography> : null}
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                <label><Typography>New Score{extraS}:</Typography></label>
                <input type="number" value={newScore} onChange={e => setNewScore(Number(e.target.value))}/>
            </div>
            <Typography sx={{ textAlign: "right", color: "#f00", visibility: Number.isInteger(newScore) ? "hidden" : "visible" }}>scores must be integers</Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button disabled={score === newScore || !Number.isInteger(newScore)} onClick={() => {
                    ids.forEach(id => dispatch(scoreTransactionAdd({ playerId: id, type: "set", value: newScore })));
                    setOpen(false);
                }}>Set Score{extraS}</Button>
            </div>
        </Dialog>
    </div>
};



export default SetPlayerScoreButtonAndModal;