import { EntityId } from "@reduxjs/toolkit";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Dialog, Typography } from "@mui/material";
import { useState } from "react";
import { DialogPaperSX } from "../utilsAndConstants";
import { selectPlayerScoreByPlayerId } from "../state/multiSliceSelectors";
import { scoreTransactionAdd } from "../state/scoreTransactionSlice";

interface SetPlayerScoreButtonAndModalProps {
    playerId: EntityId,
}

const SetPlayerScoreButtonAndModal = ({ playerId }: SetPlayerScoreButtonAndModalProps) => {
    const dispatch = useAppDispatch();
    const score = useAppSelector(s => selectPlayerScoreByPlayerId(s, playerId));
    if (score === null) return null;
    const [open, setOpen] = useState(false);
    const [newScore, setNewScore] = useState(score);

    return <div>
        <Button onClick={() => setOpen(true)}>Set Score</Button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{ sx: DialogPaperSX }}
        >
            <Typography>Current Score: {score}</Typography>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                <label><Typography>New Score:</Typography></label>
                <input type="number" value={newScore} onChange={e => setNewScore(Number(e.target.value))}/>
            </div>
            <Typography sx={{ textAlign: "right", color: "#f00", visibility: newScore === Math.floor(newScore) ? "hidden" : "visible" }}>scores must be integers</Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button disabled={score === newScore || newScore !== Math.floor(newScore)} onClick={() => {
                    dispatch(scoreTransactionAdd({ playerId, type: "set", value: newScore }));
                    setOpen(false);
                }}>Set Score</Button>
            </div>
        </Dialog>
    </div>
};

export default SetPlayerScoreButtonAndModal;