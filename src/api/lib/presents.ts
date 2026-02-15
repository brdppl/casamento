import { IPresent } from '@/models/present.model';
import api from '../api';

const checkoutPresent = async (id: string) => {
  try {
    const res = await api.post(`/presents/${id}/checkout/v1`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const checkoutPresentV2 = async (id: string) => {
  try {
    const res = await api.post(`/presents/${id}/checkout/v2`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const checkoutPresentV3 = async (id: string) => {
  try {
    const res = await api.post(`/presents/${id}/checkout/v3`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const listPresents = async (): Promise<IPresent[]> => {
  try {
    const res = await api.get('/presents/list');
    return res.data;
  } catch (error) {
    throw error;
  }
};

const listOnePresent = async (id: string): Promise<IPresent> => {
  try {
    const res = await api.get(`/presents/list/${id}/present`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  checkoutPresent,
  checkoutPresentV2,
  checkoutPresentV3,
  listPresents,
  listOnePresent,
};
