import React from "react";
import {
    RadarChart,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    Legend,
    ResponsiveContainer
  } from "recharts";
  import Colors from "../../colors";

const BasicRadarChart = props => {
  return (
    <div className="BasicLineRechart ygoChart centredFlexContainer">
        <h2>{props.children}</h2>
        <ResponsiveContainer height={300} width="90%" >

            <RadarChart outerRadius={110} width={400} height={400} data={props.data}>
                <PolarGrid />
                <PolarAngleAxis dataKey={props.dataKeyName} stroke={Colors.primaryLight} />
                <PolarRadiusAxis angle={30} domain={props.domainValue} stroke={Colors.primaryLight} />
                <Radar name={props.specificDataKeyNames[0]} dataKey={props.specificDataKeyNames[0]} stroke={Colors.primaryLight} fill={Colors.primaryLight} fillOpacity={0.4} />
                <Radar name={props.specificDataKeyNames[1]} dataKey={props.specificDataKeyNames[1]} stroke={Colors.secondaryLightColor} fill={Colors.secondaryLightColor} fillOpacity={0.4} />
                <Legend />
            </RadarChart>

        </ResponsiveContainer>
    </div>
  );
};

export default BasicRadarChart;
