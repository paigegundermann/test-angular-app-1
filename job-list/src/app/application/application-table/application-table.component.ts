import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { ApplicationTableItemComponent } from '../application-table-item/application-table-item.component';

@Component({
  selector: 'app-application-table',
  imports: [ApplicationTableItemComponent],
  templateUrl: './application-table.component.html',
  styleUrl: './application-table.component.css',
  providers: [ApiService]
})
export class ApplicationTableComponent {
  constructor(private readonly _apiService: ApiService) {

  }

  public getApplications() {
    this._apiService.getData();
  }
}
