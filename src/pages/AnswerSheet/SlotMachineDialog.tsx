import React, { useState, useCallback, useEffect } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// Import your CrownIcon component here
import CrownIcon from '../../components/IconComponent/CrownIcon';
import MoneyIcon from '../../components/IconComponent/MoneyIcon';
import palette from '../../theme/palette';
import { Box, Paper, Stack, Typography } from '@mui/material';
import Prize from '../../components/Prize';

interface SlotMachineDialogProps {
  colorProp: number;
  coinsValue: number;
  handleClose: () => void;
}

const SlotMachineDialog: React.FC<SlotMachineDialogProps & DialogProps> = ({
  colorProp,
  coinsValue,
  handleClose,
  ...dialogProps
}) => {
  const [showMsg, setShowMsg] = useState(false);

  const crownColors = [
    palette.prize.first,
    palette.prize.second,
    palette.prize.third,
  ];
  const [slotItems, setSlotItems] = useState([0, 1, 2]);

  const spin = useCallback(() => {
    const slotCounts = [15, 30, 45];
    let i = 0;

    const interval = setInterval(() => {
      setSlotItems([
        i >= slotCounts[0] ? colorProp : i % 4,
        i >= slotCounts[1] ? colorProp : (i + 1) % 4,
        i >= slotCounts[2] ? colorProp : (i + 2) % 4,
      ]);
      i++;
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setShowMsg(true);
    }, 100 * (slotCounts[2] + 6)); // Adjust the duration of the animation here
  }, [colorProp]);

  useEffect(() => {
    if (dialogProps.open) {
      spin();
    }
  }, [dialogProps.open, spin]);

  return (
    <div>
      {/* <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
          spin();
        }}
      >
        Open Slot Machine
      </Button> */}
      <Dialog onClose={handleClose} {...dialogProps}>
        <Paper sx={{ padding: 3, backgroundColor: 'white' }}>
          <DialogContent>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {slotItems.map((item, index) => (
                <div
                  key={index}
                  style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '24px',
                    border: '2px solid #333',
                    borderRadius: '50%',
                  }}
                >
                  {item < 3 ? (
                    <CrownIcon
                      key={index}
                      sx={{ width: 60, height: 60, color: crownColors[item] }}
                    />
                  ) : (
                    <MoneyIcon
                      key={index}
                      sx={{ width: 60, height: 60, color: palette.prize.first }}
                    />
                  )}
                </div>
              ))}
            </div>
          </DialogContent>
          {showMsg && (
            <Box>
              <Typography
                fontSize="30px"
                color="#39393A"
                fontFamily="SegoeUISemiBold"
                textAlign="center"
                mb={3}
              >
                Chúc mừng bạn đạt được top {colorProp + 1}!
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
                    Phần thưởng
                  </Typography>

                  <Stack>
                    <Prize
                      direction="column"
                      variant={
                        colorProp === 0
                          ? 'first'
                          : colorProp === 1
                          ? 'second'
                          : colorProp === 2
                          ? 'third'
                          : 'first'
                      }
                      fontSize={24}
                      value={coinsValue}
                    />
                  </Stack>
                </Box>
              </Stack>
              <Button
                variant="gradient2"
                sx={{ p: 1.25, width: '100%', fontSize: '12px', mt: 4 }}
                type="submit"
                onClick={handleClose}
              >
                Đồng ý
              </Button>
            </Box>
          )}
        </Paper>
      </Dialog>
    </div>
  );
};

export default SlotMachineDialog;
