import React, { Fragment, useEffect, useState, useCallback } from 'react';
import {
  Box,
  Grid,
  CardMedia,
  RadioGroup,
  Stack,
  Typography,
  Button,
  Fab,
  Dialog,
  IconButton,
  Divider,
} from '@mui/material';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CloseIcon from '@mui/icons-material/Close';

import AnswerRadio from './AnswerRadio';
import useResponsive from '../../hooks/useResponsive';
import useToggleOpen from '../../hooks/useToggleOpen';
import Countdown from '../../components/Countdown';
import dayjs from 'dayjs';
import {
  AnswerEnum,
  AnswerType,
  ExamType,
  FetchAnswerIdType,
  FetchAnswerType,
  defaultResult,
} from '../../model/Exam';
import { StudentInfo } from '../../model/Student';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import timeState from './TimeState';
import { appActions } from '../../redux/slices/appSlice';
import { fetchAnswer, fetchAnswerById, postAnswer } from '../../api';
import { ResultType } from '../../model/Exam';
import SlotMachineDialog from './SlotMachineDialog';

type PropsType = {
  exam: ExamType;
  student: StudentInfo;
  currentState: number;
  isAnswerSheet: boolean;
  isSubmitted: boolean;
  result: ResultType | null;
  onSubmit: (r: ResultType) => void;
  setResult: (r: ResultType) => void;
  reloadUser: () => void;
};

const Sheet: React.FC<PropsType> = ({
  exam,
  student,
  currentState,
  isAnswerSheet,
  isSubmitted,
  onSubmit,
  result,
  setResult,
  reloadUser,
}) => {
  console.log('exam', exam);
  const dispatch = useAppDispatch();
  const [answerSheet, setAnswerSheet] = useState(
    new Array(exam.numberOfQuestion).fill('')
  );
  const { okCancelNotification } = useAppSelector((state) => state.app);
  const [imgUrl, setImgUrl] = useState('');
  const [isDisabled, setIsDisabled] = useState(false); //For prevent user from click too fast

  const [isPrize, setIsPrize] = useState(false);
  const [isOpenSlotMachineDialog, setIsOpenSlotMachineDialog] = useState(false);

  const [colorProp, setColorProp] = useState(0);

  const fetchResult = useCallback(async () => {
    if (
      isPrize === false &&
      exam.isUpcoming &&
      exam._id &&
      isSubmitted &&
      result &&
      currentState === timeState.afterExam
    ) {
      const data: FetchAnswerIdType = {
        _id: result._id,
        exam: exam._id,
      };
      try {
        const { data: response } = await fetchAnswerById(data);
        setResult(response);
        if (response.isPrized) {
          //Hiện form tổng kết ở đây
          if (response.coins > 0) {
            if (response.crown1 > 0) setColorProp(0);
            if (response.crown2 > 0) setColorProp(1);
            if (response.crown3 > 0) setColorProp(2);
            setIsOpenSlotMachineDialog(true);
            reloadUser();
          }
          setIsPrize(response.isPrized);
        }
      } catch (error) {}
    }
  }, [isPrize, exam, isSubmitted, result, currentState, setResult, reloadUser]);

  useEffect(() => {
    if (
      !(
        isPrize === false &&
        exam.isUpcoming &&
        isSubmitted &&
        result &&
        result._id !== '' &&
        currentState === timeState.afterExam
      )
    )
      return;

    fetchResult();

    const intervalId = setInterval(() => {
      fetchResult();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [fetchResult, isPrize, exam, isSubmitted, result, currentState]);

  useEffect(() => {
    const fetchAnswerData = async () => {
      if (
        isAnswerSheet &&
        result === null &&
        student._id !== null &&
        exam !== null &&
        exam._id !== null &&
        currentState === timeState.afterExam
      ) {
        const data: FetchAnswerType = {
          student: student._id,
          exam: exam._id,
        };

        try {
          const { data: response } = await fetchAnswer(data);
          setResult(response);
          let charArray = response.answer.split('');
          setAnswerSheet(charArray);
        } catch (error) {
          setResult(defaultResult);
          const spacesString = ' '.repeat(exam.numberOfQuestion);
          const charArray = spacesString.split('');
          setAnswerSheet(charArray);
        }
      }
    };

    fetchAnswerData();
  }, [isAnswerSheet, result, student, dispatch, exam, setResult, currentState]);

  useEffect(() => {
    if (!exam._id) return;
    let newImgUrl = '';
    if (!isAnswerSheet && currentState >= timeState.inExam)
      newImgUrl = exam.questionUrl;

    //Kiểm tra điều kiện xem đáp án ở đây
    if (isAnswerSheet) {
      newImgUrl = currentState === timeState.afterExam ? exam.answerUrl : '';
    }

    if (isAnswerSheet) {
      if (
        newImgUrl === '' &&
        !student._id &&
        currentState === timeState.afterExam
      ) {
        // dispatch(
        //   appActions.showNotification({
        //     variant: 'success',
        //     message: 'Bạn cần đăng nhập để xem đáp án',
        //   })
        // );
      }
    }

    setImgUrl(newImgUrl);
  }, [exam, student, currentState, isAnswerSheet, dispatch]);

  const [openAnswer, handleOpenAnswer, handleCloseAnswer] =
    useToggleOpen(false);

  const isMobile = useResponsive('down', 'md');

  const generateChangeEventHandler = (index: number) => {
    if (!(currentState === timeState.inExam)) return;
    const handleChangeAnswer = (event: React.ChangeEvent, value: string) => {
      const newAnswerSheet = [...answerSheet];
      newAnswerSheet[index] = value;
      setAnswerSheet(newAnswerSheet);

      localStorage.setItem(
        'answerSheet' + exam.name,
        newAnswerSheet.map((char) => (char === '' ? ' ' : char)).join('')
      );
    };

    return handleChangeAnswer;
  };

  const handleSubmit = useCallback(
    async (byUser: boolean) => {
      if (!exam || !exam._id || isSubmitted) return;
      if (student.fullName === '') {
        dispatch(
          appActions.showNotification({
            variant: 'success',
            message: 'Vui lòng nhập họ và tên hoặc đăng nhập.',
          })
        );
        return;
      }
      const data: AnswerType = {
        student: student._id,
        studentName: student.fullName,
        exam: exam._id,
        answer: answerSheet.map((char) => (char === '' ? ' ' : char)).join(''),
        type: exam.isUpcoming ? AnswerEnum.main : AnswerEnum.sub,
      };
      try {
        if (byUser) {
          if (window.confirm('Bạn có chắc muốn nộp bài sớm?')) {
            const { data: response } = await postAnswer(data);
            onSubmit(response);
            if (exam.isUpcoming)
              dispatch(
                appActions.showNotification({
                  variant: 'success',
                  message:
                    'Nộp bài thành công, kết quả sẽ có sau khi hết giờ làm bài.',
                })
              );
            setIsDisabled(true);
          }
        } else {
          const { data: response } = await postAnswer(data);
          onSubmit(response);
          setIsDisabled(true);
        }
      } catch (error) {
        dispatch(
          appActions.showNotification({
            variant: 'error',
            message: 'Có lỗi xảy ra khi nộp bài.',
          })
        );
      }
    },
    [answerSheet, dispatch, exam, isSubmitted, onSubmit, student]
  );

  useEffect(() => {
    //if (currentState === timeState.beforeExam || !exam.isUpcoming) return;
    const answerData = localStorage.getItem('answerSheet' + exam.name);
    if (answerData !== undefined && answerData !== null) {
      try {
        let charArray = answerData.split('');
        if (charArray.length > exam.numberOfQuestion) {
          charArray = charArray.slice(0, exam.numberOfQuestion);
        }
        setAnswerSheet(charArray);
        Object.keys(localStorage).forEach((key) => {
          if (
            key.includes('answerSheet') &&
            key !== 'answerSheet' + exam.name
          ) {
            localStorage.removeItem(key);
          }
        });
        return;
      } catch (err) {
        console.log(err);
      }
    }

    setAnswerSheet(new Array(exam.numberOfQuestion).fill(''));
  }, [exam, currentState]);

  const [prevCurrentState, setPrevCurrentState] = useState<Number | null>(null); //For check currentState change from 2 to 3

  useEffect(() => {
    if (
      prevCurrentState === timeState.inExam &&
      currentState === timeState.afterExam &&
      isSubmitted === false
    ) {
      handleSubmit(false);
    }
    setPrevCurrentState(currentState);
  }, [currentState, isSubmitted, handleSubmit, prevCurrentState]);

  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (e) {}
  }, []);
  return (
    <Fragment>
      <Grid item md={12} xs={12}>
        <Typography
          textAlign="center"
          fontWeight="bold"
          color="purple"
          fontFamily="Times New Roman"
          fontSize="18px"
        >
          {isAnswerSheet ? (
            <>
              {currentState < timeState.afterExam && (
                <>
                  Đáp án sẽ được mở sau:
                  <Countdown
                    date={dayjs(exam.startTime).add(exam.duration, 'minute')}
                  />
                </>
              )}
            </>
          ) : (
            <>
              {' '}
              {currentState === timeState.beforeExam && (
                <>
                  Đề sẽ được mở sau:
                  <Countdown date={dayjs(exam.startTime)} />
                </>
              )}
              {currentState === timeState.inExam && !isSubmitted && (
                <>
                  Thời gian còn lại:
                  <Countdown
                    date={dayjs(exam.startTime).add(exam.duration, 'minute')}
                  />
                </>
              )}
              {currentState === timeState.inExam && isSubmitted && (
                <>
                  Kết quả sẽ có sau:
                  <Countdown
                    date={dayjs(exam.startTime).add(exam.duration, 'minute')}
                  />
                </>
              )}
            </>
          )}
        </Typography>
      </Grid>
      <Grid
        container
        spacing={1}
        my={2}
        bgcolor="#fae9ea"
        sx={{ minHeight: '600px' }}
      >
        <Grid item xs>
          <Box
            sx={{
              minHeight: '700px',
              maxHeight: 'calc(100vh + 50px)',
              overflowY: 'scroll',
              border: '1px solid #DE5173',
            }}
          >
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                display: 'block',
              }}
              src={''}
            />
            {imgUrl === exam.questionUrl && (
              <iframe
                title="PDF Viewer"
                src={exam.questionUrl}
                style={{
                  minHeight: '800px',
                  width: '100%',
                  overflow: 'scroll',
                }}
              ></iframe>
            )}

            {imgUrl === exam.answerUrl && (
              <iframe
                title="PDF Viewer"
                src={exam.answerUrl}
                style={{
                  minHeight: '800px',
                  width: '100%',
                  overflow: 'scroll',
                }}
              ></iframe>
            )}
            {/* {imgUrl === '' && (
              <div>
                <Typography
                  textAlign="center"
                  color="purple"
                  fontFamily="Times New Roman"
                  fontSize="14px"
                >
                  Xem quảng cáo để ủng hộ người làm đề nha. Cảm ơn các bạn ♡
                </Typography>
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-5493900609831971"
                  data-ad-slot="9031749033"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
              </div>
            )} */}
          </Box>
        </Grid>
        <Grid
          item
          sx={{ width: '165px', display: { xs: 'none', md: 'block' } }}
        >
          <Stack alignItems="center">
            <Box
              sx={{
                pl: 1,
                border: '1px solid #DE5173',
                maxHeight: '100vh',
                overflowY: 'scroll',
                width: '100%',
                backgroundColor: 'white',
              }}
            >
              {answerSheet.map((value, index: number) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    backgroundColor:
                      currentState === timeState.afterExam && result
                        ? answerSheet[index] === exam.answerSheet[index]
                          ? '#AAD0AA'
                          : '#EAC8C8'
                        : 'white',
                  }}
                >
                  <Typography fontFamily="Times New Roman">
                    {' '}
                    {index + 1}
                  </Typography>
                  <RadioGroup
                    value={answerSheet[index]}
                    row
                    onChange={generateChangeEventHandler(index)}
                  >
                    <AnswerRadio
                      value="A"
                      isGreen={
                        currentState === timeState.afterExam &&
                        result !== null &&
                        answerSheet[index] !== exam.answerSheet[index] &&
                        exam.answerSheet[index] === 'A'
                      }
                    />
                    <AnswerRadio
                      value="B"
                      isGreen={
                        currentState === timeState.afterExam &&
                        result !== null &&
                        answerSheet[index] !== exam.answerSheet[index] &&
                        exam.answerSheet[index] === 'B'
                      }
                    />
                    <AnswerRadio
                      value="C"
                      isGreen={
                        currentState === timeState.afterExam &&
                        result !== null &&
                        answerSheet[index] !== exam.answerSheet[index] &&
                        exam.answerSheet[index] === 'C'
                      }
                    />
                    <AnswerRadio
                      value="D"
                      isGreen={
                        currentState === timeState.afterExam &&
                        result !== null &&
                        answerSheet[index] !== exam.answerSheet[index] &&
                        exam.answerSheet[index] === 'D'
                      }
                    />
                  </RadioGroup>
                </Stack>
              ))}
            </Box>
            <Button
              variant="gradient"
              sx={{ my: 1, width: '150px' }}
              disabled={
                currentState === timeState.inExam && !isDisabled ? false : true
              }
              onClick={() => handleSubmit(true)}
            >
              {' '}
              Nộp bài{' '}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      {isMobile && (
        <Fragment>
          <Fab
            size="small"
            color="secondary"
            aria-label="open"
            sx={{ position: 'fixed', bottom: 20, right: 10 }}
            onClick={handleOpenAnswer}
          >
            <FormatListNumberedIcon />
          </Fab>
          <Dialog
            open={openAnswer}
            maxWidth="lg"
            fullWidth
            onClose={handleCloseAnswer}
          >
            <Typography
              fontFamily="Times New Roman"
              fontWeight="bold"
              textAlign="center"
              fontSize="18px"
              mt={2}
            >
              PHIẾU TRẢ LỜI
            </Typography>
            <Box sx={{ px: 2, background: 'white' }}>
              <Grid
                container
                sx={{ padding: 1, my: 2, border: '1px solid #DE5173' }}
              >
                {/* convert answerSheet to [ [Q,Q,Q,Q,Q], [Q,Q,Q,Q,Q], [Q,Q,Q,Q,Q] ] then mapping into chunk of 5 element  */}
                {answerSheet
                  .reduce((groups: any[], current, index) => {
                    if (index % 5 === 0) {
                      groups.push([]);
                    }
                    groups[groups.length - 1].push(current);
                    return groups;
                  }, [])
                  .map((group, index: number) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Stack direction="column" sx={{ px: { sm: 1 } }}>
                        {group.map((v: any, index2: number) => {
                          const currentIndex = index * 5 + index2;
                          return (
                            <Stack key={currentIndex}>
                              <Stack
                                key={currentIndex}
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                sx={{
                                  backgroundColor:
                                    currentState === timeState.afterExam &&
                                    result
                                      ? answerSheet[currentIndex] ===
                                        exam.answerSheet[currentIndex]
                                        ? '#AAD0AA'
                                        : '#EAC8C8'
                                      : 'white',
                                }}
                              >
                                <Typography
                                  fontFamily="Times New Roman"
                                  minWidth={20}
                                >
                                  {currentIndex + 1}
                                </Typography>
                                <RadioGroup
                                  value={answerSheet[currentIndex]}
                                  row
                                  onChange={generateChangeEventHandler(
                                    currentIndex
                                  )}
                                >
                                  <AnswerRadio
                                    value="A"
                                    isGreen={
                                      currentState === timeState.afterExam &&
                                      result !== null &&
                                      answerSheet[currentIndex] !==
                                        exam.answerSheet[currentIndex] &&
                                      exam.answerSheet[currentIndex] === 'A'
                                    }
                                  />
                                  <AnswerRadio
                                    value="B"
                                    isGreen={
                                      currentState === timeState.afterExam &&
                                      result !== null &&
                                      answerSheet[currentIndex] !==
                                        exam.answerSheet[currentIndex] &&
                                      exam.answerSheet[currentIndex] === 'B'
                                    }
                                  />
                                  <AnswerRadio
                                    value="C"
                                    isGreen={
                                      currentState === timeState.afterExam &&
                                      result !== null &&
                                      answerSheet[currentIndex] !==
                                        exam.answerSheet[currentIndex] &&
                                      exam.answerSheet[currentIndex] === 'C'
                                    }
                                  />
                                  <AnswerRadio
                                    value="D"
                                    isGreen={
                                      currentState === timeState.afterExam &&
                                      result !== null &&
                                      answerSheet[currentIndex] !==
                                        exam.answerSheet[currentIndex] &&
                                      exam.answerSheet[currentIndex] === 'D'
                                    }
                                  />
                                </RadioGroup>
                              </Stack>
                            </Stack>
                          );
                        })}
                      </Stack>
                      <Divider flexItem sx={{ my: 1 }} />
                    </Grid>
                  ))}
              </Grid>
            </Box>

            <Button
              variant="gradient"
              sx={{ my: 1, width: '150px', mx: 'auto' }}
              disabled={
                currentState === timeState.inExam && !isDisabled ? false : true
              }
              onClick={() => handleSubmit(true)}
            >
              Nộp bài
            </Button>
            <IconButton
              // onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              size="small"
              onClick={handleCloseAnswer}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Dialog>
        </Fragment>
      )}
      <SlotMachineDialog
        colorProp={colorProp}
        coinsValue={result ? result.coins : 11000}
        open={isOpenSlotMachineDialog}
        handleClose={() => setIsOpenSlotMachineDialog(false)}
      />
    </Fragment>
  );
};

export default Sheet;
