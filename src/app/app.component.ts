import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  title = 'expense-analyzer';

  constructor(){
  }

  // selectedValue: string = '';
  // selectedPaymentMode: string = '';
  // expenseName: string = '';
  // expenseAmount: number = 0;
  // view: [number, number] = [700, 400];
  // single = [
  //   {
  //     "name": "Germany",
  //     "value": 8940000
  //   },
  //   {
  //     "name": "USA",
  //     "value": 5000000
  //   },
  //   {
  //     "name": "France",
  //     "value": 7200000
  //   },
  //   {
  //     "name": "UK",
  //     "value": 6200000
  //   }
  // ];
  // today = new Date();
  // expenseDate: Date = new Date();

  // // options
  // gradient: boolean = true;
  // showLegend: boolean = true;
  // showLabels: boolean = true;
  // isDoughnut: boolean = true;
  // legendPosition: LegendPosition = LegendPosition.Below;

  // colorScheme: Color = {
  //   name: 'custom',
  //   selectable: true,
  //   group: ScaleType.Ordinal,
  //   domain: ['#F7B7A3', '#EA5F89', '#9B3192', '#57167E', '#2B0B3F'],
  // };

  // expenseTypes = [
  //   { viewValue: 'Household' },
  //   { viewValue: 'Subscription' },
  //   { viewValue: 'Bill Payment' },
  //   { viewValue: 'Travel' },
  //   { viewValue: 'Miscellaneous' },
  // ];

  // displayedColumns: string[] = ['expenseTypeCol', 'expenseDateCol', 'expenseNameCol', 'expenseAmountCol', 'paymentModeCol'];

  // paymentMode = [
  //   { viewValue: 'Cash' },
  //   { viewValue: 'UPI' },
  //   { viewValue: 'Credit/Debit Card' },
  //   { viewValue: 'Others' },
  // ]

  // expenses: any;

  // constructor(private commonService: CommonService) { }

  // ngOnInit() {
  //   this.getExpenses();
  // }

  // onSelect(data: any): void {
  //   console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  // }

  // onActivate(data: any): void {
  //   console.log('Activate', JSON.parse(JSON.stringify(data)));
  // }

  // onDeactivate(data: any): void {
  //   console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  // }

  // onSubmit() {
  //   this.commonService.saveExpense({
  //     "ExpenseType": this.selectedValue,
  //     "ExpenseName": this.expenseName,
  //     "ExpenseAmount": this.expenseAmount,
  //     "PaymentMode": this.selectedPaymentMode,
  //     "ExpenseDate": this.expenseDate
  //   }).subscribe(data => {
  //     console.log(data);
  //     this.getExpenses();
  //   });
  // }

  // getExpenses() {
  //   this.commonService.getExpenses().subscribe(data => {
  //     this.expenses = data;


  //     // Calculate the sum of ExpenseAmount for each ExpenseType
  //     const expenseSums = this.expenses.reduce((acc: any, expense: any) => {
  //       // Check if the ExpenseType already exists in the accumulator
  //       if (acc[expense.ExpenseType]) {
  //         // If it exists, add the ExpenseAmount to the existing sum
  //         acc[expense.ExpenseType] += expense.ExpenseAmount;
  //       } else {
  //         // If it doesn't exist, initialize the sum with the ExpenseAmount
  //         acc[expense.ExpenseType] = expense.ExpenseAmount;
  //       }
  //       return acc;
  //     }, {});

  //     // Convert the calculated sums into the desired format
  //     const formattedExpenses = Object.keys(expenseSums).map(expenseType => ({
  //       name: expenseType,
  //       value: expenseSums[expenseType]
  //     }));
  //     this.single = formattedExpenses;
  //   })
  // }
}
