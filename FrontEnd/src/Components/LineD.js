import React from 'react'
import { ResponsiveContainer,LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from 'recharts'

const pdata = [
    {
      leave:'Casual Leave',
      Days:7
    },
    {
      leave:'Maternity Leave',
      Days:90
    },
    {
      leave:'Sick Leave',
      Days:3
    },
    {
      leave:'Annual Leave',
      Days:9
    }
  ]
const LineD = () => {
    return (
        <div>
        <ResponsiveContainer width="100%" aspect="3">
        <LineChart data={pdata} width={100} height={100} margin={{top:50, right:30, left:20, bottom:5}}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="leave" interval="preserveStartEnd"/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Days" stroke="green" activeDot={{ r: 8 }}/>
        </LineChart>
        </ResponsiveContainer>
        </div>
    )
}

export default LineD
