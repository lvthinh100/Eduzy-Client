import * as React from 'react';
import { BarPlot } from '@mui/x-charts/BarChart';
import { LineChart, LinePlot } from '@mui/x-charts/LineChart';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { AllSeriesType } from '@mui/x-charts/models';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { Paper } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchChart } from '../../api';

const chartsParams = {
  margin: { bottom: 50, left: 50, right: 50 },
  height: 400,
};
interface ChartProps {
  examId?: string;
}
const Chart: React.FC<ChartProps> = ({ examId }) => {
  const color = '#9ABBC2'; //AAD0AA
  const [data, setData] = useState<(number | null)[] | undefined>([0]);

  useEffect(() => {
    const fetchData = async (examId: string) => {
      try {
        if (!examId) return;
        const { data: response } = await fetchChart(examId);
        setData([null, ...response.data.array]);
      } catch (err) {
        console.log(err);
      }
    };

    if (examId) fetchData(examId);
  }, [examId]);
  return (
    <Paper
      sx={{
        textAlign: 'center',
        backgroundSize: '750px 400px',
        backgroundPosition: 'center top',
        borderRadius: 5,
        color: '#472422',
      }}
      elevation={5}
    >
      <LineChart
        {...chartsParams}
        series={[
          {
            data: data,
            label: 'Biểu đồ số câu trả lời đúng',
            color,
            area: true,
          },
        ]}
      />
    </Paper>
  );
};

export default Chart;
