export interface ChartModel {
  name: string,
  value: number
}

export interface ExpenseModel {
  _id: string,
  ExpenseType: string,
  ExpenseName: string,
  ExpenseAmount: number,
  PaymentMode: string,
  ExpenseDate: string,
  ExpenseId: number
  __v: number
}

export interface GetExpenseResponseModel {
  Result: string,
  Data: ExpenseModel[]
}

export interface SignupResponseModel {
  Result: string,
  message: string,
  UUID: string,
  UserId?: string
}

export interface LoginResponseModel {
  Result: string,
  message: string,
  UUID: string,
  UserId: string
}

export interface SaveExpenseRequestModel {
  ExpenseType: string,
  ExpenseName: string,
  ExpenseAmount: number,
  PaymentMode: string,
  ExpenseDate: Date,
  UserId: string | null
}

export interface SignupRequestModel { 
  Username: string, 
  Password: string 
}
