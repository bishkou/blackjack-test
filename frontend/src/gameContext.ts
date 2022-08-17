import React from "react";
import {IPlayCards} from "./App";

export interface IGameContextProps {
    isInRoom: boolean;
    setInRoom: (inRoom: boolean) => void;
    roomId: string;
    setRoomId: (room :string) => void;
    playersCards: Array<string>;
    dealersCards: Array<string>;
    setPlayersCards: (cards : Array<string>) => void;
    setDealersCards: (cards : Array<string>) => void;
    isCurrentPlayerTurn: boolean;
    setIsCurrentPlayerTurn: (turn :boolean) => void;
    isGameStarted: boolean;
    setGameStarted: (started :boolean) => void;
    dealerCount: number;
    setDealerCount: (count: number) => void;
    playerCount: number;
    setPlayerCount: (count: number) => void;
    betAmount: number;
    setBetAmount: (bet: number) => void;
    turn: string,
    setTurn: (turn: string) => void;
    end: boolean,
    setEnd: (end :boolean) => void;
    lockedBet: number;
    setLockedBet: (bet: number) => void;
    randomizedDecks: IPlayCards;
    setRandomizedDecks: (cards: IPlayCards) => void;
    stay: boolean;
    setStay: (stay: boolean) => void;
    dealerStayed: boolean;
    setDealerStayed: (turn :boolean) => void;
    chipCount: number;
    setChipCount: (count: number) => void;
    didDouble: boolean;
    setDidDouble: (double: boolean) => void;
    hideDealerCards: boolean,
    setHideDealerCards: (hide: boolean) => void;
    hidePlayerCards: boolean,
    setHidePlayerCards: (hide: boolean) => void;


}

const defaultState: IGameContextProps = {
    isInRoom: false,
    setInRoom: () => {},
    roomId: '',
    setRoomId: () => {},
    playersCards: [],
    setPlayersCards: () => {},
    dealersCards: [],
    setDealersCards: () => {},
    isCurrentPlayerTurn: false,
    setIsCurrentPlayerTurn: ()  => {},
    isGameStarted: false,
    setGameStarted: ()  => {},
    dealerCount: 0,
    setDealerCount: () => {},
    playerCount: 0,
    setPlayerCount: () => {},
    betAmount: 0,
    setBetAmount: () => {},
    turn: 'player',
    setTurn: () => {},
    end: false,
    setEnd: () => {},
    lockedBet: 0,
    setLockedBet: () => {},
    randomizedDecks: [],
    setRandomizedDecks: () => {},
    stay: false,
    setStay: () => {},
    dealerStayed: false,
    setDealerStayed: () => {},
    chipCount: 1000,
    setChipCount: () => {},
    didDouble: false,
    setDidDouble: () => {},
    hideDealerCards: false,
    setHideDealerCards: () => {},
    hidePlayerCards: false,
    setHidePlayerCards: () => {}


};

export default React.createContext(defaultState);
