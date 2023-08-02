import React from "react";
import {
  Avatar,
  Box,
  Stack,
  Typography,
  Badge,
  CardMedia,
} from "@mui/material";
import { motion } from "framer-motion";

import Clock from "../../components/Clock";
import Crown from "../../components/Crown";
import SelectClass from "./SelectClass";
import useResponsive from "../../hooks/useResponsive";

import computer from "../../assets/computer.jpg";
import img from "../../assets/avatar.jpg";
import flowers from "../../assets/flowers.jpg";
import leaderboardBtn from "../../assets/leaderboardBtn.png";

const Additional = () => {
  const isDesktop = useResponsive("up", "md");
  return (
    <Stack direction="column" alignItems="center" sx={{ mt: 2 }}>
      {/* Select */}
      {isDesktop && <SelectClass />}
      {/* Flower */}
      {isDesktop && (
        <CardMedia
          component="img"
          sx={{
            height: 160,
            objectFit: "contain",
            width: "fit-content",
          }}
          src={flowers}
        />
      )}

      {/* Timer */}
      {isDesktop && <Clock />}

      {/* High Record */}
      {isDesktop &&
      <Box>
        <Box sx={{ position: "relative", width: "300px", height: 300, mt: 5 }}>
          <Box
            component={Stack}
            direction="column"
            alignItems="center"
            sx={{
              width: "200px",
              position: "absolute",
              zIndex: 1,
              right: { md: -50, xs: 0 },
              top: 45,
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                border: (theme) => `3px solid ${theme.palette.prize.first}`,
              }}
            >
              <Badge
                badgeContent="1"
                overlap="circular"
                sx={{ "& .MuiBadge-badge": { backgroundColor: "prize.first" } }}
              >
                <Avatar
                  src={img}
                  sx={{
                    border: (theme) => `1px solid ${theme.palette.prize.first}`,
                    width: "40px",
                    height: "40px",
                    m: "4px",
                  }}
                />
              </Badge>
            </Box>
            <Typography
              component={motion.span}
              fontWeight="bold"
              sx={{
                color: "transparent",
                backgroundImage: "linear-gradient(180deg, white, #fdbd24 75%);",
                WebkitBackgroundClip: "text",
                backgroundSize: "250% 250%",
                WebkitBackgroundSize: "250% 250%",
                fontSize: "14px",
                m: 0,
              }}
              animate={{
                backgroundPosition: ["0 100%", "0 -100%", "0 100%"],
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 3 }}
            >
              Hoàng Văn Hòa
            </Typography>
            <Typography
              fontWeight="bold"
              fontSize={14}
              sx={{ color: "prize.first" }}
            >
              #00006
            </Typography>
            <Stack direction="row" alignItems="center" gap={1} mt={0.5}>
              <Crown quantity={1} variant="first" />
              <Crown quantity={5} variant="second" />
              <Crown quantity={0} variant="third" />
            </Stack>
          </Box>
          <CardMedia
            component="img"
            alt="computer"
            src={computer}
            sx={{
              position: "absolute",
              width: { md: "500px", xs: "400px" },
              right: { md: -180, xs: -125 },
            }}
          />

          <CardMedia
            component="img"
            alt="computer"
            src={leaderboardBtn}
            sx={{
              position: "absolute",
              width: 60,
              top: 80,
              left: 100,
              "&:hover": {
                opacity: 0.6,
                cursor: "pointer",
              },
            }}
          />
        </Box>
      </Box>
      }
    </Stack>
  );
};

export default Additional;
