import React, { useRef, useEffect, useState } from "react";
import { SampleData } from "../../MockApi";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import random from "canvas-sketch-util/random";
import palattes from "nice-color-palettes";

const PiChart = () => {
  const graphRef = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    if (graphRef.current) {
      SampleData().then((d) => {
        setData(d);
      });
    }
  }, [graphRef]);

  useEffect(() => {
    if (graphRef.current && data) {
      const height = graphRef.current.getBoundingClientRect().height;
      const width = graphRef.current.getBoundingClientRect().width;
      const outerRadius = 130;

      const pie = d3.pie().value((d) => d.val);
      console.log(pie(data));
      const adapted = pie(data);

      var arc = d3
        .arc()
        .innerRadius(outerRadius - 30)
        .outerRadius(outerRadius)
        .startAngle((d) => d.startAngle)
        .endAngle((d) => d.endAngle);

      var arcPi = d3
        .arc()
        .innerRadius(0)
        .outerRadius(outerRadius)
        .startAngle((d) => d.startAngle)
        .endAngle((d) => d.endAngle);

      let svg = d3.select(graphRef.current);

      const graphOne = svg
        .append("g")
        .attr("transform", `translate(${width / 4},${height / 2})`);

      graphOne
        .selectAll("path")
        .data(adapted)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => d.data.color)
        .attr("stroke", (d) => d.data.color);

      const graphTwo = svg
        .append("g")
        .attr("transform", `translate(${(width / 4) * 3},${height / 2})`);

      graphTwo
        .selectAll("path")
        .data(adapted)
        .enter()
        .append("path")
        .attr("d", arcPi)
        .attr("fill", (d) => d.data.color)
        .attr("stroke", (d) => d.data.color);
    }
  }, [data]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 10 }}>
            <svg ref={graphRef} style={{ width: "100%", height: 300 }}></svg>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default PiChart;
