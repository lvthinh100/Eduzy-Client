import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { Box, Popover, Typography } from "@mui/material";
import { LessonType } from "../../model/Lesson";

dayjs.extend(isBetweenPlugin);

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  lessonType: "LuyenDe" | "LyThuyet" | null;
}

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "lessonType",
})<CustomPickerDayProps>(({ theme, lessonType }) => ({
  fontWeight: "bold",
  ...(lessonType === "LuyenDe" && {
    border: "2px solid " + theme.palette.date.exam + " !important",
  }),
  ...(lessonType === "LyThuyet" && {
    border: "2px solid " + theme.palette.date.lesson + " !important",
  }),
})) as React.ComponentType<CustomPickerDayProps>;

function CustomDay(
  props: PickersDayProps<Dayjs> & {
    selectedDay?: Dayjs | null;
    lessons?: [LessonType] | null;
  }
) {
  // Handler PopOver
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // Handler Lesson type
  const { day, selectedDay, lessons, ...other } = props;

  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  let lessonType = null;
  let lesson: LessonType | null = null;
  const index = lessons?.findIndex((lesson) =>
    day.isSame(dayjs(lesson.startTime).format("YYYY-MM-DD"))
  );
  if (lessons && index && index > 0) {
    lessonType = lessons[index].lessonType;
    lesson = lessons[index];
  }
  return (
    <Box>
      <CustomPickersDay
        {...other}
        day={day}
        lessonType={lessonType}
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

            boxShadow: 1,
            border: 1,
            p: 1,
            px: 3,
            borderRadius: 1,
            backgroundColor: "#FDF5FA",
            color: "#494969",
          }}
        >
          <Typography fontFamily="SegoeUISemiBold" fontWeight="bold" fontSize="12px" whiteSpace="pre-line">
            {index && index < 0
              ? "Ngày nghỉ"
              : ` ${lesson?.lessonContent}
             Ngày ${dayjs(lesson?.startTime).format("DD/MM/YYYY - h:mma")} 
             Nội dung: ${lesson?.lessonContent}
            `}
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
}

export default CustomDay;
