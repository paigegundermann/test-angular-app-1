import { Injectable } from "@angular/core";
import { catchError, Observable, of, Subject, tap, throwError } from "rxjs";
import { Application } from "../interfaces/application";

@Injectable({providedIn: 'root'})
export class ApiService {

    private _dataSubject: Subject<Application[]> = new Subject<Application[]>();
    public dataObservable: Observable<Application[]> = this._dataSubject.asObservable();

    private _data: Application[] = [
        {
            Id: 1,
            Title: 'Software Engineer',
            Experience: 5,
            Salary: 100000
        },
        {
            Id: 2,
            Title: 'UI Designer',
            Experience: 2,
            Salary: 110000
        },
        {
            Id: 3,
            Title: 'Teacher',
            Experience: 1,
            Salary: 60000
        }
    ];

    lastSort: String = "Title";

    constructor(){
    }

    public getData(): void {
        console.log('poop1');
        this.sortData(this.lastSort);
        this._dataSubject.next(this._data);
    }

    public addApplication(app: Application): void {
        app.Id = Math.max(...this._data.map((appl)=> appl.Id)) + 1;
        this._data.push(app);
        this.sortData(this.lastSort);
        console.log('poop2');
    }

    public updateApplication(app: Application): void {
        let appToUpdateIndex = this._data.findIndex((a) => a.Id === app.Id);
        this._data[appToUpdateIndex] = app;
        this.sortData(this.lastSort);
    } 

    public deleteApplication(application: Application): void {
        this._data = this._data.filter((a) => a.Id !== application.Id);
        this._dataSubject.next(this._data);
    }

    public sortData(sortBy: String): void {
        switch(sortBy){
            case "Experience":
                this._data.sort((a, b) => {
                    if(a.Experience < b.Experience) {return -1;}
                    if(a.Experience > b.Experience) {return 1;}
                    return 0;
                })
                break;
            case "Job Title":
                this._data.sort((a, b) => {
                    return a.Title.localeCompare(b.Title);
                })
                break;
            case "Salary":
                this._data.sort((a, b) => {
                    if(a.Salary < b.Salary) {return -1;}
                    if(a.Salary > b.Salary) {return 1;}
                    return 0;
                })
                break;
            default:
                break;
        }        
        this.lastSort = sortBy;
        console.log("sorted" + JSON.stringify(this._data));
        this._dataSubject.next(this._data);
    }
}