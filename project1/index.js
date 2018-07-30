showRepayment = true;
showSectors = true;
showActivites = false;

(function() {
  "use strict";


  nv.addGraph(function() {
    // Initialize Chart
    var chart = nv.models.lineChart()
                  .margin({left:100})
                  .useInteractiveGuideline(true)
                  .duration(350)
                  .showLegend(true)
                  .showYAxis(true)
                  .showXAxis(true);

    // Set Axes
    chart.xAxis.axisLabel('Year');
    chart.yAxis.axisLabel('Loan Count');

    // Render Chart
    render(chart);

    // Set Event Handlers
    nv.utils.windowResize(function() { chart.update(); });
    setButtonHandler('toggleRepayment', 'showRepayment', chart);
    setButtonHandler('toggleSectors', 'showSectors', chart);
    setButtonHandler('toggleActivites', 'showActivites', chart);

    return chart;
  });

  function render(chart) {
    var processedData = [];
    addData(showRepayment, 'weekly','weekly', processedData);
    addData(showRepayment, 'irregular','irregular', processedData);
    addData(showRepayment, 'monthly','monthly', processedData);
    addData(showRepayment, 'bullet','bullet', processedData);
    addData(showSectors, 'Agriculture', 'Agriculture', processedData);
    addData(showSectors, 'Food', 'Food', processedData);
    addData(showSectors, 'Food', 'Food', processedData);
    addData(showSectors, 'Retail', 'Retail', processedData);
    addData(showSectors, 'Services', 'Services', processedData);
    addData(showActivites, "Cosmetics Sales", "Cosmetics Sales", processedData);
    addData(showActivites, "General Store", "General Store", processedData);
    addData(showActivites, "Transportation", "Transportation", processedData);
    d3.select('#graph').datum(processedData).call(chart);
  }

  function addData(variable, attribute, label, dataArray) {
    if (variable) {
      var extractedData = data.map(function(item) {
        return {x: item.Month, y: item[attribute]};
      });
      dataArray.push({
        key: label,
        values: extractedData
      });
    }
  }

  function setButtonHandler(elementId, variable, chart) {
    document.getElementById(elementId).onclick = function() {
      window[variable] = !window[variable];
      render(chart);
    };
  }

})();
