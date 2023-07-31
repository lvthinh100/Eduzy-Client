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
  };
};

export type LessonType = {
  examId: string;
  lessonContent: string;
  lessonMeetingUrl: string;
  lessonType: "LuyenDe" | "LyThuyet";
  startTime: string;
};
