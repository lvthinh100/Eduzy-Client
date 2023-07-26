import React from "react";
import CalendarContainer from "./CalendarContainer";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import CustomDay from "../../components/CustomComponent/CustomPickerDay";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

import dayjs, { Dayjs } from "dayjs";
const Schedule = () => {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));
  return (
    <Box sx={{ textAlign: "center", p: 1 }}>
      <Typography variant="subtitle2">
        Ngày thi - Chính Thức - 27/6/2024
      </Typography>
      <Typography variant="subtitle2" fontWeight="bold">
        347 ngày
      </Typography>
      <Paper
        sx={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <DateCalendar
          showDaysOutsideCurrentMonth
          value={value}
          onChange={(newValue) => setValue(newValue)}
          slots={{ day: CustomDay }}
          slotProps={{
            day: {
              selectedDay: value,
            } as any,
          }}
          sx={{
            margin: 0,
          }}
        />

        <Stack direction="row" alignItems="center" sx={{ my: 1 }} gap={1}>
          <RadioButtonUncheckedIcon
            fontSize="small"
            sx={(theme) => ({
              color: "date.exam",
            })}
          />
          <Typography>Kiểm tra</Typography>
          <RadioButtonUncheckedIcon
            fontSize="small"
            sx={(theme) => ({
              color: "date.lesson",
            })}
          />
          <Typography>Học Lý Thuyết</Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Schedule;
