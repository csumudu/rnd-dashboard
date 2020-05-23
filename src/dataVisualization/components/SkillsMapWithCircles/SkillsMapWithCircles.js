import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import random from "canvas-sketch-util/random";
import palattes from "nice-color-palettes";

const SkillsMapWithCircles = () => {
  const graphRef = useRef();
  const [data, setData] = useState();
  const [svgData, setSvgData] = useState();
  const [wh, setWH] = useState({});
  const [palette, setPalette] = useState(random.pick(palattes));

  useEffect(() => {
    d3.csv(
      "https://gist.githubusercontent.com/mbostock/3007180/raw/2f604adf60cc5d1c82426c52471df35bbc2d47a2/exoplanets.csv",
      ({ name, radius, distance }) => ({
        name,
        radius: +radius,
        distance: distance ? +distance : NaN,
      })
    ).then((d) => {
      console.log(d);
      setData(d);
    });
  }, []);

  useEffect(() => {
    if (graphRef && graphRef.current && data) {
      const height = graphRef.current.getBoundingClientRect().height;
      const width = graphRef.current.getBoundingClientRect().width;
      setWH({ width, height });

      const radiusScale = d3
        .scaleQuantize()
        .domain(d3.extent(data, (d) => d.radius))
        .range(palette);

      const adpted = data.map((d) => {
        return {
          ...d,
          color: radiusScale(d.radius),
        };
      });

      const packLayout = d3.pack().size([width, height]).padding(5);
      const rootNode = d3.hierarchy({
        name: "A1",
        children: adpted,
      });

      rootNode.sum(function (d) {
        return d.radius;
      });

      const d = packLayout(rootNode).descendants().slice(1);

      const d2 = d3.packSiblings(
        adpted
          .map((d) => ({ ...d, r: d.radius }))
      );

      console.log(d2);
      setSvgData(d);
    }
  }, [data, graphRef, palette]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper style={{ padding: 10 }}>
            <svg ref={graphRef} style={{ width: "100%", height: 400 }}>
              {svgData &&
                svgData.map((s, k) => (
                  <circle
                    fill={s.color}
                    cx={s.x}
                    cy={s.y}
                    r={s.r}
                    fill={s.color}
                  ></circle>
                ))}
            </svg>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SkillsMapWithCircles;
