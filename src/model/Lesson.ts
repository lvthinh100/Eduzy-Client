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
  } | null;
};

export type LessonType = {
  examId: {
    duration: number;
    examCode: string;
    examType: string;
    name: string;
    normalizedName: string;
    price: number;
    subject: string;
    _id: string;
  } | null;
  lessonContent: string;
  lessonMeetingUrl: string;
  lessonType: string; //"LuyenDe" | "LyThuyet";
  lessonCode: string; //according to filters
  startTime: string;
};

//export type LessonVariant = "LuyenDe" | "LyThuyet" | "LuyenDeChuong";
