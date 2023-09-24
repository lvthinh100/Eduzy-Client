export type UpcomingLessonType = {
  lessonContent: string;
  lessonType: string;
  lessonCode: string;
  startTime: string;
  duration: number;
  subject: string;
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
