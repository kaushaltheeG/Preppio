import axios from 'axios';
import { API_URL } from '../utils';

export const getJobQuestions = async (jobDescription: string) => {
  const response = await axios.post(`${API_URL}/job/questions`, { jobDescription });
  return response.data;
};
