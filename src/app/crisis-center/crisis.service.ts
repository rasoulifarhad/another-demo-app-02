import { Injectable } from "@angular/core";
import { MessageService } from "../message.service";
import { Observable, filter, from, map, of } from "rxjs";
import { Crisis } from "./crisis";
import { CRISES } from "./mock-crises";

@Injectable({
  providedIn: 'root',
})
export class CrisisService {

  getCrisis(id: number | string) : Observable<Crisis> {

    return from(CRISES).pipe(
      filter(crisis => crisis.id === +id )
    )
  }

  constructor(private messageService: MessageService) {}

  getCrises() : Observable<Crisis[]> {
    this.messageService.add('CrisisService: fetched crises');
    return of(CRISES);
  }

  getCrisis2(id: number | string) {
    return this.getCrises().pipe(
      // (+) before `id` turns the string into a number
      map((crises: Crisis[]) => crises.find(crisis => crisis.id === +id))
    );
  }
}
