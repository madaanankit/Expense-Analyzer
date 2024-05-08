import { Component, inject } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { CommonValues } from '../../constant';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-expense',
  standalone: false,
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss'
})
export class AddExpenseComponent {
  selectedValue: string = '';
  expenseTypes = [
    { viewValue: 'Household' },
    { viewValue: 'Subscription' },
    { viewValue: 'Bill Payment' },
    { viewValue: 'Travel' },
    { viewValue: 'Miscellaneous' },
  ];
  expenseDate: Date = new Date();
  today = new Date();
  expenseName: string = '';
  expenseAmount: number = 0;
  paymentMode = [
    { viewValue: 'Cash' },
    { viewValue: 'UPI' },
    { viewValue: 'Credit/Debit Card' },
    { viewValue: 'Others' },
  ]
  selectedPaymentMode: string = '';
  commonService : CommonService = inject(CommonService);
  _snackBar : MatSnackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  onSubmit() {
    const userId = sessionStorage.getItem(CommonValues.userID);
    if(userId){
      this.commonService.saveExpense({
        "ExpenseType": this.selectedValue,
        "ExpenseName": this.expenseName,
        "ExpenseAmount": this.expenseAmount,
        "PaymentMode": this.selectedPaymentMode,
        "ExpenseDate": this.expenseDate,
        "UserId": sessionStorage.getItem(CommonValues.userID)
      }).subscribe(data => {
        console.log(data);
        this.resetForm();
        this.openSnackBar('Expense Added','Close');
      });
    }
  }

  resetForm(){
    this.selectedValue = '';
    this.expenseDate = new Date();
    this.expenseName = '';
    this.expenseAmount = 0;
    this.selectedPaymentMode = '';
  }

}
