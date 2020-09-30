import React from 'react'
import { Table, Tooltip } from 'antd'
import { useDispatch, useMemo, useCallback } from 'common/hooks'
import { toLocaleString } from 'common/utils'
import { useWindowSize } from 'react-use'
import styles from './index.css'

function MarkerTable({ locations, isPolygon }) {
  const dispatch = useDispatch()
  const { width, height } = useWindowSize()
  const data = useMemo(() => {
    if (isPolygon) {
      return []
    }

    return locations
  }, [isPolygon, locations])

  const setCenterMarker = useCallback(
    item => {
      dispatch({
        type: 'gmap/setCenterLocation',
        payload: {
          location: item,
        },
      })
    },
    [dispatch]
  )
  const columns = useMemo(() => {
    return [
      {
        title: 'Map Markers',
        dataIndex: 'index',
        render: (text, record) => (
          <Tooltip title="Click to center the map using this point">
            <div>
              {toLocaleString(record[0], 4)}, {toLocaleString(record[1], 4)}
            </div>
          </Tooltip>
        ),
      },
    ]
  }, [])
  return (
    <Table
      className={styles.table}
      size="small"
      onRow={record => {
        return {
          onClick: () => {
            setCenterMarker(record)
          },
        }
      }}
      dataSource={data}
      columns={columns}
      scroll={{ y: height - 350 }}
      pagination={{ pageSize: 25, hideOnSinglePage: true, showLessItems: true, showSizeChanger: false }}
    />
  )
}

export default MarkerTable
