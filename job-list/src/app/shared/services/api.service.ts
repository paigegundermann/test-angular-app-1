import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Application } from "../interfaces/application";

@Injectable()
export class ApiService {

    private readonly _data: Application[] = [
        {
            Id: 1,
            Title: 'Software Engineer',
            Experience: 5,
            Salary: 100000
        },
        {
            Id: 2,
            Title: 'Software Engineer',
            Experience: 5,
            Salary: 100000
        },
        {
            Id: 3,
            Title: 'Software Engineer',
            Experience: 5,
            Salary: 100000
        }
    ];

    constructor(){}

    public getData(): Observable<Application[]> {
        return of(this._data);
    }
}