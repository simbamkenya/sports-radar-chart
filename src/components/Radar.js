import React, { useRef, useEffect, useState } from 'react'
import { select, json, scaleLinear } from 'd3';

function Radar() {

    const [data, setData] = useState([])
    const containerRef = useRef(null)

    useEffect(() => {
        json('data.json').then(data => setData(data))

        const margin = { top: 10, right: 10, bottom: 10, left: 10 },
            width = 760 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;
        
        var svg = select(containerRef.current)
          .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
          
            svg.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
        console.log('ll', data)

        const keys = data.map(d => d.player)
        console.log(keys)

    },[])
   
// if(data) console.log(data)


  return (
    <div ref={containerRef} ></div>
  )
}

export default Radar