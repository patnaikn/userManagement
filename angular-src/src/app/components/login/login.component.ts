import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from "../../services/authenticate.service";
import { Router } from '@angular/router';
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private authService: AuthenticateService,
              private router: Router,
              private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token,data.user);
        this.flashMessage.show('Log in successful', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigateByUrl('/profile');

      }else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/login']);
      }
    });
  }
}
