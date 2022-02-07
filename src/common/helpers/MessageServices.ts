import { Subject } from 'rxjs';
import { ReceivedMessage } from '../../types';

const subject = new Subject<ReceivedMessage |null>();

export const messageService = {
    sendMessage: (message: ReceivedMessage) => subject.next(message),
    clearMessages: () => subject.next(null),
    getMessage: () => subject.asObservable()
};