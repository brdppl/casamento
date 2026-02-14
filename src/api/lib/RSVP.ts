import { IGuest } from '@/models/guest.model';
import api from '../api';

const confirmPresence = async (payload: IGuest) => {
  try {
    const res = await api.post('/guests/register', payload);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { confirmPresence };
