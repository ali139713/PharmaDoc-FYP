import React from 'react';
import {Line} from 'react-chartjs-2';

const LineChart = (props) => {
    return (
        <div>
             <Line
          data={props.state}
          options={{
            title:{
              display:true,
              text:'Average Sales per year',
              fontSize:20,
              
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
        </div>
    );
};

export default LineChart;