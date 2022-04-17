import React, { useRef, useEffect, useState } from 'react'
import { select, json, scaleLinear, line, extent } from 'd3';

function Radar() {
 const dat =   [
  {
    pace :	0.85,
    shooting :	0.92,
    passing :	0.91,
    dribbling: 0.95,
    physical:	0.65
   },
   {
    pace :	0.89,
    shooting :	0.93,
    passing :	0.81,
    dribbling : 0.89,
    physical :	0.77
   }
]

    const [data, setData] = useState(dat)
    const containerRef = useRef(null)

    useEffect(() => {
        // json('data.json').then(data => setData(data))

        const margin = { top: 10, right: 10, bottom: 10, left: 10 },
            width = 760 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;
          
        const radius = 110;
        const levels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
        
        var svg = select(containerRef.current)
          .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
  
        

        const attributes = Object.keys(data[0])
        //radial scale
        const radAxis = scaleLinear()
          .domain([10, 110])
          .range([0, 110])
          // console.log(radAxis.domain())

        const angleToDeg = (angle) => {
          return angle * 180 / Math.PI
        }
        const cordForAngle = (angle, offset=1) => {
          return [
            Math.cos(angle) * radius,
            Math.sin(angle) * radius
          ]
        }
        
        //round axis
       attributes.forEach((el, i) => {
         const slice = Math.PI * 2 / attributes.length
         const angles = angleToDeg(slice * (i + 1)) 
         console.log('slice', slice)

         const [x, y] = cordForAngle(angles)

        svg.append('line')
         .attr('x2', x+ width /2)
         .attr('y2',y +height/2)
         .attr('x1', width/2)
         .attr('y1', height/2)
        //  .attr('transform', `rotate(${angles})`)
         .attr('stroke', 'black')
         .attr('stroke-width', 1.5)

       
       })

       levels.forEach(el => {
        
        svg.append('circle')
          .attr('cx', width/2)
          .attr('cy', height/2)
          .attr('fill', 'none')
          .attr('stroke', 'green')
          .attr('stroke-width', 1.5)
          .attr('r', radAxis(el))
       })
        

    },[data])
   
// if(data) console.log(data)


  return (
    <div ref={containerRef} >
      {/* <svg>
      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
      </svg> */}
    </div>
  )
}

export default Radar