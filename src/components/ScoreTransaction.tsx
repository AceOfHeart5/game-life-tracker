import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectPlayerById } from "../state/playerSlice";
import { scoreTransactionUpdate, selectScoreTransactionById } from "../state/scoreTransactionSlice";
import { Checkbox, Typography } from "@mui/material";

interface ScoreTransactionProps {
    transactionId: EntityId,
}

const ScoreTransaction = ({ transactionId }: ScoreTransactionProps) => {
    const dispatch = useAppDispatch();
    const transaction = useAppSelector(s => selectScoreTransactionById(s, transactionId));
    if (transaction === undefined) return null;
    const { type, value, playerId, canBeDisabled } = transaction;
    const player = useAppSelector(s => selectPlayerById(s.players, playerId));
    if (player === undefined) return null;

    return <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }}>
        <Typography>{player.name}</Typography>
        <Typography>{type}</Typography>
        <Typography>{type === "set" ? value : `${value >= 0 ? "+" : "-"}${Math.abs(value)}`}</Typography>
        <Checkbox disabled={!canBeDisabled} checked={transaction.active} onChange={e => {
            dispatch(scoreTransactionUpdate({
                id: transaction.id,
                changes: { active: e.target.checked },
            }));
        }}/>
    </div>;
}

export default ScoreTransaction;
