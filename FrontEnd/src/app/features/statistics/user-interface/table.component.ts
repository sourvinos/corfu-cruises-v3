import { Component, Input, ViewChild } from '@angular/core'
// Custom
import { HelperService } from 'src/app/shared/services/helper.service'
import { MessageLabelService } from 'src/app/shared/services/message-label.service'
import { StatisticsVM } from '../classes/view-models/statistics-vm'
import { GraphComponent, chartOptions } from './graph.component'
import { ChartComponent } from 'ng-apexcharts'
import { MatDialog } from '@angular/material/dialog'

@Component({
    selector: 'table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent {

    //#region variables

    @Input() array: StatisticsVM[]
    @ViewChild('chart') chart: ChartComponent

    public chartOptions: Partial<chartOptions>
    public feature = 'statistics'
    public totals: StatisticsVM

    //#endregion

    constructor(private helperService: HelperService, private messageLabelService: MessageLabelService, public dialog: MatDialog) { }

    //#region lifecycle hooks

    ngOnInit(): void {
        this.getTotals()
        this.removeTotalsFromArray()
        this.calculatePercentagePerRow()
        this.calculateNoShowPerRow()
        this.calculateTotalsPercentage()
        this.calculateTotalsNoShow()
        this.buildChart()
    }

    //#endregion

    //#region public methods

    public calculatePercentagePerRow(): void {
        this.array.forEach(element => {
            element.percentage = (100 * element.actualPax / this.totals.actualPax).toFixed(2)
        })
    }

    public calculateNoShowPerRow(): void {
        this.array.forEach(element => {
            element.noShow = element.pax - element.actualPax
        })
    }

    public calculateTotalsPercentage(): void {
        this.totals.percentage = (100 * this.totals.actualPax / this.totals.actualPax).toFixed(2)
    }

    public calculateTotalsNoShow(): void {
        this.totals.noShow = this.totals.pax - this.totals.actualPax
    }

    public doTasks(): void {
        this.dialog.open(GraphComponent, {
            data: this.array,
            height: '36.0625rem',
            panelClass: 'dialog',
            width: '31rem',
        })
    }

    public getLabel(id: string): string {
        return this.messageLabelService.getDescription(this.feature, id)
    }

    public getTableHeight(): string {
        return document.getElementById('content').clientHeight - 150 + 'px'
    }

    public formatNumberToLocale(value: number): any {
        return this.helperService.formatNumberToLocale(value)
    }

    //#endregion

    //#region private methods

    private buildChart(): void {
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

    private getTotals(): void {
        this.totals = this.array[this.array.length - 1]
    }

    private removeTotalsFromArray(): void {
        this.array.pop()
    }

    //#endregion

}
