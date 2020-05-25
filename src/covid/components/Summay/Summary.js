import React, { Component, createRef } from "react";
import * as d3 from "d3";
import { Button } from "@material-ui/core";

const gap = 2;
const margins = { top: 50, bottom: 80, left: 80, right: 50 };

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: 0,
      width: 0,
      scale: "log",
    };

    this.graphRef = createRef();
    this.svg = null;
    this.graph = null;
    this.yScaleLog = null;
    this.yScaleLiner = null;
    this.graphHeight = null;
    this.yAxisElement = null;
    this.yAxis = null;
  }

  componentDidMount() {
    const height = this.graphRef.current.getBoundingClientRect().height;
    const width = this.graphRef.current.getBoundingClientRect().width;
    this.setState({ height, width });
    this.svg = d3.select(this.graphRef.current);
  }

  componentDidUpdate(preProps, preState) {
    if (this.props.data && this.props.data != preProps.data) {
      console.log("data Updated");
      this.drawGraph(preState.scale);
    }
    console.log("componentDidUpdate - call");
  }

  drawGraph = (type) => {
    const { data } = this.props;
    const { height, width } = this.state;

    this.graphHeight = height - margins.top - margins.bottom;
    const graphWidth = width - margins.left - margins.right;

    const barWidth = (graphWidth - gap * data.length) / data.length;

    this.yScaleLog = d3
      .scaleLog()
      .domain([1, d3.max(data, (d) => d.TotalConfirmed)])
      .range([this.graphHeight, 0]);

    this.yScaleLiner = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.TotalConfirmed)])
      .range([this.graphHeight, 0]);

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.Country))
      .range([0, graphWidth - barWidth]);

    this.yAxis = d3
      .axisLeft()
      .scale(type === "log" ? this.yScaleLog : this.yScaleLiner)
      .ticks(5)
      .tickFormat((d) => d3.format(",.2r")(d));

    const xAxis = d3.axisBottom().scale(xScale);

    this.graph = this.svg
      .append("g")
      .attr("transform", `translate(${margins.left},${margins.top})`);

    this.graph
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => xScale(d.Country))
      .attr("y", (d) =>
        type === "log"
          ? this.yScaleLog(d.TotalConfirmed)
          : this.yScaleLiner(d.TotalConfirmed)
      )
      .attr("width", barWidth)
      .attr(
        "height",
        (d) =>
          this.graphHeight -
          (type === "log"
            ? this.yScaleLog(d.TotalConfirmed)
            : this.yScaleLiner(d.TotalConfirmed))
      )
      .attr("fill", "red");

    this.yAxisElement = this.svg
      .append("g")
      .attr("transform", `translate(${margins.left},${margins.top})`)
      .call(this.yAxis);

    const x = this.svg
      .append("g")
      .attr(
        "transform",
        `translate(${margins.left},${this.graphHeight + margins.top})`
      )
      .call(xAxis);

    const ticks = x
      .selectAll("text")
      .attr("x", -5)
      .attr("y", 5)
      .attr("font-size", "0.7em")
      .attr("transform", "rotate(-40)")
      .style("text-anchor", "end");
    console.log(ticks);
  };

  updateGraph = () => {
    this.graph
      .selectAll("rect")
      .attr("y", (d) => {
        return this.state.scale === "log"
          ? this.yScaleLog(d.TotalConfirmed)
          : this.yScaleLiner(d.TotalConfirmed);
      })
      .attr(
        "height",
        (d) =>
          this.graphHeight -
          (this.state.scale === "log"
            ? this.yScaleLog(d.TotalConfirmed)
            : this.yScaleLiner(d.TotalConfirmed))
      );

    this.yAxisElement = this.svg.call(this.yAxis);
  };

  toggleScale = () => {
    this.setState(
      (s) => ({
        ...s,
        scale: s.scale === "log" ? "liner" : "log",
      }),
      () => {
        this.updateGraph();
      }
    );
  };

  render() {
    return (
      <div>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.toggleScale}
          >
            Scale : {this.state.scale}
          </Button>
        </div>
        <div>
          <svg
            ref={this.graphRef}
            style={{
              width: "100%",
              height: 300,
              border: "solid 1px #cfcfcf",
            }}
          ></svg>
        </div>
      </div>
    );
  }
}

export default Summary;
