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
  lessonCode: string;
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
  } | null;
};

export type LessonType = {
  examId: string;
  lessonContent: string;
  lessonMeetingUrl: string;
  lessonType: string; //"LuyenDe" | "LyThuyet";
  lessonCode: string; //according to filters
  startTime: string;
};

//export type LessonVariant = "LuyenDe" | "LyThuyet" | "LuyenDeChuong";
