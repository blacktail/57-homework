import React from 'react'
import { useModel, useDispatch, useCallback, useSelector, useState } from 'common/hooks'
import { PageHeader, Layout, Row, Col, Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { open as openShapeFile } from 'shapefile'
import debounce from 'lodash.debounce'
import model from './model'
import Map from './Map'
import MarkerTable from './MakerTable'

const { Content } = Layout

function GMap() {
  useModel(model)

  const dispatch = useDispatch()
  const locations = useSelector(state => state.gmap.locations)
  const isPolygon = useSelector(state => state.gmap.isPolygon)
  const centerLocation = useSelector(state => state.gmap.center)
  const isMapBusy = useSelector(state => state.gmap.mapBusy)
  const shapes = useSelector(state => state.gmap.shapes)

  const generateMarkers = useCallback(() => {
    dispatch({
      type: 'gmap/generateLocations',
    })
  }, [dispatch])

  const finishReadShapes = useCallback(
    debounce(shapes => {
      dispatch({
        type: 'gmap/setShapes',
        payload: {
          shapes,
        },
      })
    }, 1000),
    []
  )

  return (
    <>
      <PageHeader
        style={{ padding: 0, marginBottom: '10px' }}
        title="Google Map Demo"
        extra={
          <Upload
            beforeUpload={file => {
              const shapes = []
              openShapeFile(file.stream())
                .then(source =>
                  source.read().then(function log(result) {
                    if (result.done) {
                      message.success('Read File Success')
                      finishReadShapes(shapes)
                      return
                    }
                    shapes.push(result.value)
                    // eslint-disable-next-line consistent-return
                    return source.read().then(log)
                  })
                )
                .catch(error => {
                  console.error(error.stack)
                  message.error('Error occurs when read the shape file, please retry.')
                })
              return false
            }}
            showUploadList={false}
          >
            <Button disabled={isMapBusy} icon={<UploadOutlined />}>
              Click to Upload Shapes
            </Button>
          </Upload>
        }
      />
      <Content style={{ overflow: 'auto', height: 'calc(100% - 42px)' }}>
        <Row type="flex" style={{ height: '100%' }}>
          <Col span={16} style={{ height: '100%' }}>
            <Map locations={locations} isPolygon={isPolygon} center={centerLocation} shapes={shapes} />
          </Col>
          <Col span={8} style={{ height: '100%' }}>
            <Layout style={{ height: '100%', background: 'white' }}>
              <Content style={{ overflow: 'auto' }}>
                <MarkerTable locations={locations} isPolygon={isPolygon} />
              </Content>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="primary" onClick={generateMarkers} disabled={isMapBusy}>
                  Generate Markers
                </Button>
              </div>
            </Layout>
          </Col>
        </Row>
      </Content>
    </>
  )
}

export default GMap
