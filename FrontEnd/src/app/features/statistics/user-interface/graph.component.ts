import { Component, Input, ViewChild } from '@angular/core'
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexStroke, ApexXAxis, ChartComponent } from 'ng-apexcharts'
// Custom
import { StatisticsVM } from '../classes/view-models/statistics-vm'

export type chartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
    stroke: ApexStroke;
};

@Component({
    selector: 'graph',
    templateUrl: './graph.component.html',
    styleUrls: ['./graph.component.css']
})

export class GraphComponent {

    @ViewChild('chart') chart: ChartComponent

    public chartOptions: Partial<chartOptions>

    @Input() array: StatisticsVM[]

    public feature = 'statistics'
    public totals: StatisticsVM



    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: 'serie1',
                    data: [44, 55, 41, 64, 22, 43, 21]
                },
                {
                    name: 'serie2',

                    data: [53, 32, 33, 52, 13, 44, 32]
                }
            ],
            chart: {
                type: 'bar',
                height: 430
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: 'top'
                    }
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {
                    fontSize: '12px',
                    colors: ['#fff']
                }
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff']
            },
            xaxis: {
                categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007]
            }
        }
    }
}
