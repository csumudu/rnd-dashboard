import React, { useRef, useEffect, useState } from "react";
import { SampleData } from "../../MockApi";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import random from "canvas-sketch-util/random";
import palattes from "nice-color-palettes";

const gap = 10;
const padX = 30;

const BasicMain = () => {
  const graphRef = useRef();
  const [data, setData] = useState();
  const [palette, setPalette] = useState(random.pick(palattes));

  useEffect(() => {
    SampleData()
      .then((d) => {
        setData(d);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    if (graphRef.current && data) {
      const height = graphRef.current.getBoundingClientRect().height - padX * 2;
      const width = graphRef.current.getBoundingClientRect().width - padX * 2;
      const rectWidth = (width - gap * data.length) / data.length;

      const [min, max] = d3.extent(data, (d) => d.val);

      const scaleY = d3.scaleLinear().domain([0, max]).range([height, 0]);
      const scaleX = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .range([0, width]);

      const yAxis = d3.axisLeft().scale(scaleY);
      const xAxis = d3.axisBottom().scale(scaleX);

      const svg = d3.select(graphRef.current);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
          return i ? i * (rectWidth + gap) + padX + gap : padX + gap;
        })
        .attr("y", function (d) {
          return scaleY(d.val) + padX;
        })
        .attr("width", rectWidth)
        .attr("height", function (d) {
          return height - scaleY(d.val);
        })
        .attr("fill", (d) => random.pick(palette))
        .attr("stroke", "#fff");

      svg
        .append("g")
        .attr("transform", `translate(${padX},${padX})`)
        .call(yAxis);
      svg
        .append("g")
        .attr("transform", `translate(${padX},${height + padX})`)
        .call(xAxis);
    }
  }, [data, graphRef]);

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

export default BasicMain;
