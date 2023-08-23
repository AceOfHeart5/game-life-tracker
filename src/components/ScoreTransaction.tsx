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
    const { type, value, playerId } = transaction;
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));
    if (player === undefined) return null;

    return <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
        <Typography>{player.name}</Typography>
        <Typography>{type}</Typography>
        <Typography>{type === "set" ? value : `${value >= 0 ? "+" : "-"}${Math.abs(value)}`}</Typography>
    </div>;
}

export default ScoreTransaction;
