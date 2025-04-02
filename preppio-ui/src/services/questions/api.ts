import { api } from '../utils';
import { IQuestion } from '../interview/api';
import { getSessionToken } from '../../store/slices/authSlice';
import { store } from '../../store';  

export const updateQuestion = async (questionDto: IQuestion): Promise<IQuestion> => {
  const accessToken = getSessionToken(store.getState());
  if (!accessToken) {
    throw new Error('User not authenticated');
  }

  const response = await api.post(
    `/api/questions/update/${questionDto.id}`, 
    questionDto,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
  }); 
  return response.data;
};
