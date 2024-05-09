import { Component, inject } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { SHA256 } from 'crypto-js';
import { Result } from '../../constant';
import { Router } from '@angular/router';
import { SignupResponseModel } from '../../model/expense.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: '/src/app/components/login/login.component.scss'
})
export class SignupComponent {
  userName: string = '';
  password: string = '';
  commonService: CommonService = inject(CommonService)
  router: Router = inject(Router);
  _snackBar : MatSnackBar = inject(MatSnackBar);
  
  onSubmit(){
    const hashedPassword = SHA256(this.password).toString();
    this.commonService.signup({Username:this.userName, Password:hashedPassword}).subscribe((data) => {
      const signupResponse = data as SignupResponseModel;
      if(signupResponse.Result === Result.Success){
        this.openSnackBar('Account created Successfully','Close');
        this.router.navigate(['/login']);
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
