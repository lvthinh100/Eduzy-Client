import {
  PaperProps,
  Paper,
  styled,
  Typography,
  SpeedDial,
} from '@mui/material';
import { pxToRem } from '../../utils/getFontValue';

const PaperStyled = styled(Paper)<PaperProps>(({ theme }) => ({
  borderTop: `10px solid ${theme.palette.highlighter.main}`,
  borderRadius: 0,
  padding: 5,
}));

const CustomSubtitleTypography = styled(Typography)({
  fontFamily: 'SegoeUISemiBold',
  fontSize: '12px',
});

const StyledSpeedial = styled(SpeedDial)(({ theme }) => ({
  position: 'relative',
  '& .MuiSpeedDial-actions': {
    position: 'absolute',
    bottom: -170,
  },
  '& .MuiFab-root': {
    width: '40px',
    height: '40px',
    backgroundColor: 'white',
    color: theme.palette.highlightText.main,
    '&:hover': {
      backgroundColor: 'white',
    },
  },
}));

const StyledButtonText = styled(Typography)({
  color: 'white',
  fontFamily: 'SegoeUISemiBold',
  lineHeight: 22 / 14,
  fontSize: pxToRem(14),
});

export {
  PaperStyled,
  CustomSubtitleTypography,
  StyledSpeedial,
  StyledButtonText,
};
