// STEP 1 - Include Dependencies
// Include react
import React from "react";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart,FusionTheme);

// STEP 2 - Chart Data


// STEP 3 - Creating the JSON object to store the // ! chart configurations


const ChartComponent = ({data}) => {
  const chartConfigs = {
    type: "bar2d", // * The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Most Forked Repos",
        YAxisName: 'Stars',
        XAxisName: 'Repos',
        xAxisNameFontSize: "16",
        yAxisNameFontSize: "16",
        palleteColors: "#2caeba, #5D62B5, #FFC533, #F2726F, #8d6e63, #1de9b6, #6E80CA",
      theme: "candy"



      },
      // Chart Data
      data  //! this is the prop in the object
    }
  };

  return (<ReactFC {...chartConfigs} />);
}




export default ChartComponent;