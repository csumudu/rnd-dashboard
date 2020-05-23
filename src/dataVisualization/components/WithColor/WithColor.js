import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const WithColor = () => {
  const graphRef = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    if (graphRef.current) {
      d3.json(
        "https://raw.githubusercontent.com/sxywu/react-d3-example/master/public/sf.json"
      ).then((resp) => {
        const adapted = resp.map((d) =>
          Object.assign(d, { date: new Date(d.date) })
        );

        const height = graphRef.current.getBoundingClientRect().height;
        const width = graphRef.current.getBoundingClientRect().width;

        const xExtent = d3.extent(adapted, (d) => d.date);
        const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);

        const [yMin, yMax] = d3.extent(adapted, (d) => d.high);
        const yScale = d3
          .scaleLinear()
          .domain([Math.min(yMin, 0), yMax])
          .range([height, 0]);

        const [cMin, cMax] = d3.extent(adapted, (d) => d.avg);
        const colScale = d3
          .scaleSequential()
          .domain([cMax, cMin])
          .interpolator(d3.interpolateRdYlBu);

        const t = adapted.map((d) => ({
          x: xScale(d.date),
          y: yScale(d.high),
          height: yScale(d.low) - yScale(d.high),
          fill: colScale(d.avg),
        }));

        setData(t);
      });
    }
  }, [graphRef]);

  useEffect(() => {
    if (graphRef.current && data) {
      const svg = d3.select(graphRef.current);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d) => d.x)
        .attr("y", (d) => d.y)
        .attr("width", 2)
        .attr("height", (d) => d.height)
        .attr("fill", (d) => d.fill);
    }
  }, [data]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 10 }}>
            <svg ref={graphRef} style={{ width: "100%", height: 400 }}></svg>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default WithColor;
