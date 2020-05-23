import React, { useRef, useEffect, useState } from "react";
import { SampleData } from "../../MockApi";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import random from "canvas-sketch-util/random";
import palattes from "nice-color-palettes";

const LineChartBasic = () => {
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

        const [yHignMin, yHighMax] = d3.extent(adapted, (d) => d.high);
        const [yLowMin, yLowMax] = d3.extent(adapted, (d) => d.low);

        const domain = [
          Math.min(yHignMin, yLowMin, 0),
          Math.max(yHighMax, yLowMax),
        ];

        const yScale = d3.scaleLinear().domain(domain).range([height, 0]);

        const t = adapted.map((d) => ({
          high: {
            x: xScale(d.date),
            y: yScale(d.high),
            color: "red",
          },
          low: {
            x: xScale(d.date),
            y: yScale(d.low),
            color: "green",
          },
          avg: {
            x: xScale(d.date),
            y: yScale(d.avg),
            color: "blue",
          },
        }));

        setData(t);
      });
    }
  }, [graphRef]);

  useEffect(() => {
    if (graphRef.current && data) {
      const highLine = d3
        .line()
        .x((d) => d.high.x)
        .y((d) => d.high.y);

      const lowLine = d3
        .line()
        .x((d) => d.low.x)
        .y((d) => d.low.y);

      const avgLine = d3
        .line()
        .x((d) => d.avg.x)
        .y((d) => d.avg.y);

      const svg = d3.select(graphRef.current);

      svg
        .append("path")
        .attr("d", highLine(data))
        .attr("fill", "rgba(255,0,0,0.1)")
        .attr("stroke", "red");

      svg
        .append("path")
        .attr("d", lowLine(data))
        .attr("fill", "rgba(0,125,0,0.1)")
        .attr("stroke", "green");

      svg
        .append("path")
        .attr("d", avgLine(data))
        .attr("fill", "rgba(255,165,0,0.1)")
        .attr("stroke", "orange");
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

export default LineChartBasic;
