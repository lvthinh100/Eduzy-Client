export type ExamType = {
  examCode: string; //"001"
  examType: string; //"LuyenDe"
  name: string; //"Đề luyện thi 1"
  subject: string; //"Vật Lý"
  duration: number; //"50" unit of minute
  price: number; //"2000" unit of Ecoin, 1 Ecoin = 1 VND
  questionUrl: string; //"https://drive.google.com/uc?id=17y60ASL4BJxipnyPOCz-ddDgUvejtSYn" - URL of GG Drive
  answerUrl: string; // "https://drive.google.com/uc?id=13DEVfMTfkZJT9Keme8L9J8nwEmsFy01X" - URL of GG Drive
  numberOfQuestion: number; // 40
  answerSheet: string; //"ABCDABCD..."
  isUpcoming: boolean;
  _id: string | null;
  startTime: string | null;
};

export type ResultType = {
  _id: string;
  student: string;
  studentName: string;
  exam: string;
  type: string;
  answer: string;
  score: string;
  coins: number;
  crown1: number;
  crown2: number;
  crown3: number;
  rank: string;
  isPrized: boolean;
};

export type AnswerType = {
  student: string | null;
  studentName: string;
  exam: string;
  answer: string;
  type: string;
};

export type FetchAnswerType = {
  student: string;
  exam: string;
};

export type FetchAnswerIdType = {
  _id: string;
  exam: string;
};

export type LBReqType = {
  type: string;
  examId?: string;
};

export const AnswerEnum = {
  main: "MAIN",
  sub: "SUB",
};

export const defaultResult: ResultType = {
  _id: "",
  student: "",
  studentName: "",
  exam: "",
  type: "",
  answer: "",
  score: "",
  coins: 0,
  crown1: 0,
  crown2: 0,
  crown3: 0,
  rank: "",
  isPrized: false,
};

export const defaultExam: ExamType = {
  examCode: "001",
  examType: "",
  name: "",
  subject: "",
  duration: 50,
  price: 0,
  questionUrl: "",
  answerUrl: "",
  numberOfQuestion: 40,
  answerSheet: "",
  isUpcoming: true,
  _id: null,
  startTime: null,
};
