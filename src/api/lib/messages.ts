import { IMessage } from '@/models/message.model';
import api from '../api';

const sendMessage = async (payload: Partial<IMessage>) => {
  try {
    const res = await api.post('/messages/register', payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const listMessages = async (): Promise<IMessage[]> => {
  try {
    const res = await api.get('/messages/list');
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { sendMessage, listMessages };
