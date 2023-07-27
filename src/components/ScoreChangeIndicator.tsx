import { EntityId } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../hooks";
import { scoreTransactionInProgressSet, selectScoreTransactionInProgressByPlayerId } from "../state/scoreTransactionInProgressSlice";
import { scoreTransactionAdd } from "../state/scoreTransactionSlice";
import { useEffect } from "react";
import { Orientation } from "../constants";

interface ScoreChangeIndicatorProps {
    playerId: EntityId,
    orientation: Orientation,
}

const ScoreChangeIndicator = ({ playerId, orientation }: ScoreChangeIndicatorProps) => {
    const dispatch = useAppDispatch();
    const selectedInProgressTransaction = useAppSelector(s => selectScoreTransactionInProgressByPlayerId(s, playerId))?.scoreTransaction;
    const inProgressTransaction = selectedInProgressTransaction !== null && selectedInProgressTransaction !== undefined ? selectedInProgressTransaction : null;
    const adjustmentIndicatorId = `player-${playerId}score-adjustment-indicator`;

    useEffect(() => {
        if (inProgressTransaction === null) return;
        const adjustmentIndicator = document.getElementById(adjustmentIndicatorId);
        if (adjustmentIndicator === null) return;
        // here we restart the score adjustment CSS animation by removing it, reflowing the DOM, and re-adding it
        adjustmentIndicator.style.animation = "none";
        void adjustmentIndicator.offsetWidth; // requesting offsetWidth/offsetHeight triggers DOM reflow
        adjustmentIndicator.style.animation = "2s disappear";
    }, [adjustmentIndicatorId, inProgressTransaction]);

    const row = orientation === "row";

    return inProgressTransaction === null ? null : 
    <div
        id={adjustmentIndicatorId}
        style={{
            position: "absolute",
            padding: "0 30px",
            fontSize: 52,
            top: row ? "50%" : 0,
            left: row ? "100%" : "50%",
            transform: `translateX(${row ? "-100%" : "-50%"}) translateY(${row ? "-50%" : "0"})`,
            color: "#fff",
            opacity: 0,
        }}
        onAnimationEnd={() => {
            dispatch(scoreTransactionAdd({ playerId, ...inProgressTransaction}));
            dispatch(scoreTransactionInProgressSet({ playerId, scoreTransaction: null }));
        }}
    >
        {(inProgressTransaction.value >= 0 ? "+" : "-") + Math.abs(inProgressTransaction.value)}
    </div>
};

export default ScoreChangeIndicator;
