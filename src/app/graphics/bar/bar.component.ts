import { Component, Input, OnInit,SimpleChanges } from '@angular/core';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from '@amcharts/amcharts5/xy'


@Component({
  selector: 'bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
   // ***********************
  // variables
  // **********************
  @Input() category = ''
  // 
  @Input() value = ''
  // 
  @Input() data = []
  // 
  @Input() id=null
   // ***********************
  // functions
  // **********************
  public generate = () => {
    const root = am5.Root.new(this.id);

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
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);


    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15
    });

    let xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
      maxDeviation: 0.3,
      categoryField: this.category,
      renderer: xRenderer,
      tooltip: am5.Tooltip.new(root, {})
    }));

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxDeviation: 0.3,
      renderer: am5xy.AxisRendererY.new(root, {})
    }));


    // Create series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
    let series = chart.series.push(am5xy.ColumnSeries.new(root, {
      name: "Series 1",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: this.value,
      sequencedInterpolation: true,
      categoryXField: this.category,
      tooltip: am5.Tooltip.new(root, {
        labelText: "{valueY}"
      })
    }));

    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5 });
    // series.columns.template.adapters.add("fill", (fill, target) => {
    //   return chart.get("colors").getIndex(series.columns.indexOf(target));
    // });

    // series.columns.template.adapters.add("stroke", (stroke, target) => {
    //   return chart.get("colors").getIndex(series.columns.indexOf(target));
    // });


    // Set data
    let data = this.data;

    xAxis.data.setAll(data);
    series.data.setAll(data);


    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    series.appear(100);
    chart.appear(10);
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
