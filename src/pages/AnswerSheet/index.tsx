import React from "react";
import {
  Box,
  Button,
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

const AnswerSheetPage = () => {
  return (
    <Container maxWidth="xl" sx={{ bgcolor: "white" }}>
      <Grid md={12}>
        <Stack direction="column" alignItems="center" mb={2}>
          <Typography variant="h3">Phiếu trả lời trắc nghiệm</Typography>
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
      </Grid>
      <Grid container>
        <Grid container spacing={1}>
          <Grid item md={2}>
            <Grid container>
              <Grid item md={12}>
                <Box
                  sx={{ p: 1, textAlign: "center", border: "1px solid red" }}
                >
                  <Typography>Điểm</Typography>
                  <StyledScoreLabel>8</StyledScoreLabel>
                </Box>
              </Grid>
              <Grid item md={12}>
                <Box
                  sx={{
                    p: 1,
                    textAlign: "center",
                    border: "1px solid red",
                    mt: 1,
                  }}
                >
                  <Typography>Xếp hạng</Typography>
                  <StyledScoreLabel>8</StyledScoreLabel>
                  <Button variant="gradient">Xem đáp án</Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={7}>
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
                text="Eduzy"
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
          <Grid item md={2}>
            <Typography>Mã dự thi: </Typography>
            <CodeFilling id="000123" />
          </Grid>
          <Grid item md={1}>
            <Typography>Mã đề thi: </Typography>
            <CodeFilling id="003" />
          </Grid>
        </Grid>

        <Grid item md={12}>
          <Divider
            sx={{ my: 1, width: "100%", backgroundColor: "red" }}
            flexItem
          />
        </Grid>

        <Sheet />
      </Grid>
    </Container>
  );
};

export default AnswerSheetPage;
