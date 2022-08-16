import {
    ConnectedSocket,
    MessageBody,
    OnMessage,
    SocketController,
    SocketIO,
} from "socket-controllers";
import { Server, Socket } from "socket.io";
import {shuffle} from "lodash";


@SocketController()
export class RoomController {
    @OnMessage("join_game")
    public async joinGame(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any
    ) {

        const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
        const socketRooms = Array.from(socket.rooms.values()).filter(
            (r) => r !== socket.id
        );

        if (
            socketRooms.length > 0 ||
            (connectedSockets && connectedSockets.size === 2)
        ) {
            socket.emit("room_join_error", {
                error: "Room is full please choose another room to play!",
            });
        } else {
            await socket.join(message.roomId);
            socket.emit("room_joined");

            if (io.sockets.adapter.rooms.get(message.roomId).size === 2) {
                const { newShuffle, playersCards, dealersCards } = shuffleDeck();
                socket.emit("start_game", {
                    start: true,
                    newShuffle,
                    playersCards,
                    dealersCards,
                    isCurrentPlayerTurn: true,
                    isDealerTurn: false
                });
                socket
                    .to(message.roomId)
                    .emit("start_game", {
                        start: false,
                        newShuffle,
                        playersCards,
                        dealersCards,
                        isCurrentPlayerTurn: false,
                        isDealerTurn: true
                    });
            }
        }
    }

}

export type IPlayCards = Array<string>;

const deckOfCards: IPlayCards = [
    "AH",
    "2H",
    "3H",
    "4H",
    "5H",
    "6H",
    "7H",
    "8H",
    "9H",
    "10H",
    "JH",
    "QH",
    "KH",
    "AC",
    "2C",
    "3C",
    "4C",
    "5C",
    "6C",
    "7C",
    "8C",
    "9C",
    "10C",
    "JC",
    "QC",
    "KC",
    "AD",
    "2D",
    "3D",
    "4D",
    "5D",
    "6D",
    "7D",
    "8D",
    "9D",
    "10D",
    "JD",
    "QD",
    "KD",
    "AS",
    "2S",
    "3S",
    "4S",
    "5S",
    "6S",
    "7S",
    "8S",
    "9S",
    "10S",
    "JS",
    "QS",
    "KS",
];

const twoDecks: IPlayCards = [...deckOfCards, ...deckOfCards];

const shuffleDeck = () => {
    const newShuffle = shuffle(twoDecks);
    const newFirstFour = newShuffle.splice(0, 4);
    // @ts-ignore
    // setRandomizedDecks(newShuffle);
    // @ts-ignore
    // setPlayersCards([newFirstFour[0], newFirstFour[2]]);
    // @ts-ignore
    // setDealersCards([newFirstFour[1], newFirstFour[3]]);
    return {
        newShuffle,
        playersCards: [newFirstFour[0], newFirstFour[2]],
        dealersCards: [newFirstFour[1], newFirstFour[3]]
    }

};
