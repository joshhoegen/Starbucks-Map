import React from 'react'
import { render } from 'react-dom'
import ReactTable from 'react-table'
import makeTitle from '../../utils/make-title'

import 'react-table/react-table.css'
import './table.css'

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: this.props.locations,
    }
    // this.defaultLocations = []
  }

  render() {
    const data = this.props.locations

    if (!data[0]) {
      return false
    }

    const columnKeys = ['name', 'ownership_type', 'features_products']
    const columns = Object.keys(data[0])
      .filter(key => typeof data[0][key] === 'string')
      .map(key => ({
        Header: makeTitle(key),
        accessor: key,
        show: columnKeys.includes(key),
        filterable: key === 'name',
        filterMethod: (filter, row) => row[filter.id].toLowerCase().startsWith(filter.value),
      }))
      // Sort by columnKeys above
      .sort((a, b) => columnKeys.indexOf(a.accessor) - columnKeys.indexOf(b.accessor))

    return (
      <ReactTable
        data={data}
        columns={columns}
        defaultPageSize={this.props.pageSize}
        className="-striped -highlight"
        filterable
        // TODO: Find how to set for all events.
        // I tried using functional render but got caught in a state update loop
        onFetchData={() => {
          // this.defaultLocations = this.state.active
          this.props.locationsActive(this.state.active)
        }}
        onPageChange={() => {
          this.props.locationsActive(this.state.active)
        }}
        onFilteredChange={() => {
          this.props.locationsActive(this.state.active)
        }}
        onPageSizeChange={() => {
          this.props.locationsActive(this.state.active)
        }}
        onSortedChange={() => {
          this.props.locationsActive(this.state.active)
        }}
        onResizedChange={() => {
          this.props.locationsActive(this.state.active)
        }}
        onExpandedChange={() => {
          this.props.locationsActive(this.state.active)
        }}
      >
        {(state, makeTable, instance) => {
          this.state.active = state.pageRows
          // this.state.activeFilter =
          return makeTable()
        }}
      </ReactTable>
    )
  }
}

export default Table
