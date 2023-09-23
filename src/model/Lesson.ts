// export type ResultType = {
//   student: string;
//   studentName: string;
//   exam: string;
//   type: string;
//   answer: string;
//   score: number;
//   coins: number;
//   crown1: number;
//   crown2: number;
//   crown3: number;
//   rank: number;
// };

// export const defaultResult: ResultType = {
//   student: "",
//   studentName: "",
//   exam: "",
//   type: "",
//   answer: "",
//   score: 0,
//   coins: 0,
//   crown1: 0,
//   crown2: 0,
//   crown3: 0,
//   rank: 0,
// };

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
    normalizedName: string;
    price: number;
    subject: string;
    _id: string;
    //listOfMainResult: ResultType[];
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
