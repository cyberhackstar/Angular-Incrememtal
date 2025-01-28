import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: '',
  };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.user.email && this.user.password) {
      this.authService.loginUser(this.user).subscribe(
        (res) => {
          sessionStorage.setItem('email', this.user.email);
          sessionStorage.setItem('role', res.userRole);
          sessionStorage.setItem('userId', res.userId.toString());
          this.router.navigate(['/']);
        },
        (error) => {
          alert('User not found');
        }
      );
    }
  }
  ngOnInit(): void {
  }

}
