import { Routes } from '@angular/router';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AllExpensesComponent } from './components/all-expenses/all-expenses.component';
import { VisualizeExpenseComponent } from './components/visualize-expense/visualize-expense.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {
        path: 'home',
        title: 'home',
        component: HomeComponent,
        children: [
            {
                path: '',
                title: 'Add Expense',
                component: AddExpenseComponent
            },
            {
                path: 'all-expenses',
                title: 'All Expenses',
                component: AllExpensesComponent
            },
            {
                path: 'visualize-expense',
                title: 'Visualize Expenses',
                component: VisualizeExpenseComponent
            },
        ]
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent
    },
    {
        path: 'signup',
        title: 'SignUp',
        component: SignupComponent
    },
    {
        path: '',
        title: 'Login',
        component: LoginComponent
    },
    {
        path: '**',
        title: 'Login',
        component: LoginComponent
    }
];
