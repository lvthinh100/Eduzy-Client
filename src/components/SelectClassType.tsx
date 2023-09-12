import React, { useCallback, useEffect } from "react";
import { CustomSelect, StyledOption } from "./CustomComponent/CustomSelect";
import { getUpcomingLesson, getFilters } from "../api";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { lessonActions } from "../redux/slices/lessonSlice";
import { appActions } from "../redux/slices/appSlice";
import { filterActions } from "../redux/slices/filterSlice";

const SelectClassType = () => {
  const dispatch = useAppDispatch();
  const { code: type } = useAppSelector((state) => state.lesson);
  const { filters } = useAppSelector((state) => state.filter);
  console.log("filters", filters);
  const firstRender = React.useRef<boolean>(true);

  const fetchUpcoming = useCallback(
    async (type: string) => {
      try {
        console.log("type", type);
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

  const fetchFilters = useCallback(async () => {
    try {
      const { data: response } = await getFilters();
      dispatch(filterActions.setFilters(response));
      console.log("response", response);
    } catch (err) {
      console.log(err);
      dispatch(
        appActions.showNotification({
          variant: "success",
          message: "Lỗi khi fetch filters",
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (firstRender.current) {
      fetchUpcoming(type);
      fetchFilters();
      firstRender.current = false;
    }
  }, [fetchUpcoming, type]);

  const handleChangeLessonType = async (newType: {} | null) => {
    try {
      console.log("newType", newType);
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
      {/* <StyledOption value="LuyenDe"> Luyện Đề </StyledOption>
      <StyledOption value="LyThuyet">Học Lý Thuyết </StyledOption>
      <StyledOption value="LuyenDeChuong">Luyện đề theo chương </StyledOption> */}
      {filters?.map((filter) => (
        <StyledOption key={filter.filterCode} value={filter.filterCode}>
          {filter.filterName}
        </StyledOption>
      ))}
    </CustomSelect>
  );
};

export default SelectClassType;
