import React, { useRef, useEffect, useState } from 'react'
import { select, json, scaleLinear, line, extent } from 'd3';
import { dat } from '../data';

console.log(dat)

function Radar() {

    const [data, setData] = useState(dat)
    const [player, setPlayer] = useState()
    const containerRef = useRef(null)

    const margin = { top: 20, right: 10, bottom: 60, left: 10 },
            width = 760 - margin.left - margin.right,
            height = 450 - margin.top - margin.bottom;

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
          
    useEffect(() => {
        // json('data.json').then(data => setData(data))

        let scale = scaleLinear()
        .domain([0, 1])
        .range([0, 2 * Math.PI]);

        const radius = 200;
        const ticks = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
        
        var svg = select(containerRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
            .attr('fill', 'gray');
        
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
    
          
         //axis values
         const {x, y} = cordForAngle(slice, radius)
 
         svg.append('line')
          .attr('x2', x + width /2)
          .attr('y2', y + height/2)
          .attr('x1', width/2)
          .attr('y1', height/2)
          .attr('stroke', 'white')
          .attr('stroke-width', 1.5)
          .style('opacity', '0.1')

          svg.append('text')
          .attr('x', x + width/2)
          .attr('y', y + height/2)
          .text(capitalize(key))
          .style('text-anchor', d => (i === 0 ? 'end': i === 1 ? 'end': i=== 2 ? 'end':  i=== 2 ? 'end' : null))
          .attr('dx', d => (i === 0 ? '0.7em' : i === 1 ? '-0.7em'  : i === 2 ? '-0.5em': i === 3 ? '0.3em' : '0.6em'))
          .attr('dy', d => (i === 0 ? '1.3em': i === 1 ? '0.4em': i === 2 ? '-0.5em': i === 3 ? '-0.5em' : '0.4em'))
          .attr('fill', 'white')
        }
        
       
        //circlce labels
      ticks.forEach(el => {
        svg.append('text')
        .attr('x', width/2)
        .attr('y', height/2 - radAxis(el) - 0.85)
        .text(el)
        .attr('fill', 'white')
        .attr('stroke', 'none')
        .attr('opacity', '0.5')
        .style('text-anchor', 'middle')
        .style('font-size', '0.825rem')
        .style('', '')

        console.log('ele', el)
      })

      //circes levels
       ticks.forEach(el => {
        svg.append('circle')
          .attr('cx', width/2)
          .attr('cy', height/2)
          .attr('fill', 'none')
          .attr('stroke', 'gray')
          .attr('stroke-width', 1.0)
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

        //spider chart 
        svg.append('path')
        .datum(cord)
        .attr('class', 'areapath')
        .attr("d",lineGen)
        .attr("stroke-width",1.5)
        .attr("stroke", 'none')
        .attr("fill", () => i === 0 ? '#FFC4DD': '#B4FF9F')
        // .attr("stroke-opacity", 1)
        .attr("opacity", 0.1)
        .attr('transform', `translate(${width/2}, ${height/2})`)
        .on('mouseenter', (e, d) => console.log(d));
              // console.log(d)
        }

        //legends
        svg.append("circle")
        .attr("cx",width/2 + 250)
        .attr("cy", height/2 + 150)
        .attr("r", 10)
        .style("fill", "#FFC4DD")
        .style("opacity", "0.5")
        
        svg.append("circle")
        .attr("cx", width/2 + 250)
        .attr("cy", height/2 + 180)
        .attr("r", 10)
        .style("fill", "#B4FF9F")
        .style("opacity", "0.7")

        svg.append('text')
        .attr('y', height/2 + 150)
        .attr('x', width/2 + 280)
        .html('Messi')
        .style('stroke', 'none')
        .style('fill', 'white')

        svg.append('text')
        .attr('y', height/2 + 185)
        .attr('x', width/2 + 280)
        .html('Cristiano')
        .style('stroke', 'none')
        .style('fill', 'white')



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
    <svg  viewBox={`0 0 ${width + 100} ${height + 100}`} ref={containerRef} >
    </svg>
  )
}

export default Radar