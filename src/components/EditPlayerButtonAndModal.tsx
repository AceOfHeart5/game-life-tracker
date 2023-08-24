import { Dialog, Typography } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import Button from "./Button";
import { useState } from "react";
import { useAppSelector } from "../hooks";
import { selectPlayerById } from "../state/playerSlice";
import { selectPlayerScoreByPlayerId } from "../state/multiSliceSelectors";
import ViewTransactionsButtonAndModal from "./ViewTransactionsButtonAndModal";
import { DialogPaperSX } from "../utilsAndConstants";
import SetPlayerNameButtonAndModal from "./SetPlayerNameButtonAndModal";
import SetPlayerScoreButtonAndModal from "./SetPlayerScoreButtonAndModal";

interface EditPlayerModalProps {
    playerId: EntityId,
}

const EditPlayerButtonAndModal = ({ playerId }: EditPlayerModalProps) => {
    const [open, setOpen] = useState(false);
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));
    if (player === undefined) return null;
    const score = useAppSelector(s => selectPlayerScoreByPlayerId(s, playerId));
    if (score === null) return null;

    return <div>
        <Button onClick={() => setOpen(true)} sx={{ alignSelf: "end" }}>Edit</Button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{ sx: DialogPaperSX }}
        >
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                    <Typography>Name: {player.name}</Typography>
                    <SetPlayerNameButtonAndModal playerId={playerId}/>
                </div>
            </div>
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                    <Typography>Score: {score}</Typography>
                    <SetPlayerScoreButtonAndModal playerId={playerId}/>
                </div>
            </div>
            <ViewTransactionsButtonAndModal buttonText="View Score Changes" playerIds={[playerId]} />
            <Button sx={{ alignSelf: "end" }} onClick={() => setOpen(false)}>Close</Button>
        </Dialog>
    </div>;
};

export default EditPlayerButtonAndModal;
