import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Colors from '../../colors';

const BasicLineRechart = (props) => {

    const tooltipWrapperStyle = {
        color: Colors.primary
    }

    const wrapperTooltipStyle = {
        borderColor: Colors.primaryLight,
        backgroundColor: Colors.primaryDark,
        borderWidth: 1.5
    }

    return ( 
        <div className="BasicLineRechart centredFlexContainer" >
            <h2>{props.children}</h2>
                <ResponsiveContainer height={300} width="90%">
                    <LineChart width={400} height={400} data={props.data} margin={{top: 0, right: 40, left: 0, bottom: 0}}>
                        <Line 
                        type="monotone" 
                        dataKey={props.dataName}
                        strokeWidth="2" 
                        stroke={Colors.primaryLight} 
                        fill="black"
                        activeDot={{stroke: Colors.primaryLight, strokeWidth: 3}}
                         />
                        <CartesianGrid stroke={Colors.primary} strokeDasharray="5 5" />
                        <XAxis dataKey={props.dataKeyName} stroke={Colors.primaryLight} />
                        <YAxis stroke={Colors.primaryLight} />                
                        <Tooltip 
                        wrapperStyle={tooltipWrapperStyle}
                        contentStyle={wrapperTooltipStyle} />
                    </LineChart>
                </ResponsiveContainer>
        </div>
     );
}
 
export default BasicLineRechart;