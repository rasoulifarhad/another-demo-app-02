import { Component, Input, OnInit } from '@angular/core';
import { Crisis } from '../crisis';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CrisisService } from '../crisis.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-crisis-detail',
  templateUrl: './crisis-detail.component.html',
  styleUrls: ['./crisis-detail.component.css']
})
export class CrisisDetailComponent implements OnInit {

  @Input() crisis: Crisis | undefined;
  crisis$: Observable<Crisis> | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CrisisService
  ) {}

  ngOnInit(): void {
    // use the ActivatedRoute service to retrieve the parameters for
    // the route, pull the crisis id from the parameters, and retrieve
    // the crisis to display.

    // The switchMap operator does two things. It flattens the Observable<Crisis>
    // that CrisisService returns and cancels previous pending requests.
    this.crisis$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.service.getCrisis(params.get('id')!)
      })
    );

    // const id = + (this.route.snapshot.paramMap.get('id'))!;
    // this.crisis$ =this.service.getCrisis(id);
  }

  getCrises(crisis: Crisis) {
    const crisisId = crisis ? crisis.id : null;
    // Pass along the crisis id if available
    // so that the CrisisList component can select that crisis.
    // Include a junk 'foo' property for fun.
    // Relative navigation back to the crises
    this.router.navigate(['../', {id: crisisId, foo: 'foo'}], { relativeTo: this.route});
    // this.router.navigate(['/supercrises', {id: crisisId, foo: 'Foo'}]);
  }
}
