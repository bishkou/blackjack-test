import React from "react";

export function Chip ({src, handleBet}) {
    return (
        <img
            src={src}
            onClick={handleBet}
            className="bet-button"
        />
    )
}