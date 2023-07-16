import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isExam: boolean;
  isLesson: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isExam" && prop !== "isLesson",
})<CustomPickerDayProps>(({ theme, isExam, isLesson }) => ({
  ...(isExam && {
    border: "3px solid " + theme.palette.date.exam,
  }),
  ...(isLesson && {
    border: "3px solid " + theme.palette.date.lesson,
  }),
})) as React.ComponentType<CustomPickerDayProps>;

function CustomDay(
  props: PickersDayProps<Dayjs> & { selectedDay?: Dayjs | null }
) {
  const { day, selectedDay, ...other } = props;

  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  const isExam = day.isSame(selectedDay.add(2, "day"), "day");
  const isLesson = day.isSame(selectedDay.add(4, "day"), "day");
  return (
    <CustomPickersDay
      {...other}
      day={day}
      isExam={isExam}
      isLesson={isLesson}
    />
  );
}

export default CustomDay;

// export default function CustomDay() {
//   const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar
//         value={value}
//         onChange={(newValue) => setValue(newValue)}
//         slots={{ day: Day }}
//         slotProps={{
//           day: {
//             selectedDay: value,
//           } as any,
//         }}
//       />
//     </LocalizationProvider>
//   );
// }
