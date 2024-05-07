import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';
import { Console } from 'console';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]), // az volt a problema hogy csak 6 karakterrel fogadja el a jelszot
    rePassword: new FormControl('', [Validators.required, Validators.minLength(6)]), // a deploy-nal meg az hogy init-elve lett a projekt ezert osszefosta magat
    // email: new FormControl(''),
    // password: new FormControl(''),
    // rePassword: new FormControl(''),
    name: new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
    })
  })

  constructor(private location: Location, private authService: AuthService, private userService: UserService, private router: Router,) { }

  ngOnInit(): void {
  }

  onSubmit(){
      // console.log(this.signUpForm.value)
      this.authService.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string).then(cred => {
        const user: User = {
          id: cred.user?.uid as string,
          email: this.signUpForm.get('email')?.value as string,
          username: (this.signUpForm.get('email')?.value as string).split('@')[0],
          name: {
            firstname: this.signUpForm.get('name.firstName')?.value as string,
            lastname: this.signUpForm.get('name.lastName')?.value as string,
          }
        };
        this.userService.create(user).then(_ => {
          this.router.navigateByUrl('/main');
        }).catch(error => {
          console.error(error);
        });
      }).catch(error => {
        console.error(error);
      });
  }

  getEmailErrorMessage() {
    if (this.signUpForm.get('email')?.hasError('required')) {
      return 'Kötelető megadni';
    }
    return this.signUpForm.get('email')?.hasError('email') ? 'Nem megfelelő e-mail cím' : '';
  }

  getPasswordErrorMessage() {
    if (this.signUpForm.get('password')?.hasError('required')) {
      return 'Kötelető megadni';
    }
    return this.signUpForm.get('password')?.hasError('minLength') ? 'Legalább 6 karaktert adjon meg' : '';
  }

  getRePasswordErrorMessage() {
    if (this.signUpForm.get('rePassword')?.hasError('required')) {
      return 'Kötelető megadni';
    }
    if(this.signUpForm.get('rePassword') !== this.signUpForm.get('password')){
      return 'Nem egyezik a két jelszó'
    }
    return this.signUpForm.get('rePassword')?.hasError('minLength') ? 'Legalább 6 karaktert adjon meg' : '';
  }

  goBack() {
    this.router.navigateByUrl('/login');
  }

}
