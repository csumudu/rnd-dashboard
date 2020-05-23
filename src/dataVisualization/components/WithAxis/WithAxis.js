import React, { useRef, useEffect, useState } from "react";
import { SampleData } from "../../MockApi";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import random from "canvas-sketch-util/random";
import palattes from "nice-color-palettes";
import { temData } from "./data";

const city = "New York";
const gap = 2;
const padX = 50;

const WithAxis = () => {
  const graphRef = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    const adapted = temData.map((d) => {
      let x = d3.timeParse("%Y%m%d")(d.date);
      x = new Date(x); // x
      return { ...d, date: x, tmp: +d[city] };
    });
    adapted.length = 5;
    setData(adapted);
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      const height = graphRef.current.getBoundingClientRect().height;
      const width = graphRef.current.getBoundingClientRect().width - padX * 2;
      const rectWidth = (width - gap * data.length) / data.length;

      const [min, max] = d3.extent(data, (d) => d.tmp);
      console.log(min, max);
      const scaleY = d3.scaleLinear().domain([0, max]).range([height, 0]);
      const yAxis = d3.axisLeft().scale(scaleY);

      const svg = d3.select(graphRef.current);
      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
          return i ? i * (rectWidth + gap) + padX : padX;
        })
        .attr("y", function (d) {
          return height - scaleY(d.tmp || 0);
        })
        .attr("width", rectWidth)
        .attr("height", function (d) {
          return scaleY(d.tmp || 0);
        })
        .attr("fill", (d) => "blue")
        .attr("stroke", "blue");

      svg
        .append("g")
        .attr("transform", "translate(30,0)")
        .attr("height", height)
        .call(yAxis);
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

export default WithAxis;
