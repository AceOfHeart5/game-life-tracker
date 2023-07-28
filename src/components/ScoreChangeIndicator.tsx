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

    if (inProgressTransaction === null) return null;

    const row = orientation === "row";
    const plus = inProgressTransaction.value >= 0;

    const getPositions = () => {
        const result: React.CSSProperties = {};
        let translateX: string = "0%";
        let translateY: string = "0%";
        if (row) {
            result.left = "50%";
            translateX = "-50%";
            if (plus) {
                result.top = 0;
            } else {
                result.bottom = 0;
            }
        } else {
            result.top = "50%";
            translateY = "-50%";
            if (plus) {
                result.right = 0;
            } else {
                result.left = 0;
            }
        }
        result.transform = `translateX(${translateX}) translateY(${translateY})`;
        return result;
    }

    return <div
        id={adjustmentIndicatorId}
        style={{
            position: "absolute",
            fontSize: 40,
            color: "#fff",
            opacity: 0,
            ...getPositions(),
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
