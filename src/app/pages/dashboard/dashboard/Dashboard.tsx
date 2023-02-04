import React from 'react';
import { Line } from 'react-chartjs-2';
import AllData from '../../../components/Dashboard/AllData/AllData';
import LineData from '../../../components/Dashboard/LineData/LineData';

const Dashboard = () => {
  return (
    <div>
      <AllData />
      <LineData />
    </div>
  );
};

export default Dashboard;
