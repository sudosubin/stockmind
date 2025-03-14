import { AxisBottom, AxisLeft } from "@visx/axis";
import { curveMonotoneX } from "@visx/curve";
import { LinearGradient } from "@visx/gradient";
import { GridRows } from "@visx/grid";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { scaleLinear, scaleTime } from "@visx/scale";
import { AreaClosed, LinePath } from "@visx/shape";
import { type ComponentProps, useMemo } from "react";

interface Props {
  id: string;
  color: string;
  data: DataPoint[];
}

type DataPoint = { date: Date; price: number };

type ParentSizeProvidedProps = Parameters<
  ComponentProps<typeof ParentSize>["children"]
>[0];

const getDate = ({ date }: DataPoint) => date;
const getValue = ({ price }: DataPoint) => price;

export const StockGraph = (props: Props) => {
  return (
    <ParentSize>
      {(args) => <StockGraphChart {...props} {...args} />}
    </ParentSize>
  );
};

const StockGraphChart = ({
  id,
  color,
  data,
  width,
  height,
}: Props & Partial<ParentSizeProvidedProps>) => {
  const margin = { top: 10, right: 20, bottom: 40, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = useMemo(
    () =>
      scaleTime<number>({
        domain: [
          Math.min(...data.map((d) => getDate(d).getTime())),
          Math.max(...data.map((d) => getDate(d).getTime())),
        ],
        range: [0, innerWidth],
      }),
    [data, innerWidth],
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        domain: [
          Math.min(...data.map((d) => getValue(d))) * 0.95,
          Math.max(...data.map((d) => getValue(d))) * 1.05,
        ], // Match the y-axis range in the image
        range: [innerHeight, 0],
        nice: true,
      }),
    [data, innerHeight],
  );

  return (
    <svg width={width} height={height}>
      <title>Stock Graph Chart</title>
      <LinearGradient
        id={id}
        from={color}
        to="#fff"
        fromOpacity={0.4}
        toOpacity={0.1}
      />

      <Group left={margin.left} top={margin.top}>
        {/* Grid */}
        <GridRows
          scale={yScale}
          width={innerWidth}
          stroke="var(--rs-color-foreground-disabled)"
          strokeDasharray="3,3"
          numTicks={5}
        />

        {/* Area */}
        <AreaClosed<DataPoint>
          data={data}
          x={(d) => xScale(getDate(d).getTime())}
          y={(d) => yScale(getValue(d))}
          yScale={yScale}
          curve={curveMonotoneX}
          fill={`url(#${id})`}
        />

        {/* Line */}
        <LinePath<DataPoint>
          data={data}
          x={(d) => xScale(getDate(d).getTime())}
          y={(d) => yScale(getValue(d))}
          stroke={color}
          strokeWidth={2}
          curve={curveMonotoneX}
        />

        {/* Axis */}
        <AxisLeft
          scale={yScale}
          numTicks={5}
          tickStroke="var(--rs-color-foreground-disabled)"
          stroke="var(--rs-color-foreground-disabled)"
          tickFormat={(value: number) => `${Math.floor(value / 1_000)}k`}
          tickLabelProps={{
            fill: "var(--rs-color-foreground-neutral-faded)",
            fontSize: 12,
            textAnchor: "end",
            dx: -4,
          }}
        />

        <AxisBottom
          top={innerHeight}
          scale={xScale}
          numTicks={6}
          tickStroke="var(--rs-color-foreground-disabled)"
          stroke="var(--rs-color-foreground-disabled)"
          tickFormat={(value) => {
            const date = new Date(value as number);
            return `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;
          }}
          tickLabelProps={{
            fill: "var(--rs-color-foreground-neutral-faded)",
            fontSize: 12,
            textAnchor: "middle",
            dy: 10,
          }}
        />
      </Group>
    </svg>
  );
};
