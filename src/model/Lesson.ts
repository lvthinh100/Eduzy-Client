export type ResultType = {
  studentId: string;
  studentAnswerSheet: string;
  score: number;
  coins: number;
  crowns1: number;
  crowns2: number;
  crowns3: number;
  ordinalNumber: number;
  rank: number;
  hasReceivedPrize: boolean;
};

export type UpcomingLessonType = {
  lessonContent: string;
  lessonType: string;
  startTime: string;
  lessonMeetingUrl: string;
  _id: string;
  examId: {
    duration: number;
    examCode: string;
    examType: string;
    name: string;
    price: number;
    subject: string;
    _id: string;
    listOfMainResult: ResultType[];
  };
};

export type LessonType = {
  examId: string;
  lessonContent: string;
  lessonMeetingUrl: string;
  lessonType: "LuyenDe" | "LyThuyet";
  startTime: string;
};
