import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent {

  name = '';
  email = '';
  password = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const payload = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.http.post(
      'http://localhost:5000/api/users/signup',
      payload
    ).subscribe({
      next: (res) => {
        alert('User created successfully');
        this.name = '';
        this.email = '';
        this.password = '';
      },
      error: (err) => {
        alert(err.error?.message || 'Signup failed');
      }
    });
  }
}
