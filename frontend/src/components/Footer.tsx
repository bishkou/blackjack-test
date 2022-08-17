import React, {useContext} from "react";
import GameContext from "../gameContext";
import socketService from '../services/socketService';
import gameService from '../services/gameService';
import Five from "../images/5-chip.png";
import TwentyFive from "../images/25-chip.png";
import OneHundred from "../images/100-chip.png";
import FiveHundred from "../images/500-chip.png";
import OneThousand from "../images/1000-chip.png";
import TenThousand from "../images/10k-chip.png";
import FiftyThousand from "../images/50k-chip.png";
// @ts-ignore
import cardDraw from "../sounds/drawCard.mp3";
// @ts-ignore
import shuffleDeck from "../sounds/shuffleDeck.mp3";
import {Chip} from "./Chip";

export function Footer() {

    const {
        dealerCount,
        betAmount,
        setBetAmount,
        isGameStarted,
        isCurrentPlayerTurn,
        setIsCurrentPlayerTurn,
        dealersCards,
        setDealersCards,
        playersCards,
        setPlayersCards,
        turn,
        end,
        lockedBet,
        setLockedBet,
        randomizedDecks,
        setRandomizedDecks,
        stay,
        setStay,
        setDealerStayed,
        chipCount,
        setChipCount,
        didDouble,
        setDidDouble
    } = useContext(GameContext);


    const audio = new Audio();

    const playSound = (sound: any) => {
        audio.src = sound;
        audio.play()
    }


    const handleBet = (bet) => {
        if (betAmount + bet <= chipCount && isGameStarted) {
            setBetAmount(betAmount + bet);
        }
    };

    const handleLockedBet = () => {
        if (betAmount > 0) {
            if(socketService.socket){
                gameService.sendBet(socketService.socket, betAmount);
                setLockedBet(betAmount);
                setChipCount(chipCount - betAmount);
                gameService.sendSound(socketService.socket, shuffleDeck);
                playSound(shuffleDeck)
            }
        }
    };

    const handleHitOrStay = (action: string) => {
        let currentDeck = [...randomizedDecks];
        let nextCard = currentDeck.splice(0, 1)[0];
        setRandomizedDecks(currentDeck);
        if (action === 'stay'){
            setStay(true);
            if (turn === 'dealer')
                setDealerStayed(true)
            if(socketService.socket) {
                const cards = turn === 'dealer' ? dealersCards : playersCards;
                gameService.updateGame(socketService.socket, 'stay', turn, cards, currentDeck);
            }
            setIsCurrentPlayerTurn(false);
            return;
        } else if (action === 'double') {
            if(socketService.socket) {
                setPlayersCards([...playersCards, nextCard]);
                gameService.updateGame(socketService.socket, 'double', 'player', [...playersCards, nextCard], currentDeck, lockedBet*2);
                setStay(true);
                gameService.sendSound(socketService.socket, cardDraw);
            }
            setIsCurrentPlayerTurn(false);

            return;
        }
        if(socketService.socket){
            if(turn === 'player'){
                setPlayersCards([...playersCards, nextCard]);
                gameService.updateGame(socketService.socket, 'hit', turn, [...playersCards, nextCard], currentDeck);
            } else {
                setDealersCards([...dealersCards, nextCard]);
                gameService.updateGame(socketService.socket, 'hit', turn, [...dealersCards, nextCard], currentDeck);

            }
            gameService.sendSound(socketService.socket, cardDraw);
            playSound(cardDraw);
        }
    }

    const handleDouble = () => {
        setDidDouble(true);
        setChipCount(chipCount - lockedBet);
        setLockedBet(lockedBet*2)
        setBetAmount(lockedBet*2)
        handleHitOrStay('double');
    }


    return (
        <>
            <div className="game-result-div">
                {!end && lockedBet > 0 &&
                (
                    <>
                        <button
                            className="betting-option"
                            onClick={() => handleHitOrStay('hit')}
                            disabled={(!isGameStarted || !isCurrentPlayerTurn || lockedBet === 0) || ((turn === 'dealer' && dealerCount >= 17))}
                        >
                            Hit
                        </button>

                        <button
                            className="betting-option"
                            onClick={() => handleHitOrStay('stay')}
                            disabled={(!isGameStarted || !isCurrentPlayerTurn || lockedBet === 0) || (turn === 'dealer' && dealerCount < 17)}
                        >
                            Stay
                        </button>
                        {turn === 'player' && isCurrentPlayerTurn && <button
                            className="betting-option"
                            id={
                                turn === 'player' &&
                                playersCards.length === 2 &&
                                chipCount >= lockedBet
                                    ? "ready-to-start"
                                    : "not-ready"
                            }
                            disabled={(!isGameStarted || !isCurrentPlayerTurn || lockedBet === 0)}
                            onClick={handleDouble}
                        >
                            Double
                        </button>}
                    </>
                )}

            </div>

            <div className="game-result-div">
                <section className="betting-options">
                    {(isGameStarted && lockedBet === 0 && isCurrentPlayerTurn && turn === 'player') ? (
                        <div className="inner-betting-options">
                            {chipCount >= 5 ? (
                                <Chip src={Five} handleBet={() => handleBet(5)}/>
                            ) : null}
                            {chipCount >= 25 ? (
                                <Chip src={TwentyFive} handleBet={() => handleBet(25)}/>
                            ) : null}
                            {chipCount >= 100 ? (
                                <Chip src={OneHundred} handleBet={() => handleBet(100)}/>
                            ) : null}
                            {chipCount >= 500 ? (
                                <Chip src={FiveHundred} handleBet={() => handleBet(500)}/>
                            ) : null}
                            {chipCount >= 1000 ? (
                                <Chip src={OneThousand} handleBet={() => handleBet(1000)}/>
                            ) : null}
                            {chipCount >= 10000 ? (
                                <Chip src={TenThousand} handleBet={() => handleBet(10000)}/>
                            ) : null}
                            {chipCount >= 50000 ? (
                                <Chip src={FiftyThousand} handleBet={() => handleBet(50000)}/>
                            ) : null}
                        </div>
                    ) : (
                        <></>
                    )}
                </section>
                {lockedBet === 0 && isCurrentPlayerTurn && turn === 'player' && <button
                    className="betting-option"
                    id={betAmount > 0 ? "ready-to-start" : "not-ready"}
                    disabled={(!isGameStarted || !isCurrentPlayerTurn)}
                    onClick={() => handleLockedBet()}
                >
                    Place Bet
                </button>}

            </div>
        </>
    )
}