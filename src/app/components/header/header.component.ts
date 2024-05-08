import { Component, inject } from '@angular/core';
import { CommonValues } from '../../constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  router: Router = inject(Router);

  logout(){
    sessionStorage.removeItem(CommonValues.authToken);
    sessionStorage.removeItem(CommonValues.userID);
    this.router.navigate(['/login']);
  }
}
