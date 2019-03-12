import React from 'react'
import ReactDOM from 'react-dom'
import { Group } from '@vx/group'
import { Bar } from '@vx/shape'
import { AxisBottom, AxisRight } from '@vx/axis'
import { scaleLinear, scaleBand } from '@vx/scale'

class BarChart extends React.Component {
  count(key) {
    // this.setState({ ...this.state.locations })
    const locationData = this.props.locations

    // console.log(this.props)
    const counts = {}

    // let value

    for (let i = 0; i < locationData.length; i++) {
      const value = locationData[i][key]

      if (typeof counts[value] === 'undefined') {
        counts[value] = 1
      } else {
        counts[value]++
      }
    }

    return counts
  }

  render() {
    const featureCount = this.count(this.props.type)

    const data = Object.keys(featureCount).map(d => ({
      title: d,
      frequency: featureCount[d],
    }))

    // Define the graph dimensions and margins
    const width = 260
    const height = 200
    const margin = { top: 20, bottom: 20, left: 0, right: 0 }

    // Then we'll create some bounds
    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    // We'll make some helpers to get at the data we want
    const x = d => d.title
    const y = d => d.frequency

    // And then scale the graph by our data
    const xScale = scaleBand({
      rangeRound: [0, xMax],
      domain: data.map(x),
      padding: 0.1,
    })
    const yScale = scaleLinear({
      rangeRound: [yMax, 0],
      domain: [0, Math.max(...data.map(y))],
    })

    // Compose together the scale and accessor functions to get point functions
    const compose = (scale, accessor) => data => scale(accessor(data))
    const xPoint = compose(
      xScale,
      x,
    )
    const yPoint = compose(
      yScale,
      y,
    )

    return (
      <svg width={width} height={height}>
        {data.map((d, i) => {
          const barHeight = yMax - yPoint(d)

          return (
            <Group key={`bar-${i}`}>
              <Bar
                x={xPoint(d)}
                y={yMax - barHeight}
                height={barHeight}
                width={xScale.bandwidth() / 2}
                fill="#036635"
              />
              <AxisRight
                hideAxisLine
                hideTicks
                hideZero
                label=""
                left={235}
                top={10}
                scale={yScale}
                stroke="#1b1a1e"
                tickLength={3}
                tickTextFill="#1b1a1e"
              />
              <AxisBottom
                scale={xScale}
                stroke="#fc2e1c"
                tickStroke="#fc2e1c"
                tickLabelProps={(value, index) => ({
                  fontSize: 8,
                  textAnchor: 'middle',
                })}
                top={yMax}
              />
            </Group>
          )
        })}
      </svg>
    )
  }
}

export default BarChart
