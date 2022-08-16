import React, {useContext} from "react";
import "../stylesheets/Game.css";
import CardBack from "../images/card-back.png";
import BlankChip from "../images/blank-chip.png";
import AceOfH from "../images/AH.png";
import TwoOfH from "../images/2H.png";
import ThreeOfH from "../images/3H.png";
import FourOfH from "../images/4H.png";
import FiveOfH from "../images/5H.png";
import SixOfH from "../images/6H.png";
import SevenOfH from "../images/7H.png";
import EightOfH from "../images/8H.png";
import NineOfH from "../images/9H.png";
import TenOfH from "../images/10H.png";
import JackOfH from "../images/JH.png";
import QueenOfH from "../images/QH.png";
import KingOfH from "../images/KH.png";
import AceOfC from "../images/AC.png";
import TwoOfC from "../images/2C.png";
import ThreeOfC from "../images/3C.png";
import FourOfC from "../images/4C.png";
import FiveOfC from "../images/5C.png";
import SixOfC from "../images/6C.png";
import SevenOfC from "../images/7C.png";
import EightOfC from "../images/8C.png";
import NineOfC from "../images/9C.png";
import TenOfC from "../images/10C.png";
import JackOfC from "../images/JC.png";
import QueenOfC from "../images/QC.png";
import KingOfC from "../images/KC.png";
import AceOfD from "../images/AD.png";
import TwoOfD from "../images/2D.png";
import ThreeOfD from "../images/3D.png";
import FourOfD from "../images/4D.png";
import FiveOfD from "../images/5D.png";
import SixOfD from "../images/6D.png";
import SevenOfD from "../images/7D.png";
import EightOfD from "../images/8D.png";
import NineOfD from "../images/9D.png";
import TenOfD from "../images/10D.png";
import JackOfD from "../images/JD.png";
import QueenOfD from "../images/QD.png";
import KingOfD from "../images/KD.png";
import AceOfS from "../images/AS.png";
import TwoOfS from "../images/2S.png";
import ThreeOfS from "../images/3S.png";
import FourOfS from "../images/4S.png";
import FiveOfS from "../images/5S.png";
import SixOfS from "../images/6S.png";
import SevenOfS from "../images/7S.png";
import EightOfS from "../images/8S.png";
import NineOfS from "../images/9S.png";
import TenOfS from "../images/10S.png";
import JackOfS from "../images/JS.png";
import QueenOfS from "../images/QS.png";
import KingOfS from "../images/KS.png";
import gameContext from "../gameContext";


export function Game ({isDealersTurn, hideCard, dealersCards, playersCards, message}) {

    const {isCurrentPlayerTurn, lockedBet, end, isGameStarted, didDouble} = useContext(gameContext);

    const whichImages = (who: string, cards: any[]) => {
        return cards.map((card) => {
            let findImage;
            switch (card) {
                case "AH":
                    findImage = AceOfH;
                    break;
                case "2H":
                    findImage = TwoOfH;
                    break;
                case "3H":
                    findImage = ThreeOfH;
                    break;
                case "4H":
                    findImage = FourOfH;
                    break;
                case "5H":
                    findImage = FiveOfH;
                    break;
                case "6H":
                    findImage = SixOfH;
                    break;
                case "7H":
                    findImage = SevenOfH;
                    break;
                case "8H":
                    findImage = EightOfH;
                    break;
                case "9H":
                    findImage = NineOfH;
                    break;
                case "10H":
                    findImage = TenOfH;
                    break;
                case "JH":
                    findImage = JackOfH;
                    break;
                case "QH":
                    findImage = QueenOfH;
                    break;
                case "KH":
                    findImage = KingOfH;
                    break;
                case "AC":
                    findImage = AceOfC;
                    break;
                case "2C":
                    findImage = TwoOfC;
                    break;
                case "3C":
                    findImage = ThreeOfC;
                    break;
                case "4C":
                    findImage = FourOfC;
                    break;
                case "5C":
                    findImage = FiveOfC;
                    break;
                case "6C":
                    findImage = SixOfC;
                    break;
                case "7C":
                    findImage = SevenOfC;
                    break;
                case "8C":
                    findImage = EightOfC;
                    break;
                case "9C":
                    findImage = NineOfC;
                    break;
                case "10C":
                    findImage = TenOfC;
                    break;
                case "JC":
                    findImage = JackOfC;
                    break;
                case "QC":
                    findImage = QueenOfC;
                    break;
                case "KC":
                    findImage = KingOfC;
                    break;
                case "AD":
                    findImage = AceOfD;
                    break;
                case "2D":
                    findImage = TwoOfD;
                    break;
                case "3D":
                    findImage = ThreeOfD;
                    break;
                case "4D":
                    findImage = FourOfD;
                    break;
                case "5D":
                    findImage = FiveOfD;
                    break;
                case "6D":
                    findImage = SixOfD;
                    break;
                case "7D":
                    findImage = SevenOfD;
                    break;
                case "8D":
                    findImage = EightOfD;
                    break;
                case "9D":
                    findImage = NineOfD;
                    break;
                case "10D":
                    findImage = TenOfD;
                    break;
                case "JD":
                    findImage = JackOfD;
                    break;
                case "QD":
                    findImage = QueenOfD;
                    break;
                case "KD":
                    findImage = KingOfD;
                    break;
                case "AS":
                    findImage = AceOfS;
                    break;
                case "2S":
                    findImage = TwoOfS;
                    break;
                case "3S":
                    findImage = ThreeOfS;
                    break;
                case "4S":
                    findImage = FourOfS;
                    break;
                case "5S":
                    findImage = FiveOfS;
                    break;
                case "6S":
                    findImage = SixOfS;
                    break;
                case "7S":
                    findImage = SevenOfS;
                    break;
                case "8S":
                    findImage = EightOfS;
                    break;
                case "9S":
                    findImage = NineOfS;
                    break;
                case "10S":
                    findImage = TenOfS;
                    break;
                case "JS":
                    findImage = JackOfS;
                    break;
                case "QS":
                    findImage = QueenOfS;
                    break;
                case "KS":
                    findImage = KingOfS;
                    break;
            }
            if (who === "dealer" && cards.indexOf(card) > 0) {
                return (
                    <img
                        className="card-img"
                        alt={card}
                        src={hideCard && !isDealersTurn && !end ? CardBack : findImage}
                    />
                );
            }
            return (
                <img
                    className={
                        didDouble && cards.indexOf(card) === 2 && who === "player"
                        ? "sideways-double-card"
                        : "card-img"
                    }
                    alt={card}
                    src={findImage}
                />
            );
        });
    };


    return (
        <>
            {!end && isGameStarted && (isCurrentPlayerTurn? <p>IT'S YOUR TURN</p> : <p>WAITING FOR THE OTHER PLAYER TO PLAY</p>) }
            <div className="game-div">
                {!isGameStarted && <h2>Waiting for second player to join</h2>}
                {isGameStarted && lockedBet > 0 && (
                    <>
                        <div className="dealers-cards-div">
                            {whichImages("dealer", dealersCards)}
                        </div>
                        <div className={'chip-or-message'}>
                            {end && <h1 className="result-message">{message}</h1>}
                            <div className="empty-chip-container">
                                <div className="locked-bet-amount">
                                    {lockedBet}
                                </div>
                                <img
                                    className="locked-bet-img"
                                    src={BlankChip}
                                    />
                            </div>

                        </div>
                        <div className="players-cards-div">
                            {whichImages("player", playersCards)}
                        </div>
                    </>
                )}

            </div>
        </>
    )
}

