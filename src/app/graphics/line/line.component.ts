import { Component, OnInit, Input } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from '@amcharts/amcharts5/xy'

@Component({
  selector: 'line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {

  // ***********************
  // variables
  // **********************
  @Input() category = ''
  // 
  @Input() value = ''
  // 
  @Input() data = []
  // 
  @Input() id = null
  // ***********************
  // functions
  // **********************
  public generate = () => {
    let root = am5.Root.new(this.id);
    

    root.dateFormatter.setAll({
      dateFormat: "yyyy",
      dateFields: ["valueX"]
    });
    
    
    
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX"
    }));
    
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      behavior: "none"
    }));
    cursor.lineY.set("visible", false);
    
    
    // Data
    let data = this.data;
    
    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      maxDeviation:0.5,
      baseInterval: { timeUnit: "day", count: 1 },
      renderer: am5xy.AxisRendererX.new(root, {pan:"zoom"}),
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation:1,
      renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"})
    }));
    
    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.StepLineSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "value",
      valueXField: this.category,
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueX}: {valueY}"
      })
    }));
    
    series.strokes.template.setAll({
      strokeWidth: 3
    });
    
    
    // Set up data processor to parse string dates
    // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy",
      dateFields: [this.category]
    });
    
    series.data.setAll(data);
    
    
    // Add scrollbar
    // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
    chart.set("scrollbarX", am5.Scrollbar.new(root, {
      orientation: "horizontal"
    }));
    
    
    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(1000);

  }
  // ***********************
  // life cycles
  // **********************
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.generate()
  }
}
