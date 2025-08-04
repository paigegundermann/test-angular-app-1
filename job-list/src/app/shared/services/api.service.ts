import { Injectable } from "@angular/core";
import { catchError, Observable, of, Subject, take, tap, throwError } from "rxjs";
import { Application } from "../interfaces/application";
import { HttpClient } from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class ApiService {

    private _dataSubject: Subject<Application[]> = new Subject<Application[]>();
    public dataObservable: Observable<Application[]> = this._dataSubject.asObservable();

     private _data: Application[] = [];
    //     {
    //         Id: 1,
    //         Title: 'Software Engineer',
    //         Experience: 5,
    //         Salary: 100000
    //     },
    //     {
    //         Id: 2,
    //         Title: 'UI Designer',
    //         Experience: 2,
    //         Salary: 110000
    //     },
    //     {
    //         Id: 3,
    //         Title: 'Teacher',
    //         Experience: 1,
    //         Salary: 60000
    //     }
    // ];

    lastSort: String = "Title";

    apiUri = 'http://localhost:8080/applications';

    constructor(private readonly _http: HttpClient){
    }

    //ensure MongoDB / Node.js server is running!!! node app.js in mongo project

    public getData(): void {
        console.log('poop1');
        this._http.get('http://localhost:8080/applications').pipe(take(1)).subscribe((appilcations: any) => {
            appilcations.map((app: any) => {
                app = Object.assign(app, { Id: app._id });
                delete app['_id'];
            })
            this.sortData(this.lastSort);
            this._data = appilcations;
            this._dataSubject.next(this._data);
        });
    }

    public addApplication(app: Application): void {
        this._http.post(this.apiUri, app).pipe(take(1)).subscribe((result: any) => {
            // parse the added app out
            if(result.acknowledged){
                Object.assign(app, { Id: result._id })
                this._data.push(app);
                this.sortData(this.lastSort);
                this._dataSubject.next(this._data);
                console.log('poop2');
            }
        });
    }

    public updateApplication(app: Application): void {
        let appToUpdateIndex = this._data.findIndex((a) => a.Id === app.Id);
        this._http.put(this.apiUri + "/" + app.Id, app).pipe(take(1)).subscribe((result) => {
            this._data[appToUpdateIndex] = app;
            this.sortData(this.lastSort);
            this._dataSubject.next(this._data);
        });      
    } 

    public deleteApplication(application: Application): void {
        this._http.delete(this.apiUri + "/" + application.Id).pipe(take(1)).subscribe((result) => {
            if(result){
                this._data = this._data.filter((a) => a.Id !== application.Id);
                this._dataSubject.next(this._data);
            }
        })
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