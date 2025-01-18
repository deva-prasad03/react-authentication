import React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts';




const Graph = ({data}) => {

  // const data = [
  //   { name: 'Group A', value: 400 },
  //   { name: 'Group B', value: 300 },
  //   { name: 'Group C', value: 300 },
  //   { name: 'Group D', value: 200 },
  // ];
  
  const chartData = data.map(({ key, value }) => ({
    name: key,
    value: parseFloat(value), // Convert value to a number
  }));
  
  console.log('Transformed Data for Graph:', chartData);
  console.log('data');
  


  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


console.log(data);


  return (
    <div>




    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
      >
         {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]} // Use dynamic colors
            />
          ))}
      </Pie>
      <Tooltip />
    </PieChart>
 


    </div>
  )
}





export default Graph
