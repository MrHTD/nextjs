"use client";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Heading from "../Base/Heading";
import BaseImage from "../Base/BaseImage";

const data = [
  { name: "Jan", content1: 60, content2: 30, content3: -20 },
  { name: "Feb", content1: 20, content2: 40, content3: 10 },
  { name: "Mar", content1: -20, content2: 50, content3: 0 },
  { name: "Apr", content1: -60, content2: 45, content3: 20 },
  { name: "May", content1: 20, content2: 60, content3: 15 },
  { name: "Jun", content1: 40, content2: 35, content3: 20 },
];

class DashboardLeftChart extends PureComponent {
  render() {
    return (
      <div>
        <Heading level={4}>Commission by status</Heading>
        <ResponsiveContainer width="100%" height={210}>
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="0" stroke="#F1F1F1" />
            <XAxis dataKey="name" tick={{ fill: "#333", fontSize: 12 }} />
            <YAxis domain={[-60, 60]} tick={{ fill: "#333", fontSize: 12 }} />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="content1"
              stroke="#3FAC53"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3FAC53" }}
            />
            <Line
              type="monotone"
              dataKey="content2"
              stroke="#3FAC53"
              strokeWidth={2}
              dot={{ r: 3, fill: "#3FAC53" }}
            />
            <Line
              type="monotone"
              dataKey="content3"
              stroke="#2F5629"
              strokeWidth={2}
              dot={{ r: 3, fill: "#2F5629" }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex items-center mt-4 space-x-3">
          <div className="flex items-center gap-1">
            <BaseImage
              src="/assets/images/ellipse.png"
              alt="Ellipse"
              height={10}
              width={10}
            />
            <Heading level={6}>Content</Heading>
          </div>
          <div className="flex items-center gap-1">
            <BaseImage
              src="/assets/images/ellipse.png"
              alt="Ellipse"
              height={10}
              width={10}
            />
            <Heading level={6}>Content</Heading>
          </div>
          <div className="flex items-center gap-1">
            <BaseImage
              src="/assets/images/ellipse.png"
              alt="Ellipse"
              height={10}
              width={10}
            />
            <Heading level={6}>Content</Heading>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardLeftChart;
