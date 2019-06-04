import React from 'react';
import {
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    Legend,
    ResponsiveContainer
  } from "recharts";
import Colors from "../../colors";
import InlineStyles from "../../inlineStyles";


const StackedBarChart = props => {
    return ( 
        <div className="StackedBarChart ygoChart centredFlexContainer">
        <h2>{props.children}</h2>
        <ResponsiveContainer height={300} width="90%" >
            <BarChart outerRadius={110} width={400} height={400} data={props.data}>
                <XAxis dataKey={props.dataKeyName} stroke={Colors.primaryLight} />
                <YAxis stroke={Colors.primaryLight} />
                <Tooltip                
                wrapperStyle={InlineStyles.tooltipWrapperStyle}
                contentStyle={InlineStyles.wrapperTooltipStyle} 
                />
                <Legend />
                <Bar dataKey={props.specificDataKeyNames[0]} stackId="a" fill={Colors.primaryLight} />
                <Bar dataKey={props.specificDataKeyNames[1]} stackId="a" fill={Colors.primaryDark} />
            </BarChart>
        </ResponsiveContainer>
    </div>
     );
}
 
export default StackedBarChart;