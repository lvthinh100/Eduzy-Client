import React from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  CardMedia,
  Fab,
} from "@mui/material";
import Logo5 from "../../assets/Logo5.png";
import "../Bio/style.css";
import ExamIcon from "../../components/IconComponent/ExamIcon";
import TikTokIcon from "../../components/IconComponent/TikTokIcon";
import FacebookIcon from "@mui/icons-material/Facebook";
import ChatIcon from "@mui/icons-material/Chat";
import { relative } from "path";

const BioLinkPage = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, #FFA61D, #FFFFFF)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        fontFamily: "HandWriting",
        color: "#555452",
      }}
    >
      <Container
        maxWidth="md"
        style={{ textAlign: "center", marginTop: "30px" }}
      >
        {/* <img
          src={Logo5}
          alt="Company Logo"
          style={{
            borderRadius: "50%",
            width: "200px",
            height: "200px",
            margin: "auto", // Center the image horizontally
            display: "block", // Ensures proper centering
          }}
        /> */}
        <Box
          style={{
            borderRadius: "50%",
            width: "200px",
            height: "180px",
            margin: "auto", // Center the image horizontally
            display: "block", // Ensures proper centering
          }}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={0.1}
            viewBox="-1.90343 0.9 19.81 12.4"
            preserveAspectRatio="none"
            style={{
              width: "200px",
              height: "170px",
              margin: "auto", // Center the image horizontally
              display: "block", // Ensures proper centering
            }}
          >
            <path d="M 8 1 L 0 3 L 8 5 L 13.968 3.75 Q 15.333 4.698 14.54 6.285 Q 15.319 6.1 15.744 6.398 Q 15.347 3.427 12.696 2.548 Q 12.705 2.479 12.688 2.447 C 14.762 3.041 14.621 4.138 15.971 3.012 Z M 3 12 L 13 12 L 17 7 C 14 9 10 10 8 7 C 6 10 2 9 -1 7 Z M 2 13.2 L 14 13.2 Q 14 12.2 13 12.2 L 3 12.2 Q 2 12.2 2 13.2 M 4.004 4.214 L 3.981 7.979 C 6.981 5.979 8.981 5.979 11.981 7.979 L 12.025 4.375 L 8.002 5.207 Z M -1.2 6.8 A 0.25 0.25 0 0 0 -1.7 6.3 A 0.25 0.25 0 0 0 -1.2 6.8 M 17.2 6.8 A 0.25 0.25 0 0 0 17.7 6.3 A 0.25 0.25 0 0 0 17.2 6.8" />
          </svg>
        </Box>

        <Typography
          variant="h3"
          marginTop="0px"
          marginBottom="30px"
          gutterBottom
          fontFamily="HandWriting"
        >
          Luyện thi cùng Eduzy
        </Typography>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={12} md={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              href="https://www.facebook.com/groups/857028829034537"
              target="_blank"
              rel="noopener noreferrer" // Define target attribute
              className="btn-grad"
              sx={{ display: "flex", alignItems: "center", flexGrow: 1 }} // Align children horizontally
            >
              <Fab
                size="small"
                color="secondary"
                aria-label="open"
                sx={{
                  mt: 0,
                  mr: 1,
                  height: 36,
                  width: 36,
                  display: "inline-block",
                  left: "inherit",
                  pt: 0.5,
                }}
              >
                <FacebookIcon />
              </Fab>
              <span>Facebook - NHÓM HOẠT ĐỘNG CHÍNH</span>{" "}
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              href="https://m.me/cm/AbYnhYnWU80GvaOH/"
              target="_blank"
              rel="noopener noreferrer" // Define target attribute
              className="btn-grad"
            >
              <Fab
                size="small"
                color="secondary"
                aria-label="open"
                sx={{
                  mt: 0,
                  mr: 1,
                  height: 36,
                  width: 36,
                  display: "inline-block",
                  left: "inherit",
                  pt: 0.5,
                }}
              >
                <ChatIcon />
              </Fab>
              Messenger - NHÓM CHAT CỘNG ĐỒNG DUZIER
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              href="https://www.tiktok.com/@eduzy.official"
              target="_blank"
              rel="noopener noreferrer" // Define target attribute
              className="btn-grad"
            >
              <Fab
                size="small"
                color="secondary"
                aria-label="open"
                sx={{
                  mt: 0,
                  mr: 1,
                  height: 36,
                  width: 36,
                  display: "inline-block",
                  left: "inherit",
                  pt: 0.5,
                }}
              >
                <TikTokIcon />
              </Fab>
              TikTok - NƠI ĐĂNG TẢI VIDEO
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default BioLinkPage;
