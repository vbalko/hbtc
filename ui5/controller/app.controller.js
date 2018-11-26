sap.ui.define(
	[
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'space/balko/scalp/model/formatter'
	],
	function(Controller, JSONModel, formatter) {
		'use strict';

		return Controller.extend('space.balko.scalp.controller.App', {
			formatter: formatter,

			onInit: function() {
				const oUtilModel = new JSONModel({
					symbol: 'ETHBTC',
					period: 'M15'
				});
				this.getView().setModel(oUtilModel,'util');
				// this._load();
				this._loadSymbols();
				this._loadPeriods();
			},

			onAfterRendering: function() {
				//this._setChart();
				//this._setChartFC();
			},


			_loadSymbols: function() {
				const oModel = new JSONModel();
				d3.json('api/symbols').then( data => {
					oModel.setSizeLimit(data.length);
					oModel.setData(data);
					this.getView().setModel(oModel,'symbols');
				});

			},

			_loadPeriods: function() {
				const aPeriods = [
					{period:'M1',text:'1 Minuta'},
					{period:'M3',text:'3 Minuty'},
					{period:'M5',text:'5 Minut'},
					{ period: 'M15', text: '15 Minut' },
					{ period: 'M30', text: '30 Minut' },
					{ period: 'H1', text: '1 Hodina' },
					{ period: 'H4', text: '4 Hodiny' },
					{ period: 'D1', text: '1 Den' },
					{ period: 'D7', text: '7 Dní' },
					{ period: '1M', text: '1 Měsíc' }
				];
				const oModel = new JSONModel(aPeriods);
				this.getView().setModel(oModel,'periods');
			},

			_setChartFC: function(symbol, count) {
				//get id of chart container
				const contId = this.getView()
					.byId('cont')
					.getId();

				// a candlestick series, by default it expects the provided data to have open, low, high, close, date properties
				const candlestickSeries = fc.seriesSvgCandlestick().bandwidth(5);
				const gridlines = fc.annotationSvgGridline();
				const maSeries = fc
					.seriesSvgLine()
					.mainValue(d => d.ma)
					.crossValue(d => d.date);
				const multi = fc
					.seriesSvgMulti()
					.series([gridlines, candlestickSeries, maSeries]);

				// adapt the d3 time scale to add discontinuities, so that weekends are removed
				const xScale = fc
					.scaleDiscontinuous(d3.scaleTime())
					.discontinuityProvider(fc.discontinuitySkipWeekends());

				const chart = fc
					.chartSvgCartesian(d3.scaleTime(), d3.scaleLinear())
					.yOrient('left')
					.plotArea(multi);

				// use the extent component to determine the x and y domain
				const xExtent = fc.extentDate().accessors([d => d.date]);

				const yExtent = fc
					.extentLinear()
					.accessors([d => d.high * 1.01, d => d.low / 1.01]);

				const parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

				const ma = fc.indicatorMovingAverage().value(d => d.open);

				d3.json('api/ETHBTC')
					.then(a =>
						a
							.map(row => {
								const ret = {};
								ret.open = row.open;
								ret.close = row.close;
								ret.high = row.max;
								ret.low = row.min;
								ret.date = parseDate(row.timestamp);
								return ret;
							})
							.slice(0, 200)
					)
					.then(data => {
						const maData = ma(data);

						const mergedData = data.map((d, i) =>
							Object.assign({}, d, { ma: maData[i] })
						);

						// set the domain based on the data
						chart.xDomain(xExtent(mergedData)).yDomain(yExtent(mergedData));

						// select and render
						d3.select('#scalp---app--page-cont')
							.datum(mergedData)
							.call(chart);
					});

				// d3.json(
				// 	'api/ETHBTC',
				// 	// transform the data to use the default candlestick series properties
				// 	row => ({
				// 		open: row.open,
				// 		close: row.last,
				// 		high: row.high,
				// 		low: row.low,
				// 		date: parseDate(row.timestamp)
				// 	})
				// ).then(data => {
				// 	// set the domain based on the data
				// 	chart.xDomain(xExtent(data)).yDomain(yExtent(data));

				// 	// select and render
				// 	d3.select('#basicTemplate---app--page-cont')
				// 		.datum(data)
				// 		.call(chart);
				// });
			},

			_setChart: function() {
				var margin = { top: 20, right: 20, bottom: 30, left: 50 },
					width = 960 - margin.left - margin.right,
					height = 500 - margin.top - margin.bottom;

				// var parseDate = d3.timeParse('%d-%b-%y');
				var parseDate = d3.timeParse('%Y-%m-%dT%H:%M:%S.%LZ');

				var x = techan.scale.financetime().range([0, width]);
				//var x = d3.scaleTime().range([0, width]);

				var y = d3.scaleLinear().range([height, 0]);

				var candlestick = techan.plot
					.candlestick()
					.xScale(x)
					.yScale(y);

				var xAxis = d3.axisBottom().scale(x);

				var yAxis = d3.axisLeft().scale(y);

				var svg = d3
					.select('#basicTemplate---app--page-cont')
					.append('svg')
					.attr('width', width + margin.left + margin.right)
					.attr('height', height + margin.top + margin.bottom)
					.append('g')
					.attr(
						'transform',
						'translate(' + margin.left + ',' + margin.top + ')'
					);

				// d3.csv('ui5/data.csv', function(error, data) {
				d3.json('api/ETHBTC', function(error, data) {
					var accessor = candlestick.accessor();

					data = data
						.slice(0, 200)
						.map(function(d) {
							return {
								date: parseDate(d.timestamp),
								open: +d.open,
								high: +d.high,
								low: +d.low,
								close: +d.last,
								volume: +d.volume
							};
						})
						.sort(function(a, b) {
							return d3.ascending(accessor.d(a), accessor.d(b));
						});

					svg.append('g').attr('class', 'candlestick');

					svg
						.append('g')
						.attr('class', 'x axis')
						.attr('transform', 'translate(0,' + height + ')');

					svg
						.append('g')
						.attr('class', 'y axis')
						.append('text')
						.attr('transform', 'rotate(-90)')
						.attr('y', 6)
						.attr('dy', '.71em')
						.style('text-anchor', 'end')
						.text('Price ($)');

					// Data to display initially
					draw(data.slice(0, data.length - 20));
					// Only want this button to be active if the data has loaded
					d3.select('button')
						.on('click', function() {
							draw(data);
						})
						.style('display', 'inline');
				});

				function draw(data) {
					x.domain(data.map(candlestick.accessor().d));
					y.domain(
						techan.scale.plot.ohlc(data, candlestick.accessor()).domain()
					);

					svg
						.selectAll('g.candlestick')
						.datum(data)
						.call(candlestick);
					svg.selectAll('g.x.axis').call(xAxis);
					svg.selectAll('g.y.axis').call(yAxis);
				}
			},

			_mapResults(results) {
				const oModel = new JSONModel();
				oModel.setSizeLimit(results.length);
				oModel.setData(results);
				this.getView().setModel(oModel);
			},

			_load() {
				const oView = this.getView();
				const sUrl = './api';

				const self = this;

				$.get(sUrl, {})
					.done(function(results) {
						console.log('result: ', results);
						self._mapResults(results);
					})
					.fail(function(err) {
						if (err !== undefined) {
							var oErrorResponse = $.parseJSON(err.responseText);

							sap.m.MessageToast.show(oErrorResponse.message, {
								duration: 6000
							});
						} else {
							sap.m.MessageToast.show('Unknown error!');
						}

						//}
					});
			}
		});
	}
);
