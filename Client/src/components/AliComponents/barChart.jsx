import React from 'react';
import {Bar} from 'react-chartjs-2';

const BarChart = (props) => {
    return (
        <div>
            <Bar
          data={props.state}
          options={{
            title:{
              display:true,
              text:'Average Sales per month',
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

export default BarChart