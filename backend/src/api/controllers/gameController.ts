import {ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO} from "socket-controllers";
import {Server, Socket} from "socket.io";


@SocketController()
export class GameController {

    private getSocketGameRoom(socket: Socket): string {
        const socketRooms = Array.from(socket.rooms.values()).filter(room => room !== socket.id);
        return socketRooms && socketRooms[0];
    }

    @OnMessage('update_game')
    public async updateGame(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        const gameRoom = this.getSocketGameRoom(socket);
        socket.to(gameRoom).emit('on_game_update', message)

    }

    @OnMessage('game_win')
    public async gameWin(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        const gameRoom = this.getSocketGameRoom(socket);
        socket.to(gameRoom).emit('on_game_win', message)

    }

    @OnMessage('send_sound')
    public async sendSound(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        const gameRoom = this.getSocketGameRoom(socket);
        socket.to(gameRoom).emit('on_send_sound', message)

    }

    @OnMessage('send_bet')
    public async sendBet(@SocketIO() io: Server, @ConnectedSocket() socket: Socket, @MessageBody() message: any) {
        const gameRoom = this.getSocketGameRoom(socket);
        socket.to(gameRoom).emit('on_send_bet', message)

    }


}