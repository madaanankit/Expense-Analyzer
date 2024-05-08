import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constant';
import { SaveExpenseRequestModel, SignupRequestModel } from '../model/expense.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private httpClient: HttpClient) { }

  getExpenses(userId:any){
    return this.httpClient.post(URL+'/get-expenses', userId);
  }

  saveExpense(data:SaveExpenseRequestModel){
    return this.httpClient.post(URL+'/save-expense',data);
  }

  login(data:SignupRequestModel){
    return this.httpClient.post(URL+'/login',data);
  }

  signup(data:SignupRequestModel){
    return this.httpClient.post(URL+'/signup',data);
  }

  deleteExpense(data:any){
    return this.httpClient.post(URL+'/delete-expense',data);
  }
}
