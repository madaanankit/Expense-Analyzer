import { Component, inject } from '@angular/core';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { CommonService } from '../../services/common.service';
import { ChartModel, ExpenseModel, GetExpenseResponseModel } from '../../model/expense.model';
import { CommonValues } from '../../constant';

@Component({
  selector: 'app-visualize-expense',
  standalone: false,
  templateUrl: './visualize-expense.component.html',
  styleUrl: './visualize-expense.component.scss'
})
export class VisualizeExpenseComponent {
  view: [number, number] = [925, 625];
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#F7B7A3', '#EA5F89', '#9B3192', '#57167E', '#2B0B3F'],
  };
  single: ChartModel[] = [];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = true;
  expenses: ExpenseModel[] = [];
  legendPosition: LegendPosition = LegendPosition.Right;
  commonService: CommonService = inject(CommonService);

  ngOnInit(): void {
    this.getExpenses();
  }
  
  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  getExpenses() {
    const userId = sessionStorage.getItem(CommonValues.userID);
    this.commonService.getExpenses({ UserId: userId }).subscribe(data => {
      this.expenses = data as ExpenseModel[];


      // Calculate the sum of ExpenseAmount for each ExpenseType
      const expenseSums = this.expenses.reduce((acc: {[key:string]: number}, expense: ExpenseModel) => {
        // Check if the ExpenseType already exists in the accumulator
        if (acc[expense.ExpenseType]) {
          // If it exists, add the ExpenseAmount to the existing sum
          acc[expense.ExpenseType] += expense.ExpenseAmount;
        } else {
          // If it doesn't exist, initialize the sum with the ExpenseAmount
          acc[expense.ExpenseType] = expense.ExpenseAmount;
        }
        return acc;
      }, {});

      // Convert the calculated sums into the desired format
      const formattedExpenses = Object.keys(expenseSums).map(expenseType => ({
        name: expenseType,
        value: expenseSums[expenseType]
      }));
      this.single = formattedExpenses;
    })
  }
}
