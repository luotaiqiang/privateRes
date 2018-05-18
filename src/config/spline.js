/*
 * @Author: duyun
 * @Date: 2018-01-06
 * @Description: k线公共js
*/
import Vue from 'vue'
import G2 from '@antv/g2'

export default{
  install () {
    Vue.prototype.drawSpline1 = function (data) {
      const chart = new G2.Chart({
        container: 'sklineId1',
        forceFit: true,
        height: 200,
        padding: [20, 70, 10, 0]
      })
      /* K线 */
      const kView = chart.view({
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.5 }
      })
      kView.source(data, {
        price: {
          tickCount: 5
        }
      }).axis('price', {
        position: 'right',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return text
          }
        }
      }).axis('time', {
        line: {
          stroke: '#d0d0d0',
          lineWidth: 1
        },
        tickLine: null,
        label: null
      }).line().size(1).position('time*price').tooltip(false).color('#0055a2')

      /* 柱形图 */
      const barView = chart.view({
        start: { x: 0, y: 0.6 },
        end: { x: 1, y: 1 }
      })
      barView.source(data, {
        volume: {
          tickCount: 3
        }
      }).axis('volume', {
        position: 'right',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return (parseFloat(text) / 1000000).toFixed(0) + 'M'
          }
        }
      }).axis('time', {
        label: null,
        tickLine: null
      }).interval()
      .position('time*volume').tooltip(false).color('#999')
      chart.render()
    }
    Vue.prototype.drawSpline2 = function (data) {
      const chart = new G2.Chart({
        container: 'sklineId2',
        forceFit: true,
        height: 200,
        padding: [20, 70, 10, 0]
      })
      /* K线 */
      const kView = chart.view({
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.5 }
      })
      kView.source(data, {
        price: {
          tickCount: 5
        }
      }).axis('price', {
        position: 'right',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return text
          }
        }
      }).axis('time', {
        line: {
          stroke: '#d0d0d0',
          lineWidth: 1
        },
        tickLine: null,
        label: null
      }).line().size(1).position('time*price').tooltip(false).color('#0055a2')

      /* 柱形图 */
      const barView = chart.view({
        start: { x: 0, y: 0.6 },
        end: { x: 1, y: 1 }
      })
      barView.source(data, {
        volume: {
          tickCount: 3
        }
      }).axis('volume', {
        position: 'right',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return (parseFloat(text) / 1000000).toFixed(0) + 'M'
          }
        }
      }).axis('time', {
        label: null,
        tickLine: null
      }).interval()
      .position('time*volume').tooltip(false).color('#999')
      chart.render()
    }
    Vue.prototype.drawSpline3 = function (data) {
      const chart = new G2.Chart({
        container: 'sklineId3',
        forceFit: true,
        height: 200,
        padding: [20, 70, 10, 0]
      })
      /* K线 */
      const kView = chart.view({
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.5 }
      })
      kView.source(data, {
        price: {
          tickCount: 5
        }
      }).axis('price', {
        position: 'right',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return text
          }
        }
      }).axis('time', {
        line: {
          stroke: '#d0d0d0',
          lineWidth: 1
        },
        tickLine: null,
        label: null
      }).line().size(1).position('time*price').tooltip(false).color('#0055a2')

      /* 柱形图 */
      const barView = chart.view({
        start: { x: 0, y: 0.6 },
        end: { x: 1, y: 1 }
      })
      barView.source(data, {
        volume: {
          tickCount: 3
        }
      }).axis('volume', {
        position: 'right',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return (parseFloat(text) / 1000000).toFixed(0) + 'M'
          }
        }
      }).axis('time', {
        label: null,
        tickLine: null
      }).interval()
      .position('time*volume').tooltip(false).color('#999')
      chart.render()
    }
    Vue.prototype.drawSpline4 = function (data) {
      const chart = new G2.Chart({
        container: 'sklineId4',
        forceFit: true,
        height: 200,
        padding: [20, 70, 10, 0]
      })
      /* K线 */
      const kView = chart.view({
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0.5 }
      })
      kView.source(data, {
        price: {
          tickCount: 5
        }
      }).axis('price', {
        position: 'right',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return text
          }
        }
      }).axis('time', {
        line: {
          stroke: '#d0d0d0',
          lineWidth: 1
        },
        tickLine: null,
        label: null
      }).line().size(1).position('time*price').tooltip(false).color('#0055a2')

      /* 柱形图 */
      const barView = chart.view({
        start: { x: 0, y: 0.6 },
        end: { x: 1, y: 1 }
      })
      barView.source(data, {
        volume: {
          tickCount: 3
        }
      }).axis('volume', {
        position: 'right',
        line: {
          stroke: '#d0d0d0'
        },
        tickLine: null,
        label: {
          offset: 8,
          fill: '#eee',
          formatter (text, item, index) {
            return (parseFloat(text) / 1000000).toFixed(0) + 'M'
          }
        }
      }).axis('time', {
        label: null,
        tickLine: null
      }).interval()
      .position('time*volume').tooltip(false).color('#999')
      chart.render()
    }
  }
}
