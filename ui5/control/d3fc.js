sap.ui.define(['sap/ui/core/Control'], function(Control) {
	'use strict';
	return Control.extend('space.balko.scalp.d3fc', {
		metadata: {
			properties: {
				title: { type: 'string', defaultValue: 'title' },
				chartDataUrl: {type: 'string' }
			},
			aggregations: {
				header: { type: 'sap.ui.core.Control', multiple: false }
			},
			events: {
				rendered: {}
			}
		},
		/* Control Hooks */
		init: function() {
			console.log('Getting ready to weave a web..');
			this.sParentId = '';

			this._sContainerId = this.getId() + '--container';
		},

		renderer: function(oRM, oControl) {
			const aParts = oControl.getChartDataUrl().split('/');
			oRM.write('<div class=d3fc');
			oRM.writeControlData(oControl);
			oRM.write('>');
			oRM.renderControl(oControl.getAggregation('header'));
			oRM.write(`<div>Token: ${aParts[1]} Period: ${aParts[2]} ${oControl.getTitle()} </div>`);
			oRM.write('</div>');

			oControl.fireEvent('rendered', {});
		},

		onAfterRendering: function() {
			//const vis = d3.select(`#${this.sParentId}`);
			const vis = d3.select(`#${this.getId()}`);

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
			
			d3.json(this.getChartDataUrl())//'api/ETHBTC/M1')
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
					// vis
					.datum(mergedData)
					   .call(chart);
				});			

		},

		onBeforeRendering: function() {},

		exit: function() {}
	});
});
