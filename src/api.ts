import { SERVER } from './constants/url';
import axios from 'axios';
import {
  AnswerType,
  FetchAnswerIdType,
  FetchAnswerType,
  LBReqType,
  UpdateHardLevelType,
} from './model/Exam';
import { LoginData, SignUpData } from './model/Student';

export const getUpcomingLesson = async (type: string) =>
  axios.get(`${SERVER}/api/lessons/upcoming/${type}`);

export const getClosestUpcomingLesson = async () =>
  axios.get(`${SERVER}/api/lessons/upcoming`);

export const getPrevLesson = async (type: string) =>
  axios.get(`${SERVER}/api/lessons/prev/${type}`);

export const getAllLesson = async () => axios.get(`${SERVER}/api/lessons`);

export const signup = async (data: SignUpData) =>
  axios.post(`${SERVER}/api/auth/signup`, data, { withCredentials: true });

export const login = async (data: LoginData) =>
  axios.post(`${SERVER}/api/auth/login`, data, { withCredentials: true });

export const logout = async () =>
  axios.get(`${SERVER}/api/auth/logout`, { withCredentials: true });

export const getMe = async () =>
  axios.get(`${SERVER}/api/students/me`, { withCredentials: true });

export const updateProfile = async (data: FormData) =>
  axios.patch(`${SERVER}/api/students/updateMe`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  });

export const changePassword = async (data: { password: string }) =>
  axios.patch(`${SERVER}/api/students/updateMyPassword`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

// Exams
export const getExams = async () => axios.get(`${SERVER}/api/exams`);
export const getExamById = async (id: string) =>
  axios.get(`${SERVER}/api/exams/${id}`);

export const getExamByName = async (name: string) =>
  axios.get(`${SERVER}/api/exams/name/${name}`);

export const getExamsByType = async (type: string) =>
  axios.get(`${SERVER}/api/exams/type/${type}`);

export const registerExam = async (examId: string, studentId: string) => {
  const requestData = { examId, studentId };

  const response = await axios.post(
    `${SERVER}/api/exams/registerExam`,
    requestData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//Filters
export const getFilters = async () => axios.get(`${SERVER}/api/filters`);

//Answers

export const postAnswer = async (data: AnswerType) => {
  const requestData = data;
  const response = await axios.post(`${SERVER}/api/answer`, requestData);
  return response.data;
};

export const fetchAnswer = async (data: FetchAnswerType) => {
  const requestData = data;
  const response = await axios.post(`${SERVER}/api/answer/fetch`, requestData);
  return response.data;
}; //Dùng khi xem đáp án, lấy kết quả cao nhất

export const fetchAnswerById = async (data: FetchAnswerIdType) => {
  const requestData = data;
  const response = await axios.post(
    `${SERVER}/api/answer/fetchId`,
    requestData
  );
  return response.data;
}; //Dùng khi mới kiểm tra xong, cần lấy để xem phát thưởng chưa

export const updateHardLevel = async (data: UpdateHardLevelType) => {
  const requestData = data;
  const response = await axios.post(
    `${SERVER}/api/answer/updateHardLevel`,
    requestData
  );
  return response.data;
}; //Dùng khi sau kiểm tra, update đánh giá

//Leader Board

export const getStudentLBs = async (data: LBReqType) => {
  const requestData = data;
  const response = await axios.post(`${SERVER}/api/leaderBoard`, requestData);
  return response.data; // You can process the response as needed
};

//Feedback

export const postFb = async (data: {
  feedBack: string;
  student: string;
  exam: string;
}) => {
  const requestData = data;
  const response = await axios.post(`${SERVER}/api/feedBack`, requestData);
  return response.data; // You can process the response as needed
};
