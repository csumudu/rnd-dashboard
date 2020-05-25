import React, { useRef, useEffect, useState } from "react";
import { SampleData } from "../../MockApi";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import random from "canvas-sketch-util/random";
import palattes from "nice-color-palettes";
import { temData } from "./data";

const city = "New York";
const gap = 1;
const margins = { top: 50, bottom: 50, left: 100, right: 50 };

const WithAxis = () => {
  const graphRef = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    const adapted = temData
      .map((d) => {
        let x = d3.timeParse("%Y%m%d")(d.date);
        if (x) {
          x = new Date(x); // x
          return { ...d, date: x, tmp: +d[city] };
        }
        return null;
      })
      .filter((d) => !!d);

    //adapted.length = 10;
    setData(adapted);
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      const height = graphRef.current.getBoundingClientRect().height;
      const width = graphRef.current.getBoundingClientRect().width;

      const graphWidth = width - margins.left - margins.right;
      const graphHeight = height - margins.top - margins.bottom;

      const barWidth = (graphWidth - gap * data.length) / data.length;
      console.log(barWidth);

      const scaleY = d3
        .scaleLinear()
        .domain([
          Math.min(
            d3.min(data, (d) => d.tmp),
            0
          ),
          d3.max(data, (d) => d.tmp),
        ])
        .range([graphHeight, 0]);

      const xDomain = d3.extent(data, (d) => d.date);
      console.log(xDomain);
      const scaleX = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => d.date))
        .range([0, graphWidth - barWidth]); // Need to subsctract barwidth else last item will be off the screen

      const yAxis = d3.axisLeft().scale(scaleY);
      const xAxis = d3.axisBottom().scale(scaleX);

      const svg = d3.select(graphRef.current);

      const graph = svg
        .append("g")
        .attr("transform", `translate(${margins.left},${margins.top})`)
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => scaleX(d.date))
        .attr("y", (d) => scaleY(d.tmp))
        .attr("height", (d) => graphHeight - scaleY(d.tmp))
        .attr("width", barWidth)
        .attr("fill", "green");

      const y = svg
        .append("g")
        .attr("transform", `translate(${margins.left - 10},${margins.top})`)
        .call(yAxis);

      const x = svg
        .append("g")
        .attr(
          "transform",
          `translate(${margins.left},${graphHeight + margins.top + 10})`
        )
        .call(xAxis);
    }
  }, [data]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 10 }}>
            <svg
              ref={graphRef}
              style={{
                width: "100%",
                height: 300,
                border: "solid 1px #cfcfcf",
              }}
            ></svg>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default WithAxis;
