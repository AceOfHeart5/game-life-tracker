import { Modal, Typography } from "@mui/material";
import Button from "./Button";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { STARTING_PLAYERS, playerRemoveAll, selectPlayerAllIds } from "../state/playerSlice";
import { selectAllPlayersSameScore } from "../state/multiSliceSelectors";
import { scoreTransactionAdd, scoreTransactionRemoveAll } from "../state/scoreTransactionSlice";
import { scoreTransactionInProgressRemoveAll } from "../state/scoreTransactionInProgressSlice";
import { playerAdd } from "../state/multiSliceActions";
import ViewTransactionsButtonAndModal from "./ViewTransactionsButtonAndModal";
import ModalContentWrapper from "./ModalContentWrapper";

const EditGameButtonAndModal = () => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const playerIds = useAppSelector(s => selectPlayerAllIds(s.players));
    const setAllPlayerScores = (s: number) => playerIds.forEach(id => dispatch(scoreTransactionAdd({
        playerId: id,
        type: "set",
        value: s,
    })));

    const currentAllPlayersScore = useAppSelector(selectAllPlayersSameScore);

    const [newPlayerScores, setNewPlayerScores] = useState(0);
    const newScoresValid = newPlayerScores === Math.floor(newPlayerScores);

    console.log({
        "all player score:": currentAllPlayersScore,
        "new score to set": newPlayerScores,
    });

    return <>
        <Button onClick={() => setOpen(true)}>Edit Game</Button>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <ModalContentWrapper>
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
                <div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <label style={{ width: "50%" }}><Typography>Set Player Scores: </Typography></label>
                        <input style={{ width: "50%" }} type="number" value={newPlayerScores} onChange={e => {
                            setNewPlayerScores(Number(e.target.value));
                        }}/>
                    </div>
                    <Typography sx={{ textAlign: "right", color: "#f00", visibility: newScoresValid ? "hidden" : "visible" }}>score must be integer</Typography>
                    <Button
                        disabled={!newScoresValid || currentAllPlayersScore === newPlayerScores}
                        onClick={() => setAllPlayerScores(newPlayerScores)}
                    >Set Scores</Button>
                </div>
                <ViewTransactionsButtonAndModal buttonText="View Score Changes" playerIds={playerIds}/>
                <Button sx={{ alignSelf: "end" }} onClick={() => setOpen(false)}>close</Button>
            </ModalContentWrapper>
        </Modal>
    </>;
};

export default EditGameButtonAndModal;
