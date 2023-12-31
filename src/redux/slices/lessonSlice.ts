import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpcomingLessonType } from '../../model/Lesson';

const initialState = {
  upcoming: {} as UpcomingLessonType,
  code: 'LuyenDeTHPT',
  fetching: true,
};

const lessonSlice = createSlice({
  name: 'lesson',
  initialState,
  reducers: {
    setUpComingLesson(state, action: PayloadAction<UpcomingLessonType>) {
      state.upcoming = action.payload;
      state.code = action.payload.lessonCode;
      state.fetching = false;
    },
    changeLessonType(state, action) {
      state.code = action.payload;
    },
  },
});

export const lessonActions = lessonSlice.actions;
export default lessonSlice;
