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

const AnswerSheetPage = () => {
  return (
    <Container maxWidth="xl" sx={{ bgcolor: "white" }}>
      <Grid md={12}>
        <Box textAlign="center" mb={2}>
          <Typography variant="h3">Phiếu trả lời trắc nghiệm</Typography>
          <Typography variant="subtitle2">
            Kỳ thi: Trung học phổ thông quốc gia 2023
          </Typography>
          <Typography variant="subtitle2">
            Bài thi môn: Vật Lý Ngày thi: 27/05/2023
          </Typography>
        </Box>
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
                  <Typography sx={{ fontSize: "40px", fontWeight: "bold" }}>
                    8
                  </Typography>
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
                  <Typography sx={{ fontSize: "40px", fontWeight: "bold" }}>
                    8
                  </Typography>
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
              <Typography> Hội Đồng thi: Eduzy</Typography>
              <Typography> Địa điểm: Eduzy</Typography>
              <Typography> Phòng thi: Eduzy</Typography>
              <Typography> Họ và tên thí sinh: Eduzy</Typography>
              <Typography> Ngày sinh: 1/1/2006</Typography>
              <Typography> Chữ ký thí sinh: Eduzy</Typography>
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
