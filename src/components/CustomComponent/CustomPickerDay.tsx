import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Box, Popover, Typography } from "@mui/material";

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  isExam: boolean;
  isLesson: boolean;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isExam" && prop !== "isLesson",
})<CustomPickerDayProps>(({ theme, isExam, isLesson }) => ({
  fontWeight: "bold",
  ...(isExam && {
    border: "3px solid " + theme.palette.date.exam + " !important",
  }),
  ...(isLesson && {
    border: "3px solid " + theme.palette.date.lesson + " !important",
  }),
})) as React.ComponentType<CustomPickerDayProps>;

function CustomDay(
  props: PickersDayProps<Dayjs> & { selectedDay?: Dayjs | null }
) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const { day, selectedDay, ...other } = props;

  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  const isExam = day.isSame(selectedDay.add(2, "day"), "day");
  const isLesson = day.isSame(selectedDay.add(4, "day"), "day");
  return (
    <Box>
      <CustomPickersDay
        {...other}
        day={day}
        isExam={isExam}
        isLesson={isLesson}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      />
      <Popover
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Box
          sx={{
            width: "300px",
            boxShadow: 1,
            border: 1,
            p: 1,
            borderRadius: 0,
            backgroundColor: "#fff",
          }}
        >
          <Typography fontSize={12} fontWeight="bold">
            Kiểm tra Đề Luyện Thi 5 Ngày 17/7/2023 - 8:30pm Nội dung: Luyện thi
            buổi 4
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
}

export default CustomDay;
