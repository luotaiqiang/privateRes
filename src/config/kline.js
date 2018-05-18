/*
 * @Author: duyun
 * @Date: 2018-01-06
 * @Description: k线公共js
*/
import Vue from 'vue'
import G2 from '@antv/g2'
import Slider from '@antv/g2-plugin-slider'
import DataSet from '@antv/data-set'

export default{
  install () {
    Vue.prototype.drawKline = function (data, start, end, chartID, sliderId) {
      const ds = new DataSet({
        state: {
          start: start,
          end: end
        }
      })
      const dv = ds.createView()
      dv.source(data)
        .transform({
          type: 'filter',
          callback: obj => {
            const dateArr = obj.data
            return dateArr <= ds.state.end && dateArr >= ds.state.start
          }
        })
        .transform({
          type: 'map',
          callback: obj => {
            obj.trend = (obj.open <= obj.close) ? '上涨' : '下跌'
            obj.range = [ obj.open, obj.close, obj.high, obj.low ]
            return obj
          }
        })
      const chart = new G2.Chart({
        container: chartID,
        forceFit: true,
        height: '400',
        animate: false,
        padding: [ 10, 50, 40, 50 ]
      })
      chart.source(dv, {
        'data': {
          type: 'timeCat',
          nice: false,
          range: [ 0, 1 ]
        },
        trend: {
          values: [ '上涨', '下跌' ]
        },
        'vol': {alias: '成交量'},
        'open': {alias: '开盘价'},
        'close': {alias: '收盘价'},
        'high': {alias: '最高价'},
        'low': {alias: '最低价'},
        'avg5': {alias: 'MA5'},
        'avg10': {alias: 'MA10'},
        'avg20': {alias: 'MA20'},
        'avg60': {alias: 'MA60'}
      })
      chart.legend({
        offset: 20
      })
      chart.tooltip({
        showTitle: false,
        itemTpl: '<li data-index={index}>' + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' + '{name}{value}</li>'
      })
      const kView = chart.view({
        end: {
          x: 1,
          y: 0.6
        }
      })
      kView.source(dv, {
        range: {
          tickCount: 5
        },
        avg5: {
          tickCount: 5
        },
        avg10: {
          tickCount: 5
        },
        avg20: {
          tickCount: 5
        },
        avg60: {
          tickCount: 5
        }
      })
      kView.axis('avg5', false)
      kView.axis('avg10', false)
      kView.axis('avg20', false)
      kView.axis('avg60', false)
      kView.schema()
        .position('data*range')
        .color('trend', val => {
          if (val === '上涨') {
            return '#f04864'
          }
          if (val === '下跌') {
            return '#2fc25b'
          }
        })
        .shape('candle')
        .tooltip('data*open*close*high*low*avg5*avg10*avg20*avg60', (data, open, close, high, low, avg5, avg10, avg20, avg60) => {
          return {
            name: data,
            value: '<br><span style="padding-left: 16px">开盘价：' + open + '</span><br/>' + '<span style="padding-left: 16px">收盘价：' + close + '</span><br/>' + '<span style="padding-left: 16px">最高价：' + high + '</span><br/>' + '<span style="padding-left: 16px">最低价：' + low + '</span><br/>' + '<span style="padding-left: 16px">MA5：' + avg5 + '</span><br/>' + '<span style="padding-left: 16px">MA10：' + avg10 + '</span><br/>' + '<span style="padding-left: 16px">MA20：' + avg20 + '</span><br/>' + '<span style="padding-left: 16px">MA60：' + avg60 + '</span>'
          }
        })
      kView.line().position('data*avg5').size(1).tooltip(false).color('#CD4343')
      kView.line().position('data*avg10').size(1).tooltip(false).color('#8C3037')
      kView.line().position('data*avg20').size(1).tooltip(false).color('#FFCF65')
      kView.line().position('data*avg60').size(1).tooltip(false).color('#0055A2')
      const barView = chart.view({
        start: {
          x: 0,
          y: 0.75
        }
      })
      barView.source(dv, {
        vol: {
          tickCount: 3
        }
      })
      barView.axis('data', {
        tickLine: null,
        label: null
      })
      barView.axis('vol', {
        label: {
          formatter: function (val) {
            return parseInt(val / 1000, 10) + 'k'
          }
        }
      })
      barView.interval()
        .position('data*vol')
        .color('trend', val => {
          if (val === '上涨') {
            return '#f04864'
          }
          if (val === '下跌') {
            return '#2fc25b'
          }
        })
        .tooltip('data*vol*vol5*vol10', (data, vol, vol5, vol10) => {
          return {
            name: data,
            value: '<br/><span style="padding-left: 16px">成交量：' + vol + '</span><br/>' + '<span style="padding-left: 16px">5日成交量均线：' + vol5 + '</span><br/>' + '<span style="padding-left: 16px">10日成交量均线：' + vol10 + '</span><br/>'
          }
        })
      chart.render()
      const slider = new Slider({
        container: sliderId,
        width: 'auto',
        height: 26,
        padding: [ 0, 80, 20, 80 ],
        start: ds.state.start,
        end: ds.state.end,
        data,
        xAxis: 'data',
        yAxis: 'vol',
        scales: {
          data: {
            type: 'timeCat',
            nice: false
          }
        },
        onChange: ({startText, endText}) => {
          ds.setState('start', startText)
          ds.setState('end', endText)
        }
      })
      slider.render()
    }
  }
}
