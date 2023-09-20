import { Fragment, useEffect, useState, useCallback } from "react";
import {
  Box,
  Container,
  Dialog,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CodeFilling from "../../components/CodeFilling";
import Sheet from "./Sheet";
import FillingText from "./FillingText";
import { StyledScoreLabel } from "./style";
import { useNavigate, useParams } from "react-router-dom";
import { getExamById } from "../../api";
import { ExamType, defaultExam } from "../../model/Exam";
import NameDialog from "./NameDialog";
import useToggleOpen from "../../hooks/useToggleOpen";
import useAuth from "../../hooks/useAuth";
import dayjs from "dayjs";
import GenderTypography from "./GenderTypography";
import GradeLBbtn from "../../components/GradeLBbtn";
import AnswerBtn from "../../components/AnswerBtn";
import { StudentInfo, StudentLBInfo, defaultUser } from "../../model/Student";
import { useLocation } from "react-router-dom";
import ExamBtn from "../../components/ExamBtn";
import timeState from "./TimeState";
import { ResultType } from "../../model/Lesson";
import GradeRankDialog from "./GradeRankDialog";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { appActions } from "../../redux/slices/appSlice";
import LeaderBoard from "../../components/LeaderBoard";
import { LBEnum } from "../../model/Standard";

const AnswerSheetPage = () => {
  const dispatch = useAppDispatch();
  const { showLeaderBoardModal } = useAppSelector((state) => state.app);
  const { id } = useParams();
  const location = useLocation();
  const [isAnswerSheet, setIsAnswerSheet] = useState(
    location.pathname.includes("/answersheet/")
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const [exam, setExam] = useState<ExamType | null>(null);
  const [unAuthName, setUnAuthName] = useState<string | null>(null);
  const [openNameDialog, handleOpen, handleClose] = useToggleOpen(true);
  const [isOpenGradeRankDialog, setIsOpenGradeRankDialog] =
    useState<boolean>(false);
  const [student, setStudent] = useState<StudentInfo>(defaultUser);
  const { user } = useAuth();
  const [currentState, setCurrentState] = useState(timeState.beforeExam);
  const [result, setResult] = useState<ResultType | null>(null);

  //Các state bao gồm:
  // isAnswerSheet
  // exam.isUpcoming
  // isSubmitted
  // timeState = { beforeExam: 1, inExam: 2, afterExam: 3 };

  // Nếu là isAnswerSheet và !exam.isUpcoming thì timeState = 3 và isSubmitted = true luôn
  // Nếu là isAnswerSheet và exam.isUpcoming thì xét timeState
  // Nếu !isAnswerSheet và exam.isUpcoming thì lấy startTime từ lesson
  // Nếu !isAnswerSheet và !exam.isUpcoming thì lấy startTime từ 10s sau now()

  //Tính năng sau này để chống gian lận:
  // Nếu isSubmitted và !exam.isUpcoming thì chuyển state AfterExam luôn (cho hiện chấm điểm luôn)
  // Nếu isSubmitted và exam.isUpcoming thì phải đợi (hiện chấm điểm lúc hết giờ)

  //Hiện tại thì cứ nộp bài là trả về kết quả lẫn xếp hạng ( xếp hạng sẽ là stt kiểu 123/555 )
  //update mỗi 3s một lần

  const getCurrentState = useCallback(() => {
    if (!exam) return timeState.beforeExam;
    if (isAnswerSheet && !exam.isUpcoming) {
      setIsSubmitted(true);
      return timeState.afterExam;
    }

    if (isSubmitted) return timeState.afterExam;
    const currentTime = dayjs();
    const startTime = dayjs(exam?.startTime);
    const endTime = startTime.add(
      exam?.duration ? exam.duration : 50,
      "minute"
    );

    if (currentTime.isBefore(startTime)) {
      return timeState.beforeExam;
    } else if (currentTime.isBetween(startTime, endTime)) {
      return timeState.inExam;
    } else {
      return timeState.afterExam;
    }
  }, [exam, isAnswerSheet, isSubmitted]);

  useEffect(() => {
    setCurrentState(getCurrentState());

    const intervalId = setInterval(() => {
      setCurrentState(getCurrentState());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [exam, getCurrentState]);

  useEffect(() => {
    if (isSubmitted && result && currentState === timeState.afterExam) {
      setIsOpenGradeRankDialog(true);
    }
  }, [isSubmitted, result, currentState]);

  useEffect(() => {
    if (user) {
      setStudent(user);
    } else {
      setStudent({
        ...defaultUser,
        fullName: unAuthName || defaultUser.fullName,
      });
    }
  }, [user, unAuthName]);

  useEffect(() => {
    setStudent((prevStudent) => ({
      ...prevStudent,
      fullName: unAuthName || prevStudent.fullName,
    }));
  }, [unAuthName]);

  function getLastName(fullName: string) {
    const nameParts = fullName.split(" ");
    if (nameParts.length < 1) {
      return "";
    }
    const lastName = nameParts[nameParts.length - 1];

    const normalizedLastName = lastName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");

    return normalizedLastName;
  }

  useEffect(() => {
    const fetchExam = async () => {
      try {
        if (!id) return;
        const { data: response } = await getExamById(id);
        //Nếu là luyện tập thì gán startTime + 10s từ now
        const fetchedExam = response.data;

        if (!fetchedExam.startTime && !fetchedExam.isUpcoming) {
          fetchedExam.startTime = dayjs().add(10, "second").toString();
        }

        setExam(response.data);
        if (user) setStudent(user);
      } catch (err) {
        navigate("/error");
      }
    };
    fetchExam();
  }, [id, navigate, user]);
  // DK hiện đề:
  /**
   * 1. isUpcoming = false
   * 2. isUpcoming = true && upcomingtest.starttime + duration > curtime
   */
  // const isBetween =
  //   exam &&
  //   dayjs().isBetween(
  //     dayjs(exam.startTime),
  //     dayjs(exam.startTime).add(exam.duration, "minute")
  //   );

  // !exam?.isUpcoming || showTime || (exam.isUpcoming && isBetween);

  return (
    <Fragment>
      <Container maxWidth="xl" sx={{ bgcolor: "white" }}>
        <Stack direction="column" alignItems="center" mb={2}>
          <Typography variant="h3" fontFamily="Times New Roman">
            PHIẾU TRẢ LỜI TRẮC NGHIỆM
          </Typography>
          <FillingText
            label="Kỳ thi"
            text="Luyện thi trung học phổ thông quốc gia"
            paddingLeft={1}
          />
          <Stack direction="row">
            <FillingText
              label="Bài thi"
              text={exam?.subject || "Vật Lý"}
              sx={{ mr: 1 }}
              paddingLeft={2}
            />
            <FillingText
              label="Ngày thi"
              text={
                exam && exam.startTime
                  ? dayjs(exam.startTime).format("DD/MM/YYYY").toString()
                  : dayjs().format("DD/MM/YYYY").toString()
              }
              paddingLeft={2}
            />
          </Stack>
        </Stack>
        <Grid
          container
          spacing={1}
          sx={{
            justifyContent: "center",
          }}
        >
          <Grid item style={{ width: "200px" }}>
            <Stack
              sx={{
                direction: "column",
                justifyContent: "center",
                height: "100%",
                border: "1px solid #DE5173",
                display: "flex", // Make the Stack a flex container
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  p: 1,
                  textAlign: "center",
                  mb: "auto",
                  flex: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontFamily="Times New Roman"
                  fontSize={18}
                >
                  Kết quả
                </Typography>
                {currentState === timeState.afterExam && (
                  <Stack>
                    <StyledScoreLabel>
                      {result ? result.score : "_"}
                    </StyledScoreLabel>
                    <Stack>
                      {isAnswerSheet ? (
                        <ExamBtn onChange={() => setIsAnswerSheet(false)} />
                      ) : (
                        <AnswerBtn
                          onChange={() => {
                            setIsAnswerSheet(true);
                          }}
                        />
                      )}
                    </Stack>
                  </Stack>
                )}
              </Box>
              <Divider sx={{ width: "100%", backgroundColor: "#DE5173" }} />
              <Box
                sx={{
                  p: 1,
                  textAlign: "center",
                  mt: 1,
                  flex: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontFamily="Times New Roman"
                  fontSize={18}
                >
                  Xếp hạng
                </Typography>
                {currentState === timeState.afterExam && (
                  <Stack>
                    <StyledScoreLabel>
                      {result ? result.rank : "_"}
                    </StyledScoreLabel>
                    <Stack>
                      <GradeLBbtn
                        onChange={() =>
                          dispatch(appActions.toggleShowLeaderBoardModal())
                        }
                      />
                    </Stack>
                  </Stack>
                )}
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            xs
            sx={{
              display: { md: "block", xs: "none" },
            }}
          >
            <Stack
              direction="column"
              alignItems="flex-start"
              justifyContent="space-between"
              sx={{ height: "100%", p: 1, border: "1px solid #DE5173" }}
            >
              <FillingText
                width="100%"
                paddingLeft={2}
                label="1.Hội Đồng thi"
                text="Eduzy"
                sx={{ width: "100%" }}
              />
              <FillingText
                sx={{ width: "100%" }}
                paddingLeft={2}
                label="2.Điểm thi"
                text="Eduzy"
              />
              <FillingText
                sx={{ width: "100%" }}
                paddingLeft={2}
                label="3.Phòng thi số"
                text="Eduzy001"
              />
              <FillingText
                sx={{ width: "100%" }}
                paddingLeft={2}
                label="4.Họ và tên thí sinh"
                text={student?.fullName || "___"}
              />
              <Stack direction="row">
                <FillingText
                  sx={{ width: "100%" }}
                  paddingLeft={2}
                  label="5.Ngày sinh"
                  text={student?.dateOfBirth || "1/1/2006"}
                />
                <GenderTypography isMale={false} />
              </Stack>

              <FillingText
                sx={{ width: "100%", fontWeight: "bold" }}
                paddingLeft={2}
                label="6.Chữ ký của thí sinh"
                text={getLastName(student.fullName)}
                fontFamily="Signature"
              />
              {/* <FillingText label="Ngày thi" text="3/8/2023" paddingLeft={2} /> */}
            </Stack>
          </Grid>
          <Grid
            item
            sx={{
              width: "240px",
              mt: { md: -3, xs: 0 },
              display: { md: "block", xs: "none" },
            }}
          >
            <Stack direction="row">
              <Stack
                direction="column"
                mr={2}
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="subtitle2"
                  fontFamily="Times New Roman"
                  fontSize={18}
                >
                  7.Số báo danh:{" "}
                </Typography>
                <CodeFilling id={student.studentCode} />
              </Stack>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography
                  variant="subtitle2"
                  fontFamily="Times New Roman"
                  fontSize={18}
                >
                  8.Mã đề thi:{" "}
                </Typography>
                <CodeFilling id={exam ? exam.examCode : "000"} />
              </Stack>
            </Stack>
          </Grid>
          <Grid container>
            <Grid item md={12}>
              <Divider
                sx={{ my: 1, width: "100%", backgroundColor: "red" }}
                flexItem
              />
            </Grid>

            <Sheet
              exam={exam ? exam : defaultExam}
              student={student}
              currentState={currentState}
              isAnswerSheet={isAnswerSheet}
              isSubmitted={isSubmitted}
              onSubmit={(r) => {
                setIsSubmitted(true);
                setResult(r);
              }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* {!showExam && (
        <Box textAlign="center" bgcolor="white" py={3}>
          <Typography variant="h4">Đề thi sẽ hiện sau: </Typography>
          <Typography>
            <Countdown
              date={dayjs().add(10, "second")}
              onTimeout={() => setShowTime(true)}
            />
          </Typography>
        </Box>
      )}
      <Grid item md={12}>
        <Divider
          sx={{ my: 1, width: "100%", backgroundColor: "#DE5173" }}
          flexItem
        />
      </Grid> */}

      {!user && !isAnswerSheet && currentState < timeState.afterExam && (
        <NameDialog
          onSubmitName={(name: string) => {
            setUnAuthName(name);
            handleClose();
          }}
          open={openNameDialog}
        />
      )}
      <GradeRankDialog
        handleClose={() => {
          setIsOpenGradeRankDialog(false);
        }}
        open={isOpenGradeRankDialog}
        result={result}
      />
      <Dialog
        open={showLeaderBoardModal}
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        onClose={() => dispatch(appActions.toggleShowLeaderBoardModal())}
      >
        <LeaderBoard
          type={LBEnum.score}
          examId={exam && exam._id ? exam._id : undefined}
          examName={exam ? exam.name : ""}
        />
      </Dialog>
    </Fragment>
  );
};

export default AnswerSheetPage;
