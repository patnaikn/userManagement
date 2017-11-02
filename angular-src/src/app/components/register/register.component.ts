import { Component, OnInit } from '@angular/core';
import { ValidateService } from "../../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthenticateService } from "../../services/authenticate.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService : ValidateService,
              private flashMessages : FlashMessagesService,
              private authService: AuthenticateService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  onRegister(){
    var user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    //Required Fields
    if(!this.validateService.validateRegister(user)){
      this.flashMessages.show('Please fill in all fields', {cssClass: 'alert alert-danger', timeout: 3000});
      return false;
    };

    // Validate Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessages.show('Please enter a valid email', {cssClass: 'alert alert-danger', timeout: 3000});
      return false;
    };

    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessages.show(data.msg, {cssClass: 'alert alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessages.show(data.msg, {cssClass: 'alert alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });

  }

}
