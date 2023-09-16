// Libs
import React from "react";
import dayjs, { Dayjs } from "dayjs";

// UI
import { Box, Paper, Typography, Stack } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import CustomDay from "../../components/CustomComponent/CustomPickerDay";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

// Data
import { getAllLesson } from "../../api";
import { LessonType } from "../../model/Lesson";

const Schedule = () => {
  const targetDate = dayjs("2024-06-27");
  const [value, setValue] = React.useState<Dayjs | null>(dayjs());
  const [lessons, setLessons] = React.useState<[LessonType] | null>(null);

  React.useEffect(() => {
    const fetchAllLesson = async () => {
      const { data: response } = await getAllLesson();
      setLessons(response);
    };
    fetchAllLesson();
  }, []);

  const dayDifference = targetDate.diff(dayjs(), "day");

  return (
    <Box sx={{ textAlign: "center", p: 1, pt: 0.3, color: "#5A7F8F" }}>
      <Typography variant="subtitle2" fontFamily="SegoeUISemiBold">
        Ngày thi - Chính Thức - 27/6/2024
      </Typography>
      <Typography
        variant="subtitle2"
        fontSize="18px"
        fontWeight="bold"
        fontFamily="Century"
        mb="3px"
      >
        {dayDifference} ngày
      </Typography>
      <Paper
        sx={{
          backgroundColor: "#FDF5FA",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          color: "#494969",
        }}
      >
        {lessons && (
          <DateCalendar
            showDaysOutsideCurrentMonth
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slots={{ day: CustomDay }}
            slotProps={{
              day: {
                selectedDay: value,
                lessons,
              } as any,
            }}
          />
        )}

        <Stack direction="row" alignItems="center" sx={{ my: 1 }} gap={0.6}>
          <RadioButtonUncheckedIcon
            fontSize="small"
            sx={(theme) => ({
              color: "date.exam",
            })}
          />
          <Typography
            fontSize="14px"
            fontFamily="SegoeUISemiBold"
            color="date.exam"
            mr={1}
          >
            Kiểm tra
          </Typography>
          <RadioButtonUncheckedIcon
            fontSize="small"
            sx={(theme) => ({
              color: "date.lesson",
            })}
          />
          <Typography
            fontSize="14px"
            fontFamily="SegoeUISemiBold"
            color="date.lesson"
          >
            Học Lý Thuyết
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Schedule;
