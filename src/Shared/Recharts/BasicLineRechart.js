import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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
            <h2>Users live on server</h2>
            <div className="Statistics page">
                <LineChart width={400} height={400} data={props.data}>
                    <Line type="monotone" dataKey="activeUsers" strokeWidth="2" stroke={Colors.primaryLight} />
                    <CartesianGrid stroke={Colors.primary} strokeDasharray="5 5" />
                    <XAxis dataKey="data1" stroke={Colors.primaryLight} />
                    <YAxis stroke={Colors.primaryLight} />                
                    <Tooltip 
                    wrapperStyle={tooltipWrapperStyle}
                    contentStyle={wrapperTooltipStyle} />
                </LineChart>
            </div>
        </div>
     );
}
 
export default BasicLineRechart;