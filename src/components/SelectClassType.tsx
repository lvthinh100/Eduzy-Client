import React, { useCallback, useEffect } from "react";
import { CustomSelect, StyledOption } from "./CustomComponent/CustomSelect";
import { getUpcomingLesson } from "../api";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { lessonActions } from "../redux/slices/lessonSlice";
import { appActions } from "../redux/slices/appSlice";

const SelectClassType = () => {
  const dispatch = useAppDispatch();
  const { type } = useAppSelector((state) => state.lesson);
  const firstRender = React.useRef<boolean>(true);

  const fetchUpcoming = useCallback(
    async (type: string) => {
      try {
        const { data: response } = await getUpcomingLesson(type as string);
        dispatch(lessonActions.setUpComingLesson(response.data));
      } catch (err) {
        console.log(err);
        dispatch(
          appActions.showNotification({
            variant: "success",
            message: "Lỗi khi fetch upcoming lesson",
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (firstRender.current) {
      fetchUpcoming(type);
      firstRender.current = false;
    }
  }, [fetchUpcoming, type]);
  const handleChangeLessonType = async (newType: {} | null) => {
    try {
      const { data: response } = await getUpcomingLesson(newType as string);
      dispatch(lessonActions.setUpComingLesson(response.data));
    } catch (err) {
      console.log(err);
      dispatch(
        appActions.showNotification({
          variant: "success",
          message: "Lỗi khi fetch upcoming lesson",
        })
      );
    }
  };
  return (
    <CustomSelect
      value={type}
      onChange={(_, value) => {
        handleChangeLessonType(value);
      }}
    >
      <StyledOption value="LuyenDe"> Luyện Đề </StyledOption>
      <StyledOption value="LyThuyet">Học Lý Thuyết </StyledOption>
      <StyledOption value="LuyenDeChuong">Luyện đề theo chương </StyledOption>
    </CustomSelect>
  );
};

export default SelectClassType;
