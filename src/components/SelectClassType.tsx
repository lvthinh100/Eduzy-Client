import React, { useCallback, useEffect } from "react";
import { CustomSelect, StyledOption } from "./CustomComponent/CustomSelect";
import { getFilters } from "../api";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { lessonActions } from "../redux/slices/lessonSlice";
import { appActions } from "../redux/slices/appSlice";
import { filterActions } from "../redux/slices/filterSlice";

const SelectClassType = () => {
  const dispatch = useAppDispatch();
  const { code: type } = useAppSelector((state) => state.lesson);
  const { filters } = useAppSelector((state) => state.filter);
  const firstRender = React.useRef<boolean>(true);

  const fetchFilters = useCallback(async () => {
    try {
      const { data: response } = await getFilters();
      dispatch(filterActions.setFilters(response));
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
      // fetchUpcoming(type);
      fetchFilters();
      firstRender.current = false;
    }
  }, [type, fetchFilters]);

  const handleChangeLessonType = async (newType: {} | null) => {
    try {
      console.log("newType", newType);
      // const { data: response } = await getUpcomingLesson(newType as string);
      // dispatch(lessonActions.setUpComingLesson(response.data));
      dispatch(lessonActions.changeLessonType(newType));
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
      {filters?.map((filter) => (
        <StyledOption key={filter.filterCode} value={filter.filterCode}>
          {filter.filterName}
        </StyledOption>
      ))}
    </CustomSelect>
  );
};

export default SelectClassType;
