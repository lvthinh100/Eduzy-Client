import React, { Fragment, useEffect, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Container,
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
import { ExamType } from "../../model/Exam";
import NameDialog from "./NameDialog";
import useToggleOpen from "../../hooks/useToggleOpen";
import useAuth from "../../hooks/useAuth";
import Countdown from "../../components/Countdown";
import dayjs from "dayjs";
import GenderTypography from "./GenderTypography";
import CoupleButtons from "../../components/CoupleButtons";
import GradeLBbtn from "../../components/GradeLBbtn";
import AnswerBtn from "../../components/AnswerBtn";

const AnswerSheetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState<ExamType | null>(null);
  const [unAuthName, setUnAuthName] = useState<string | null>(null);
  const [openNameDialog, handleOpen, handleClose] = useToggleOpen(true);
  const [showTime, setShowTime] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        if (!id) return;
        const { data: response } = await getExamById(id);
        setExam(response.data);
      } catch (err) {
        navigate("/error");
      }
    };
    fetchExam();
  }, [id, navigate]);
  // DK hiện đề:
  /**
   * 1. isUpcoming = false
   * 2. isUpcoming = true && upcomingtest.starttime + duration > curtime
   */
  const isBetween =
    exam &&
    dayjs().isBetween(
      dayjs(exam.startTime),
      dayjs(exam.startTime).add(exam.duration, "minute")
    );
  const showExam =
    !exam?.isUpcoming || showTime || (exam.isUpcoming && isBetween);

  return (
    <Fragment>
      {showExam && (
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
            text="Vật Lý"
            sx={{ mr: 1 }}
            paddingLeft={2}
          />
          <FillingText label="Ngày thi" text="3/8/2023" paddingLeft={2} />
        </Stack>
      </Stack>
      <Grid container>
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
                justifyContent: "space-between",
                height: "100%",
                border: "1px solid #DE5173",
              }}
            >
              <Box
                sx={{
                  p: 1,
                  textAlign: "center",
                  mb: "auto",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontFamily="Times New Roman"
                  fontSize={18}
                >
                  Kết quả
                </Typography>
                <StyledScoreLabel>8</StyledScoreLabel>
                <Stack>
                  <AnswerBtn />
                </Stack>
              </Box>
              <Divider sx={{ width: "100%", backgroundColor: "#DE5173" }} />
              <Box
                sx={{
                  p: 1,
                  textAlign: "center",
                  mt: 1,
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontFamily="Times New Roman"
                  fontSize={18}
                >
                  Xếp hạng
                </Typography>
                <StyledScoreLabel>8</StyledScoreLabel>
                {/* <Button variant="gradient">Xem đáp án</Button> */}

                <Stack>
                  <GradeLBbtn />
                </Stack>
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
                text="Eduzy"
              />
              <FillingText
                sx={{ width: "100%" }}
                paddingLeft={2}
                label="4.Họ và tên thí sinh"
                text="Eduzy"
              />
              <Stack direction="row">
                <FillingText
                  sx={{ width: "100%" }}
                  paddingLeft={2}
                  label="5.Ngày sinh"
                  text="2006"
                />
                <GenderTypography isMale={false} />
              </Stack>

              <FillingText
                sx={{ width: "100%", fontWeight: "bold" }}
                paddingLeft={2}
                label="6.Chữ ký của thí sinh"
                text="QUEST"
                fontFamily="Signature"
              />
              <FillingText label="Ngày thi" text="3/8/2023" paddingLeft={2} />
            </Stack>
          </Stack>
          <Grid container>
            <Grid container spacing={1}>
              <Grid item md={2}>
                <Stack
                  sx={{
                    direction: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    border: "1px solid red",
                  }}
                >
                  <Box
                    sx={{
                      p: 1,
                      textAlign: "center",
                      mb: "auto",
                    }}
                  >
                    <Typography>Điểm</Typography>
                    <StyledScoreLabel>8</StyledScoreLabel>
                  </Box>
                  <Divider sx={{ width: "100%", backgroundColor: "red" }} />
                  <Box
                    sx={{
                      p: 1,
                      textAlign: "center",
                      mt: 1,
                    }}
                  >
                    <Typography>Xếp hạng</Typography>
                    <StyledScoreLabel>8</StyledScoreLabel>
                    <Button variant="gradient">Xem đáp án</Button>
                  </Box>
                </Stack>
              </Grid>
              <Grid item md={7} sx={{ display: { xs: "none", md: "block" } }}>
                <Stack
                  direction="column"
                  alignItems="flex-start"
                  justifyContent="space-between"
                  sx={{ height: "100%", p: 1, border: "1px solid red" }}
                >
                  <FillingText
                    width="100%"
                    paddingLeft={2}
                    label="Hội Đồng thi"
                    text="Eduzy"
                    sx={{ width: "100%" }}
                  />
                  <FillingText
                    sx={{ width: "100%" }}
                    paddingLeft={2}
                    label="Địa điểm"
                    text="Eduzy"
                  />
                  <FillingText
                    sx={{ width: "100%" }}
                    paddingLeft={2}
                    label="Phòng thi"
                    text="Eduzy"
                  />
                  <FillingText
                    sx={{ width: "100%" }}
                    paddingLeft={2}
                    label="Họ và tên thí sinh"
                    text={unAuthName && !user ? unAuthName : user?.fullName}
                  />
                  <FillingText
                    sx={{ width: "100%" }}
                    paddingLeft={2}
                    label="Ngày sinh"
                    text="2006"
                  />
                  <FillingText
                    sx={{ width: "100%" }}
                    paddingLeft={2}
                    label="Chữ ký thí sinh"
                    text="QUEST"
                    fontFamily="Signature"
                  />
                </Stack>
              </Grid>

              <Grid item md={3}             sx={{
              width: "240px",
              mt: { md: -3, xs: 0 },
              display: { md: "block", xs: "none" },
            }}>
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
                <CodeFilling id="000123" />
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
                <CodeFilling id="003" />
              </Stack>
            </Stack>
              </Grid>
            </Grid>

            <Grid item md={12}>
              <Divider
                sx={{ my: 1, width: "100%", backgroundColor: "red" }}
                flexItem
              />
            </Grid>

            {exam ? (
              <Sheet
                image={exam.questionUrl}
                questionNum={exam.numberOfQuestion}
                isUpcoming={exam.isUpcoming}
                stopAt={
                  exam.isUpcoming
                    ? dayjs(exam.startTime).add(exam.duration, "minute")
                    : dayjs().add(exam.duration, "minute")
                }
              />
            ) : (
              "Loading"
            )}
          </Grid>
        </Container>
      )}

      {!showExam && (
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
        </Grid>

      {!user && (
        <NameDialog
          onSubmitName={(name: string) => {
            setUnAuthName(name);
            handleClose();
          }}
          open={openNameDialog}
        />
      )}
    </Fragment>
  );
};

export default AnswerSheetPage;
