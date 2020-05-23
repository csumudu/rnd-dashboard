import React, { useRef, useEffect, useState } from "react";
import { SampleData } from "../../MockApi";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import random from "canvas-sketch-util/random";
import palattes from "nice-color-palettes";

const circleradis = 100;

const RadialChart = () => {
  const graphRef = useRef();
  const [wh, setWH] = useState();
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

        setWH({
          height,
          width,
        });

        const xExtent = d3.extent(adapted, (d) => d.date);
        const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);

        const min = d3.min(adapted, (d) => d.low);
        const max = d3.min(adapted, (d) => d.high);

        const radiusScale = d3
          .scaleLinear()
          .domain([Math.min(min, 0), max])
          .range([0, circleradis]);

        const colorExt = d3.extent(adapted, (d) => d.avg);
        const colorScale = d3
          .scaleSequential()
          .domain(colorExt.reverse())
          .interpolator(d3.interpolateRdYlBu);

        console.log(colorScale(10));

        const t = adapted.map((d) => ({
          date: d.date,
          innerR: radiusScale(d.low),
          outerR: radiusScale(d.high),
          fill: colorScale(d.avg),
          xScale,
        }));

        setData(t);
      });
    }
  }, [graphRef]);

  useEffect(() => {
    if (graphRef.current && data) {
      const height = graphRef.current.getBoundingClientRect().height;
      const width = graphRef.current.getBoundingClientRect().width;

      const pie = d3.pie().value((d) => d.date);

      const circleRadiusScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.high)])
        .range([10, circleradis]);

      const withAngle = pie(data).reduce((acc, cuu, i) => {
        const t = data[i];
        acc.push({ ...t, ...cuu });
        return acc;
      }, []);

      console.log(withAngle);

      var arc = d3
        .arc()
        .innerRadius((d) => d.innerR)
        .outerRadius((d) => d.outerR)
        .startAngle((d) => d.startAngle)
        .endAngle((d) => d.endAngle);

      let svg = d3.select(graphRef.current);

      svg = svg
        .select(".bars")
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      svg = svg
        .selectAll("path")
        .data(withAngle)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => d.fill)
        .attr("stroke", (d) => d.fill);
    }
  }, [data]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 10 }}>
            <svg ref={graphRef} style={{ width: "100%", height: 400 }}>
              <g className="bars"></g>
              {data &&
                [1, 2, 3, 4, 5].map((d, i) => (
                  <circle
                    cx={wh && wh.width / 2}
                    cy={wh && wh.height / 2}
                    r={i * 50}
                    fill="none"
                    strokeWidth="1"
                    stroke="#dfdfdf"
                  ></circle>
                ))}
            </svg>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default RadialChart;
