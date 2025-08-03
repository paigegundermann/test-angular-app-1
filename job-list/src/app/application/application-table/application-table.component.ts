import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { ApplicationTableItemComponent } from '../application-table-item/application-table-item.component';
import { MatTableModule } from '@angular/material/table';
import { Application } from '../../shared/interfaces/application';
import { Observable, take } from "rxjs";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-table',
  imports: [ApplicationTableItemComponent, MatTableModule, CommonModule],
  templateUrl: './application-table.component.html',
  styleUrl: './application-table.component.css',
  providers: [],
  standalone: true
})
export class ApplicationTableComponent implements OnInit {
  @Output() editApplicationEvent: EventEmitter<Application> = new EventEmitter<Application>();
  applicationList: Application[] = [];
  headerList = ["Job Title", "Salary", "Experience"];

  constructor(private readonly _apiService: ApiService) {
    
  }

  ngOnInit(): void {
    this._apiService.dataObservable.subscribe({
      next: (apps) => {
        console.log('poop3');
        this.applicationList = apps;
      },
      error: (err) => console.log(`There was an error ${err}`),
      complete: () => console.log('complete')
    });
    this._apiService.getData();
  }

  public editApplication(event: Application): void{
    this.editApplicationEvent.emit(event);
  }

  public deleteApplication(event: Application): void{
   this._apiService.deleteApplication(event);
  }

  public sortData(input: String): void {
    console.log("input" + input);
    this._apiService.sortData(input);
  }
}
