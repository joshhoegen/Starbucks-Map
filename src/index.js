import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'react-bootstrap'
import Theme from 'components/Theme'
import Chart from 'components/chart/Chart'
import Starbucks from 'components/map/Map'
import Table from 'components/table/Table'
import makeTitle from './utils/make-title'

// Straight away require/import scss/css just like in react.
import indexStyle from './assets/styles/index.scss'

// import Aggr from './feeds/_all'
import starbucks from './feeds/starbucks'

class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      locations: [],
      locationsActive: [],
      showCharts: false,
    }

    this.locationsDefault = []
    this.pageSize = 10

    this.locationsActive = this.locationsActive.bind(this)
  }

  componentDidMount() {
    starbucks.then(data => {
      this.setState({
        locations: data,
        locationsDefault: data.slice(0, this.pageSize),
      })
    })
  }

  locationsActive(data) {
    if (this.state.locationsActive !== data) {
      this.setState({
        locationsActive: data,
      })
    }
  }

  resetData() {
    this.setState({
      locationsActive: this.state.locationsDefault,
    })
  }

  toggle() {
    this.setState({
      showCharts: !this.state.showCharts,
    })
  }

  render() {
    const show = {
      display: this.state.showCharts ? 'block' : 'none',
    }

    return (
      <Theme>
        <style dangerouslySetInnerHTML={{ __html: indexStyle }} />
        <div className="left-sidebar">
          <Table
            className="data-table"
            locations={this.state.locations}
            locationsActive={this.locationsActive}
            pageSize={this.pageSize}
          />
          <Button onClick={this.resetData.bind(this)}>Reset</Button>
        </div>
        <Starbucks className="data-map" locations={this.state.locationsActive} />

        <div className="charts">
          <Button onClick={this.toggle.bind(this)}>Charts</Button>
          <div style={show} className="chartsContainer">
            {makeTitle('ownership_type')}
            <svg width="100%" height="200">
              <Chart
                type="ownership_type"
                locations={this.state.locationsActive}
                width={260}
                height={200}
                x={0}
                y={0}
              />
            </svg>
            {makeTitle('features_products')}
            <svg width="100%" height="200">
              <Chart
                type="features_products"
                locations={this.state.locationsActive}
                width={260}
                height={200}
                x={0}
                y={0}
              />
            </svg>
          </div>
        </div>
      </Theme>
    )
  }
}

ReactDOM.render(<Index />, document.getElementById('app-container'))
