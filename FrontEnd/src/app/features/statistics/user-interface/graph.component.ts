import { Component, Inject, Input, ViewChild } from '@angular/core'
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexStroke, ApexXAxis, ChartComponent } from 'ng-apexcharts'
// Custom
import { StatisticsVM } from '../classes/view-models/statistics-vm'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'

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

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<GraphComponent>) { }

    ngOnInit(): void {
        this.buildGraph()
    }

    private getTotals(): void {
        this.totals = this.array[this.array.length - 1]
    }

    private removeTotalsFromArray(): void {
        this.array.pop()
    }

    public calculateNoShowPerRow(): void {
        this.array.forEach(element => {
            element.noShow = element.pax - element.actualPax
        })
    }

    private buildMe(property: any): number[] {
        const x = []
        this.data.forEach(element => {
            x.push(element[property])
        })
        return x
    }

    private buildGraph(): void {
        console.log(this.data)
        this.chartOptions = {
            series: [
                {
                    name: 'actualPax',
                    data: this.buildMe('actualPax')
                },
                {
                    name: 'noShow',
                    data: this.buildMe('noShow')
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
                categories: this.buildMe('description')
            }
        }
    }

}
