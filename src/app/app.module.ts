import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { AddExpenseComponent } from './components/add-expense/add-expense.component';
import { AllExpensesComponent } from './components/all-expenses/all-expenses.component';
import { VisualizeExpenseComponent } from './components/visualize-expense/visualize-expense.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import {MatChipsModule} from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    AddExpenseComponent,
    AllExpensesComponent,
    VisualizeExpenseComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideNativeDateAdapter()
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    RouterOutlet,
    FormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    DatePipe,
    MatTableModule,
    RouterModule.forRoot(routes),
    MatChipsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
