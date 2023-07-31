import { Box, Modal } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import Button from "./Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { playerUpdate, selectPlayerById } from "../state/playerSlice";

interface EditPlayerModalProps {
    playerId: EntityId,
}

const EditPlayerButtonAndModal = ({ playerId }: EditPlayerModalProps) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));
    if (player === undefined) return null;

    return <>
        <Button onClick={() => setOpen(true)}>Edit</Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div style={{
                backgroundColor: "#aaa",
                padding: "16px",
                margin: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
            }}>
                <Button style={{ maxWidth: "fit-content", alignSelf: "start" }} onClick={() => setOpen(false)}>close</Button>
                <div>
                    <label>Player Name: </label>
                    <input type="text" value={player?.name} onChange={e => {
                        dispatch(playerUpdate({ id: playerId, changes: { name: e.target.value }}));
                    }}></input>
                </div>
            </div>
        </Modal>
    </>;
};

export default EditPlayerButtonAndModal;
