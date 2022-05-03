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
    const [player, setPlayer] = useState()
    const containerRef = useRef(null)
  const margin = { top: 10, right: 10, bottom: 10, left: 10 },
            width = 760 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

    
          
    useEffect(() => {
        // json('data.json').then(data => setData(data))

        let scale = scaleLinear()
        .domain([0, 1])
        .range([0, 2 * Math.PI]);

        const radius = 200;
        // const levels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110];
        const ticks = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        
        var svg = select(containerRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
  
        

        const attributes = Object.keys(data[0])
        //radial scale
        const radAxis = scaleLinear()
          .domain([0.1, 1.0])
          .range([0, 200])

          const rad = scaleLinear()
          .domain([0.1, 10])
          .range([0, radius])
          // console.log(radAxis.domain())

        const angleToDeg = (angle) => {
          return angle * (180 / Math.PI)
        }
        const cordForAngle = (angle, len) => {
          
           let x=  Math.cos(angle) * (len);
           let y= Math.sin(angle) * (len);
          
          return {"x": x, "y": y};
        }
        
        //round axis
        for (var i = 0; i < attributes.length; i++) {
          const slice = (Math.PI / 2) + (2 * Math.PI * i / attributes.length)
          // const angles = angleToDeg(slice) 
          console.log('slice', slice)
          const key = attributes[i]
          console.log('ll')
          
          //axis values
          const {x, y} = cordForAngle(slice, radius)

          //attributes values
          // const {xValue, yValue } = cordForAngle(slice, radius)
 
         svg.append('line')
          .attr('x2', x + width /2)
          .attr('y2', y + height/2)
          .attr('x1', width/2)
          .attr('y1', height/2)
          // .attr('transform', `rotate(${angles})`)
          .attr('stroke', 'black')
          .attr('stroke-width', 1.5)

          svg.append('text')
          .attr('x', x + width/2)
          .attr('y', y + height/2)
          .text(key)
          .style('text-anchor', d => (i === 0 ? 'end': i === 1 ? 'end': i=== 2 ? 'end' : null))
          // .style('text-anchor', d => (i === 1 ? 'end': i<2 ? 'end' : i <=3 ))
          // x<13 ? "Child" : x<20 ? "Teenage" : x<30 ? "Twenties" : "Old people"
          // .attr('dy', "0.3em")
          .attr('fill', 'white')
          .attr('class', '')
        }
        
       
        //circlce labels
      ticks.forEach(el => {
        svg.append('text')
        .attr('x', width/2)
        .attr('y', height/2 - radAxis(el) - 0.85)
        .text(el)
        .attr('fill', 'none')
        .attr('stroke', 'red')
        // 
        .style('text-anchor', 'end')

        console.log('ele', el)
      })

       ticks.forEach(el => {
        
        svg.append('circle')
          .attr('cx', width/2)
          .attr('cy', height/2)
          .attr('fill', 'none')
          .attr('stroke', 'gray')
          .attr('stroke-width', 1.5)
          .attr('r', radAxis(el))
       })
        
       //line generator 
       let lineGen = line()
        .x(d => d.x)
        .y(d => d.y)

       const getCoordPath = (dataPoint) => {
        let coord = [];
        for(let i=0; i<attributes.length; i++){
          let attr = attributes[i]
          let angle = (Math.PI / 2) + (2 * Math.PI * i / attributes.length);
          coord.push(cordForAngle(angle, radAxis(dataPoint[attr])))
        }
        return coord;
       }

       const finalPath = []
        for(let i=0; i<data.length; i++ ){
          let d = data[i]
          const cord = getCoordPath(d)
          // console.log('coord', cord)
          finalPath.push(cord)

        svg.append('path')
        .datum(cord)
        .attr('class', 'areapath')
        .attr("d",lineGen)
        .attr("stroke-width",1.5)
        .attr("stroke", 'pink')
        .attr("fill", () => i === 0 ? '#FFC4DD': '#B4FF9F')
        .attr("stroke-opacity", 1)
        .attr("opacity", 0.5)
        .attr('transform', `translate(${width/2}, ${height/2})`)
        .on('mouseenter', (e, d) => console.log(d));
              // console.log(d)
        }
        svg.append("circle")
        .attr("cx",width/2 + 250)
        .attr("cy", height/2 + 150)
        .attr("r", 10)
        .style("fill", "#FFC4DD")
        svg.append("circle")
        .attr("cx", width/2 + 250)
        .attr("cy", height/2 + 180)
        .attr("r", 10)
        .style("fill", "#B4FF9F")

        svg.append('text')
        .attr('y', height/2 + 150)
        .attr('x', width/2 + 280)
        .html('Messi')
        .style('stroke', 'white')
        svg.append('text')
        .attr('y', height/2 + 185)
        .attr('x', width/2 + 280)
        .html('Cristiano')
        .style('stroke', 'white')



        // svg.selectAll('rect')
        //   .data([])
        //   .append('rect')
        //   .attr('x', 10)
        //   .attr('y', )
        //   .attr()
        console.log(player)


    },[data])
   
// if(data) console.log(data)


  return (
    <svg  viewBox={`0 0 ${width} ${height}`} ref={containerRef} >
    </svg>
  )
}

export default Radar