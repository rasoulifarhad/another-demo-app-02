import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  sessionId$: Observable<String> | undefined ;
  token$: Observable<String> | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // capture the session Id if available
    this.sessionId$ = this.route
        .queryParamMap
        .pipe(
          map(params => params.get('session_id') || 'None'));

    // capture fragment if available
    this.token$ = this.route
          .fragment
          .pipe(
            map(fragment => fragment || 'None'));
  }
}
