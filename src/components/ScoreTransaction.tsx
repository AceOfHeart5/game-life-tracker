import { EntityId } from "@reduxjs/toolkit";
import { useAppSelector } from "../hooks";
import { selectPlayerById } from "../state/playerSlice";
import { selectScoreTransactionById } from "../state/scoreTransactionSlice";
import { Typography } from "@mui/material";

interface ScoreTransactionProps {
    transactionId: EntityId,
}

const ScoreTransaction = ({ transactionId }: ScoreTransactionProps) => {
    const transaction = useAppSelector(s => selectScoreTransactionById(s, transactionId));
    if (transaction === undefined) return null;
    const player = useAppSelector(s => selectPlayerById(s.players, transaction.playerId));
    if (player === undefined) return null;

    return <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
        <Typography>{player.name}</Typography>
        <Typography>{transaction.type}</Typography>
        <Typography>{transaction.value}</Typography>
    </div>;
}

export default ScoreTransaction;