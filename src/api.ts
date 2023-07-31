import { SERVER } from "./constants/url";
import axios from "axios";

export const getUpcomingLesson = async () =>
  axios.get(`${SERVER}/api/lessons/upcoming`);
export const getAllLesson = async () => axios.get(`${SERVER}/api/lessons`);
