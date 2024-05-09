import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { ExpenseModel } from '../../model/expense.model';
import { CommonValues } from '../../constant';
import { ThemePalette } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ChipColor {
  name: string;
  color: ThemePalette;
  selected: boolean;
}

@Component({
  selector: 'app-all-expenses',
  standalone: false,
  templateUrl: './all-expenses.component.html',
  styleUrl: './all-expenses.component.scss'
})

export class AllExpensesComponent implements OnInit {
  expenses: ExpenseModel[] = [];
  filteredExpenses: ExpenseModel[] = [];
  displayedColumns: string[] = ['expenseTypeCol', 'expenseDateCol', 'expenseNameCol', 'expenseAmountCol', 'paymentModeCol', 'deleteCol'];
  commonService: CommonService = inject(CommonService);
  availableColors: ChipColor[] = [
    { name: 'Household', color: 'primary', selected: false },
    { name: 'Subscription', color: 'primary', selected: false },
    { name: 'Bill Payment', color: 'primary', selected: false },
    { name: 'Travel', color: 'primary', selected: false },
    { name: 'Miscellaneous', color: 'primary', selected: false },
  ];
  today = new Date();
  startDate: Date | undefined;
  endDate: Date | undefined;
  _snackBar : MatSnackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getExpenses();
  }

  selectedChip(event: string) {
    this.availableColors.map((x) => {
      if (x.name === event) {
        x.selected = !x.selected;
        if (x.selected) {
          this.filterTable(event);
        }else {
          if(this.startDate && this.endDate){
            this.onChange();
          }else {
            this.filteredExpenses = this.expenses;
          }
        }
      } else {
        x.selected = false;
      }
    });
  }

  filterTable(expenseType: string) {
    if(this.startDate && this.endDate){
      const startDateFormatted = new Date(this.startDate.toISOString());
      const endDateFormatted = new Date(this.endDate.toISOString());
      this.filteredExpenses = this.expenses.filter((x)=>{
        const expenseDate = new Date(x.ExpenseDate);
        if(expenseDate >= startDateFormatted && expenseDate <= endDateFormatted){
          return x;
        } else{
          return;
        }
      });
      this.filteredExpenses = this.filteredExpenses.filter(x => x.ExpenseType === expenseType);
    } else{
      this.filteredExpenses = this.expenses.filter(x => x.ExpenseType === expenseType);
    }
  }

  getExpenses() {
    const userId = sessionStorage.getItem(CommonValues.userID);
    this.commonService.getExpenses({ UserId: userId }).subscribe(data => {
      this.expenses = data as ExpenseModel[];
      this.filteredExpenses = this.expenses;
    });
  }

  onChange(){
    if(this.startDate && this.endDate){
      //perform filter action
      const startDateFormatted = new Date(this.startDate.toISOString());
      const endDateFormatted = new Date(this.endDate.toISOString());
      // if(this.filteredExpenses.length === 0){
        this.filteredExpenses = this.expenses.filter((x)=>{
          const expenseDate = new Date(x.ExpenseDate);
          if(expenseDate >= startDateFormatted && expenseDate <= endDateFormatted){
            return x;
          } else{
            return;
          }
        });
      // }else {
      //   this.filteredExpenses = this.filteredExpenses.filter((x)=>{
      //     const expenseDate = new Date(x.ExpenseDate);
      //     if(expenseDate >= startDateFormatted && expenseDate <= endDateFormatted){
      //       return x;
      //     } else{
      //       return;
      //     }
      //   });
      // }
    }
  }

  clearDateFilter(){
    this.startDate = this.endDate = undefined;
    this.availableColors.map((x) => {
        x.selected = false;
    });
    this.filteredExpenses = this.expenses;
  }

  deleteExpense(expense: ExpenseModel){
    this.commonService.deleteExpense({ ExpenseId: expense.ExpenseId }).subscribe(data => {
      this.openSnackBar('Expense deleted Successfully', 'Close');
      this.getExpenses();
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
