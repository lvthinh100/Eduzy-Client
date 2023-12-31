import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogProps,
  Divider,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { StyledScoreLabel } from './style';
import { ResultType } from '../../model/Exam';
import labels from '../../constants/labels';

type PropsType = {
  result: ResultType | null;
  handleClose: (rating: number | null, fb: string) => void;
};

const GradeRankDialog: React.FC<PropsType & DialogProps> = ({
  result,
  handleClose,
  ...dialogProps
}) => {
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hover, setHover] = React.useState(-1);
  const [fb, setFb] = React.useState('');

  return (
    <Dialog maxWidth="sm" {...dialogProps}>
      <Paper sx={{ padding: 3, backgroundColor: 'white', maxWidth: 360 }}>
        <Typography
          fontSize="30px"
          color="#39393A"
          fontFamily="SegoeUISemiBold"
          textAlign="center"
          mb={3}
        >
          Chúc mừng bạn đã hoàn thành bài thi
        </Typography>
        <Stack
          sx={{
            direction: 'column',
            justifyContent: 'center',
            height: '100%',
            border: '1px solid #DE5173',
            display: 'flex', // Make the Stack a flex container
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              p: 1,
              textAlign: 'center',
              mb: 'auto',
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

            <Stack>
              <StyledScoreLabel>{result ? result.score : '_'}</StyledScoreLabel>
            </Stack>
          </Box>
          <Divider sx={{ width: '100%', backgroundColor: '#DE5173' }} />
          <Box
            sx={{
              p: 1,
              textAlign: 'center',
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

            <Stack>
              <StyledScoreLabel>{result ? result.rank : '_'}</StyledScoreLabel>
            </Stack>
          </Box>
          <Divider sx={{ width: '100%', backgroundColor: '#DE5173' }} />
          <Box
            sx={{
              p: 1,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 1,
              flex: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              fontFamily="Times New Roman"
              fontSize={18}
            >
              Đánh giá độ khó
            </Typography>

            <Rating
              name="hover-feedback"
              value={userRating}
              onChange={(event, newValue) => {
                setUserRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            {userRating !== null ? (
              <Box>{labels[hover !== -1 ? hover : userRating]}</Box>
            ) : hover !== -1 ? (
              <Box>{labels[hover]}</Box>
            ) : (
              <Box>&nbsp;</Box>
            )}
            <Typography
              variant="subtitle2"
              fontFamily="Times New Roman"
              fontSize={10}
            >
              Giới thiệu app cho bạn bè và người thân nếu thấy hay nhé. Cảm ơn
              các bạn rất nhiều ♡
            </Typography>
          </Box>
          {/* <Divider sx={{ width: '100%', backgroundColor: '#DE5173' }} />
          <Box
            sx={{
              p: 1,
              textAlign: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 1,
              flex: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              fontFamily="Times New Roman"
              fontSize={18}
            >
              Gửi phản hồi
            </Typography>
            <TextField
              id="outlined-textarea"
              label="Phản hồi"
              placeholder="Câu hỏi thắc mắc"
              value={fb}
              onChange={(event) => {
                setFb(event.target.value);
              }}
              multiline
              fullWidth
              variant="standard"
            />

          </Box> */}
        </Stack>
        <Button
          variant="gradient2"
          sx={{ p: 1.25, width: '100%', fontSize: '12px', mt: 4 }}
          type="submit"
          onClick={() => handleClose(userRating, fb)}
        >
          Đồng ý
        </Button>
      </Paper>
    </Dialog>
  );
};

export default GradeRankDialog;
