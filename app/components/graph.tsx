"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const GroupedStackedChart = ({ data }) => {
  const ref = useRef();
  const [layout, setLayout] = useState("grouped"); // 'grouped' or 'stacked'
  const [groupings, setGroupings] = useState("type"); // 'product' or 'type'

  useEffect(() => {
    if (!data) return;

    // Determine groupings keys
    const keys = Array.from(new Set(data.map((d) => d[groupings])));

    // Create a mapping of sizes to ensure each is uniquely represented
    const xz = Array.from(new Set(data.map((d) => d[groupings])));

    // Prepare structured data for stacking or groupings
    const groupedData = xz.map((size) => {
      console.log({ size, data, groupings });
      const entries = data.filter((d) => d[groupings] === size);
      const reduced = keys.reduce((acc, key) => {
        const entry = entries.find((e) => e[groupings] === key);
        acc[key] = entry ? entry.price : 0; // Use 0 if no entry is found for a key
        return acc;
      }, {});
      return { size, ...reduced };
    });

    const n = keys.length;
    const yz = groupedData.map((d) => keys.map((key) => d[key]));
    const y01z = d3
      .stack()
      .keys(d3.range(n))(yz)
      .map((layer, i) =>
        layer.map(([y0, y1]) => ({
          y0,
          y1,
          index: i,
          size: groupedData[layer.index].size,
        }))
      );

    const yMax = d3.max(yz.flat());
    const y1Max = d3.max(y01z.flat(), (d) => d.y1);

    const width = 928;
    const height = 500;
    const margin = { top: 0, right: 0, bottom: 30, left: 0 };

    // Clear SVG content
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    // X-axis and Y-axis scales
    const x = d3
      .scaleBand()
      .domain(xz) // Use all unique sizes
      .rangeRound([margin.left, width - margin.right])
      .padding(0.08);

    const y = d3
      .scaleLinear()
      .domain([0, layout === "stacked" ? y1Max : yMax])
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal(d3.schemeCategory10).domain(keys);

    svg
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto;");

    // Draw layers
    const layer = svg
      .selectAll("g")
      .data(y01z)
      .join("g")
      .attr("fill", (d, i) => color(i));

    // Draw rectangles
    layer
      .selectAll("rect")
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => x(d.size))
      .attr("y", (d) => y(d.y1))
      .attr("width", x.bandwidth())
      .attr("height", (d) => y(d.y0) - y(d.y1))
      .attr("fill", (d) => color(d.index));

    // X-axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));
  }, [data, layout, groupings]); // Dependencies include groupings to redraw on toggle

  return (
    <div>
      <svg ref={ref}></svg>
      <div>
        {/* <button
          onClick={() =>
            setLayout(layout === "stacked" ? "grouped" : "stacked")
          }
        >
          Toggle Layout
        </button> */}
        <button
          onClick={() => setGroupings(groupings === "type" ? "size" : "type")}
        >
          Toggle Groupings
        </button>
      </div>
    </div>
  );
};

export default GroupedStackedChart;
