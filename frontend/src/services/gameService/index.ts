import {Socket} from "socket.io-client";
import {IPlayCards, IStartGame} from "../../App";

class GameService {

    public async joinGameRoom(socket: Socket | null, roomId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (socket) {
                socket.emit('join_game', { roomId });
                socket.on('room_joined', () => resolve(true));
                socket.on('room_join_error', ({ error }) => reject(error));
            }

        })
    }

    public async updateGame(socket: Socket, action: string, turn: string, cards: IPlayCards, currentDeck: IPlayCards, lockedBet?: number) {
        socket.emit('update_game', {action, turn, cards, currentDeck, lockedBet})
    }

    public async onGameUpdate(socket: Socket, listener: (action: string, turn: string, cards: IPlayCards, currentDeck: IPlayCards, lockedBet?: number) => void) {
        socket.on('on_game_update', ({ action, turn, cards, currentDeck, lockedBet }) => listener(action, turn, cards, currentDeck, lockedBet))

    }

    public async onStartGame(socket: Socket, listener: (options: IStartGame) => void) {
        socket.on('start_game', listener)
    }

    public async gameWin(socket: Socket, message: string) {
        socket.emit('game_win', {message})
    }

    public async onGameWin(socket: Socket, listener: (message: string) => void) {
        socket.on('on_game_win', ({ message }) => listener(message))
    }

    public async sendSound(socket: Socket, sound: any) {
        socket.emit('send_sound', {sound})

    }

    public async onSendSound(socket: Socket, listener: (sound: number) => void) {
        socket.on('on_send_sound', ({ sound }) => listener(sound))

    }

    public async sendBet(socket: Socket, sound: any) {
        socket.emit('send_bet', {sound})

    }

    public async onSendBet(socket: Socket, listener: (bet: number) => void) {
        socket.on('on_send_bet', ({ sound }) => listener(sound))

    }
}

export default new GameService();