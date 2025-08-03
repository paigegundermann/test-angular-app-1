import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Application } from '../../shared/interfaces/application';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'tr[app-application-table-item]',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './application-table-item.component.html',
  styleUrl: './application-table-item.component.css'
})
export class ApplicationTableItemComponent {
  @Input() application!: Application;
  @Output() editApplication: EventEmitter<Application> = new EventEmitter<Application>();
  @Output() deleteApplication: EventEmitter<Application> = new EventEmitter<Application>();

  public editEntry(): void{
    this.editApplication.emit(this.application);
  }

  public deleteEntry(): void{
    this.deleteApplication.emit(this.application);
  }
}
