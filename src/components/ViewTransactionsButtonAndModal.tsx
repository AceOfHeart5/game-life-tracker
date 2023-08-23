import { Modal } from "@mui/material";
import { EntityId } from "@reduxjs/toolkit";
import Button from "./Button";
import { useState } from "react";
import { useAppSelector } from "../hooks";
import { selectScoreTransactionsByPlayerIds } from "../state/scoreTransactionSlice";
import ScoreTransaction from "./ScoreTransaction";
import ModalContentWrapper from "./ModalContentWrapper";

interface ViewTransactionsButtonAndModalProps {
    playerIds: EntityId[],
    buttonText: string,
}

const ViewTransactionsButtonAndModal = ({ playerIds, buttonText }: ViewTransactionsButtonAndModalProps) => {
    const [open, setOpen] = useState(false);
    const transactions = useAppSelector(s => selectScoreTransactionsByPlayerIds(s, playerIds));

    return <div>
        <Button onClick={() => setOpen(true)}>{buttonText}</Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <ModalContentWrapper>
                {transactions.map(t => t === undefined ? null : <ScoreTransaction transactionId={t.id}/>)}
                <Button
                    sx={{ alignSelf: "end" }}
                    onClick={() => setOpen(false)}
                >close</Button>
            </ModalContentWrapper>
        </Modal>
    </div>;
};

export default ViewTransactionsButtonAndModal;
