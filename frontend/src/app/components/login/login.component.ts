import { Component, OnInit, inject } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { SHA256 } from 'crypto-js';
import { Router } from '@angular/router';
import { Result, CommonValues } from '../../constant';
import { LoginResponseModel } from '../../model/expense.model';
import { Subject, fromEvent, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  userName: string = '';
  password: string = '';
  commonService: CommonService = inject(CommonService)
  router: Router = inject(Router);
  private unsubscriber : Subject<void> = new Subject<void>();
  
  ngOnInit(){
    history.pushState(null,'');
    fromEvent(window, 'popstate').pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((_) => {
      history.pushState(null, '');
    });
  }

  onSubmit(){
    const hashedPassword = SHA256(this.password).toString();
    this.commonService.login({Username:this.userName, Password:hashedPassword}).subscribe((data) => {
      const loginResponse = data as LoginResponseModel;
      if(loginResponse.Result === Result.Success){
        sessionStorage.setItem(CommonValues.userID,loginResponse.UserId)
        sessionStorage.setItem(CommonValues.authToken,loginResponse.UUID)
        this.router.navigate(['/home']);
      }
    })
  }
}
