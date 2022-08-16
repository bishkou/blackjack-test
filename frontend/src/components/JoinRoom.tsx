import React, {useContext, useState} from "react";
import GameContext from "../gameContext";
import socketService from '../services/socketService';
import gameService from '../services/gameService';

interface IJoinRoomProps {}

export function JoinRoom (props: IJoinRoomProps) {
    const [isJoining, setJoining] = useState(false);

    const { setInRoom, roomId, setRoomId } = useContext(GameContext);

    const handleroomIdChange = (e: React.ChangeEvent<any>) => {
        const value = e.target.value;
        setRoomId(value)
    }

    const joinRoom = async (e : React.FormEvent) => {
        e.preventDefault();
        const socket = socketService.socket;
        if(!roomId || roomId.trim() === '' || !socket) return;

        setJoining(true);
        const joined = await gameService.joinGameRoom(socket, roomId).catch((err: any) => {
            alert(err);
        })

        if (joined)
            setInRoom(true);
        setJoining(false);

    }

    return (
        <form className={'search-wrapper cf'} onSubmit={joinRoom}>
            <div>
                <h4 className={'join'}>Enter room ID to join a game</h4>
                <input type="text" placeholder={'ROOM ID'} value={roomId} onChange={handleroomIdChange}/>
                <button type={'submit'} disabled={isJoining}>{ isJoining ? 'Joining...' : 'Join'}</button>
            </div>    
        </form>
    )
}