import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gioithieuctv',
  imports: [

  ],
  templateUrl: './gioithieuctv.component.html',
  styleUrl: './gioithieuctv.component.scss'
})
export class GioithieuctvComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboardctv']);
    }
  }
}
