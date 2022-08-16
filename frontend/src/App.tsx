import React, {useEffect, useState} from "react";
import "./App.css";
import socketService from './services/socketService';
import gameService from './services/gameService';
import {JoinRoom} from "./components/JoinRoom";
import GameContext, {IGameContextProps} from "./gameContext";
import {Game} from "./components/Game";
// @ts-ignore
import cardDraw from '../src/sounds/drawCard.mp3';
// @ts-ignore
import shuffleDeck from '../src/sounds/shuffleDeck.mp3';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";


export type IPlayCards = Array<string>;
export interface IStartGame {
    restart: boolean;
    start: boolean,
    newShuffle: Array<string>,
    playersCards: Array<string>,
    dealersCards: Array<string>,
    isCurrentPlayerTurn: boolean,
    isDealerTurn: boolean
}

function App () {
    const [dealersCards, setDealersCards] = useState<IPlayCards>([]);
    const [dealerCount, setDealerCount] = useState(0);
    const [playerCount, setPlayerCount] = useState(0);
    const [hideCard, setHideCard] = useState(true);
    const [isDealersTurn, setIsDealersTurn] = useState(false);
    const [isCurrentPlayerTurn, setIsCurrentPlayerTurn] = useState(false);
    const [playersCards, setPlayersCards] = useState<IPlayCards>([]);
    const [randomizedDecks, setRandomizedDecks] = useState<IPlayCards>([]);
    const [isGameStarted, setGameStarted] = useState(false);
    const [turn, setTurn] = useState('player');
    const [stay, setStay] = useState(false);
    const [end, setEnd] = useState(false);
    const [dealerStayed, setDealerStayed] = useState(false);
    const [endMessage, setEndMessage] = useState('');
    const [roomId, setRoomId] = useState('');
    const [lockedBet, setLockedBet] = useState(0);
    const [chipCount, setChipCount] = useState(1000);
    const [betAmount, setBetAmount] = useState(0);
    const [isInRoom, setInRoom] = useState(false);
    const [didDouble, setDidDouble] = useState(false);


    const gameContextValue: IGameContextProps = {
        isInRoom,
        setInRoom,
        roomId,
        setRoomId,
        dealersCards,
        playersCards,
        setDealersCards,
        setPlayersCards,
        isCurrentPlayerTurn,
        setIsCurrentPlayerTurn,
        isGameStarted,
        setGameStarted,
        dealerCount,
        setDealerCount,
        playerCount,
        setPlayerCount,
        betAmount,
        setBetAmount,
        end,
        setEnd,
        turn,
        setTurn,
        lockedBet,
        setLockedBet,
        randomizedDecks,
        setRandomizedDecks,
        stay,
        setStay,
        dealerStayed,
        setDealerStayed,
        chipCount,
        setChipCount,
        didDouble,
        setDidDouble,
    }


    const audio = new Audio();

  const connectSocket= async () => {
    const socket = socketService.connect('http://localhost:9001')
        .catch((error) => {
          console.log('Error: ', error);
        })
  }

    useEffect( () => {
        connectSocket();
        handleGameStart()
        handleGameUpdate()
        handleGameWin()
        handleSendSound()
        handleSendBet()
    }, []);

    useEffect(() => {
        checkGame();
    }, [playersCards, dealersCards,dealerStayed]);

    useEffect(() => {
        if(lockedBet > 0){
            playSound(shuffleDeck);
            checkGame();
        }
    }, [lockedBet])

    const playSound = (sound: any) => {
        audio.src = sound;
        audio.play()
    }

    const handleSendBet = () => {
        if(socketService.socket) {
            gameService.onSendBet(socketService.socket,(bet) => {
                setBetAmount(bet);
                setLockedBet(bet);
                setChipCount(chipCount - bet);

            })
        }
    }

    const handScore = (who: string, hand: IPlayCards) => {
        let copyOfHand = [...hand];
        let sortedHand = copyOfHand.sort();
        let tenRegex = /^[JQK]|^10/;
        let numRegex = /^[2-9]/;
        let aceRegex = /^A/;
        let acesLast: any[] = [];
        sortedHand.forEach((card) => {
            if (aceRegex.test(card)) {
                acesLast.push(card);
            } else {
                acesLast.unshift(card);
            }
        });

        let handCount = 0;

        for (let i = 0; i < acesLast.length; i++) {
            if (tenRegex.test(acesLast[i])) {
                handCount += 10;
            } else if (numRegex.test(acesLast[i])) {
                handCount += parseInt(acesLast[i].match(numRegex)[0]);
            } else if (aceRegex.test(acesLast[i])) {
                if (handCount <= 10) {
                    handCount += 11;
                } else if (handCount + 11 > 21) {
                    handCount += 1;
                }
            }
        }

        if (who === "dealer") {
            setDealerCount(handCount);
        }
        if (who === "player") {
            setPlayerCount(handCount);
        }
        return handCount;
    };

    const handleGameUpdate = () => {
        if(socketService.socket){
            gameService.onGameUpdate(socketService.socket, (stay, turn, cards, currentDeck,lockedBet) => {
                if (turn === 'player') {
                    setPlayersCards(cards)
                    if (stay === 'stay') {
                        setTurn('dealer');
                        setIsDealersTurn(true);
                    } else if (stay === 'double' && lockedBet) {
                        setRandomizedDecks(currentDeck);
                        setDidDouble(true);
                        setChipCount(chipCount - lockedBet);
                        setLockedBet(lockedBet)
                        setBetAmount(lockedBet)
                        setIsDealersTurn(true);
                        setTurn('dealer');
                    }
                } else {
                    setDealersCards(cards);
                    if (stay === 'stay'){
                        setDealerStayed(true)
                        setTurn('player');
                        setIsDealersTurn(false);
                        setHideCard(false)
                    }
                }
                setRandomizedDecks(currentDeck);
                if (stay === 'stay' || stay === 'double') {
                    setIsCurrentPlayerTurn(true);
                }

            })
        }

    }

    const handleSendSound = () => {
        if(socketService.socket){
            gameService.onSendSound(socketService.socket,(sound) => {
                playSound(sound)
            })
        }
    }

    const handleGameStart = async () => {
        if(socketService.socket){
            gameService.onStartGame(socketService.socket, (options) => {
                setGameStarted(true);
                if (options.start) {
                    setIsCurrentPlayerTurn(true)
                } else
                    setIsCurrentPlayerTurn(false)
                setPlayersCards(options.playersCards)
                setDealersCards(options.dealersCards)
                setRandomizedDecks(options.newShuffle);
            })

        }
    }

    const handleGameWin = () => {
        if (socketService.socket){
            gameService.onGameWin(socketService.socket, (message => {
                setIsCurrentPlayerTurn(false);
                setEnd(true);
                setEndMessage(message);
            }))
        }
    }

    const checkGame = () => {
        const dealerScore = handScore("dealer", dealersCards);
        const playerScore = handScore("player", playersCards);
        if (socketService.socket && lockedBet > 0) {

            if (dealerScore === playerScore && dealerStayed){
                gameService.gameWin(socketService.socket, 'a TIE')
            } else if (dealerScore >= 21){
                if (dealerScore === 21){
                    gameService.gameWin(socketService.socket, 'Dealer WON')
                } else {
                    gameService.gameWin(socketService.socket, 'Player Won')
                }

            } else if (playerScore >= 21){
                if (playerScore === 21){
                    gameService.gameWin(socketService.socket, 'Player WON')
                } else {
                    gameService.gameWin(socketService.socket, 'Dealer Won')
                }

            } else if (dealerScore >= 17 && dealerStayed) {
                if (dealerScore > playerScore) {
                    gameService.gameWin(socketService.socket, 'Dealer Wins')
                } else {
                    gameService.gameWin(socketService.socket, 'Player Wins')
                }
            }
        }

    }


  return (
      <div className="app">
      <GameContext.Provider value={gameContextValue}>

          <Header/>

          {!isInRoom ? <JoinRoom/> :
              <Game
                    playersCards={playersCards}
                    dealersCards={dealersCards}
                    isDealersTurn={isDealersTurn}
                    hideCard={hideCard}
                    message={endMessage}
              />
          }

        <Footer/>

      </GameContext.Provider>
      </div>
  );
}

export default App;
