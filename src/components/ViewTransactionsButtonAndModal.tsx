import { Dialog, Typography } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import Button from "./Button";
import { useState } from "react";
import { useAppSelector } from "../hooks";
import { selectScoreTransactionsByPlayerIds } from "../state/scoreTransactionSlice";
import ScoreTransaction from "./ScoreTransaction";
import { DialogPaperSX } from "../utilsAndConstants";
import PlayerNameAndScore from "./PlayerNameAndScore";

interface ViewTransactionsButtonAndModalProps {
    playerIds: EntityId[],
    buttonText: string,
}

const ViewTransactionsButtonAndModal = ({ playerIds, buttonText }: ViewTransactionsButtonAndModalProps) => {
    const [open, setOpen] = useState(false);
    const transactions = useAppSelector(s => selectScoreTransactionsByPlayerIds(s, playerIds));

    return <div>
        <Button onClick={() => setOpen(true)}>{buttonText}</Button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{ sx: DialogPaperSX }}
        >
            <div style={{
                overflowY: "auto",
                padding: "0 8px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
            }}>
                {transactions.map(t => t === undefined ? null : <ScoreTransaction key={t.id} transactionId={t.id}/>)}
            </div>
            <Typography sx={{ textAlign: "center" }}>Final Score{playerIds.length > 1 ? "s" : ""}</Typography>
            {playerIds.map(id => <PlayerNameAndScore key={id} playerId={id}/>)}
            <Button
                sx={{ alignSelf: "end" }}
                onClick={() => setOpen(false)}
            >close</Button>
        </Dialog>
    </div>;
};

export default ViewTransactionsButtonAndModal;
