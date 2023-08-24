import { Dialog, Typography } from "@mui/material";
import Button from "./Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { STARTING_PLAYERS, playerRemoveAll, selectPlayerAllIds } from "../state/playerSlice";
import { scoreTransactionRemoveAll } from "../state/scoreTransactionSlice";
import { scoreTransactionInProgressRemoveAll } from "../state/scoreTransactionInProgressSlice";
import { playerAdd } from "../state/multiSliceActions";
import ViewTransactionsButtonAndModal from "./ViewTransactionsButtonAndModal";
import { DialogPaperSX } from "../utilsAndConstants";
import SetPlayerScoreButtonAndModal from "./SetPlayerScoreButtonAndModal";

const EditGameButtonAndModal = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);
    const playerIds = useAppSelector(s => selectPlayerAllIds(s.players));

    return <>
        <Button onClick={() => setOpen(true)}>Edit Game</Button>
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            PaperProps={{ sx: DialogPaperSX }}
        >
            <div style={{ display: "flex", gap: "8px", justifyContent: "space-between" }}>
                <div style={{ width: "50%" }}>
                    <Button onClick={() => {
                        dispatch(playerRemoveAll());
                        dispatch(scoreTransactionInProgressRemoveAll());
                        dispatch(scoreTransactionRemoveAll());
                        dispatch(playerAdd(STARTING_PLAYERS.player1, 0));
                        dispatch(playerAdd(STARTING_PLAYERS.player2, 0));
                    }}>Reset Game</Button>
                </div>
                <Typography sx={{ width: "50%" }}>Restart game with 2 players both at score of 0.</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
                <div style={{ width: "50%" }}>
                    <SetPlayerScoreButtonAndModal playerIds={playerIds}/>
                </div>
                <Typography sx={{ width: "50%" }}>Set the score of all players.</Typography>
            </div>
            <ViewTransactionsButtonAndModal buttonText="View Score Changes" playerIds={playerIds}/>
            <Button sx={{ alignSelf: "end" }} onClick={() => setOpen(false)}>close</Button>
        </Dialog>
    </>;
};

export default EditGameButtonAndModal;
