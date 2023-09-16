import React, { useEffect, useState } from "react";
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
import GenderTypography from "./GenderTypography";
import CoupleButtons from "../../components/CoupleButtons";
import GradeLBbtn from "../../components/GradeLBbtn";
import AnswerBtn from "../../components/AnswerBtn";

const AnswerSheetPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState<ExamType | null>(null);
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
  return (
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
            sx={{ my: 1, width: "100%", backgroundColor: "#DE5173" }}
            flexItem
          />
        </Grid>

        {exam ? (
          <Sheet image={exam.questionUrl} questionNum={exam.numberOfQuestion} />
        ) : (
          "Loading"
        )}
      </Grid>
    </Container>
  );
};

export default AnswerSheetPage;
