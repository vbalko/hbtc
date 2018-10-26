sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/ui/demo/basicTemplate/model/formatter'
], function (Controller, JSONModel, formatter) {
	'use strict';

	return Controller.extend('sap.ui.demo.basicTemplate.controller.App', {

		formatter: formatter,

		onInit: function () {
			this._load();
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
					console.log('result: ',results);
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
});