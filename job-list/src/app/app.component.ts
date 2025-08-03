import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationTableComponent } from './application/application-table/application-table.component';
import { CreateApplicationComponent } from './application/create-application/create-application.component';
import { Application } from './shared/interfaces/application';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ApplicationTableComponent, CreateApplicationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'job-list';
  application: Application|null = null;

  constructor(private readonly _apiService: ApiService) {
    console.log('app constructed');
  }

  editApplication(application: Application) {
    this.application = application;
  }

  public clearApplication(): void {
    this.application = null;
  }
}
