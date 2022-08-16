import React, {useContext} from "react";
import GameContext from "../gameContext";


export function Header() {

    const { dealerCount, playerCount, betAmount, chipCount, turn, isGameStarted, isCurrentPlayerTurn } = useContext(GameContext);


    return (
        <header className="app-header">
            <p className="title">Welcome To Blackjack</p>
            {isGameStarted && (
                <>
                    <p className="pending-bet">
                        The Bet:{" "}
                        <div
                            className="chip-number"
                            id={
                                betAmount === 0
                                    ? "attention-green"
                                    : "normal-text"
                            }
                        >
                            {betAmount}
                        </div>
                    </p>
                    {turn === 'player' && isCurrentPlayerTurn && isGameStarted && <p>Your Remaining Chips: {chipCount}</p>}
                </>
            )}

        </header>

    )
}