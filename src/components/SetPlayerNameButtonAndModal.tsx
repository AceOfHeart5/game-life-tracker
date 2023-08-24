import { EntityId } from "@reduxjs/toolkit";
import Button from "./Button";
import { useAppDispatch, useAppSelector } from "../hooks";
import { playerUpdate, selectPlayerById } from "../state/playerSlice";
import { Dialog, Typography } from "@mui/material";
import { useState } from "react";
import { DialogPaperSX } from "../utilsAndConstants";

interface SetPlayerNameButtonAndModalProps {
    playerId: EntityId,
}

const SetPlayerNameButtonAndModal = ({ playerId }: SetPlayerNameButtonAndModalProps) => {
    const dispatch = useAppDispatch();
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));
    if (player === undefined) return null;
    const [open, setOpen] = useState(false);
    const [newName, setNewName] = useState(player.name);

    return <div>
        <Button onClick={() => setOpen(true)}>Set Name</Button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{ sx: DialogPaperSX }}
        >
            <Typography>Current Name: {player?.name}</Typography>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                <label><Typography>New Name:</Typography></label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)}/>
            </div>
            <Typography sx={{ textAlign: "right", color: "#f00", visibility: newName !== "" ? "hidden" : "visible" }}>name cannot be empty</Typography>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
                <Button onClick={() => {
                    dispatch(playerUpdate({ id: playerId, changes: { name: newName }}));
                    setOpen(false);
                }}>Set Name</Button>
            </div>
        </Dialog>
    </div>
};

export default SetPlayerNameButtonAndModal;
