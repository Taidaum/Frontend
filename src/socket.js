import {io} from 'socket.io-client';
import { getJwtToken } from '../src/Utils/token';

export const socket = () => io(process.env.REACT_APP_SOCKET_URL, {
    auth: {
        token: getJwtToken(),
    },
});