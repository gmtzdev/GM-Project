import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { FinancesService } from '../../core/services/finances.service';
import { HttpResponse } from '../../../../shared/models/http/HttpResponse.model';

@Component({
  selector: 'app-expensesweek',
  standalone: true,
  imports: [],
  templateUrl: './expensesweek.component.html',
  styleUrl: './expensesweek.component.scss',
})
export class ExpensesweekComponent implements OnInit {
  @ViewChild('mainExpensesWeek')
  mainExpensesWeek!: ElementRef;

  constructor(private readonly financesService: FinancesService) {}

  public ngOnInit(): void {
    echarts.use([GridComponent, BarChart, CanvasRenderer]);

    type EChartsOption = echarts.ComposeOption<
      GridComponentOption | BarSeriesOption
    >;

    // TODO Use the ElementRef reference to puth the chart
    const chartDom = document.getElementById('mainWeek')!;
    const myChart = echarts.init(chartDom);
    let option: EChartsOption;

    this.financesService.getExpensesByWeek().subscribe({
      next: (response: HttpResponse) => {
        console.log(response);
        if (response.success) {
          const expenses = [];
          for (const day of response.data) {
            expenses.push({
              value: day.expenses,
              itemStyle: {
                borderRadius: [5, 5, 0, 0],
              },
            });
          }
          option = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
            },
            color: ['#1ef50d'],
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                data: expenses,
                barWidth: '25%',
                type: 'bar',
              },
            ],
          };

          if (option && myChart) myChart.setOption(option);
        }
      },
    });
  }
}
