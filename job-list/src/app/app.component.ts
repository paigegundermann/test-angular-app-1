import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApplicationTableComponent } from './application/application-table/application-table.component';
import { CreateApplicationComponent } from './application/create-application/create-application.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ApplicationTableComponent, CreateApplicationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'job-list';
}
