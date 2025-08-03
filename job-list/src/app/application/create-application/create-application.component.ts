import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatInputModule, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Application } from '../../shared/interfaces/application';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-create-application',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatLabel, MatInputModule, MatButtonModule],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.css',
  providers: [],
  standalone: true
})
export class CreateApplicationComponent implements OnChanges {
  @Input() application: Application|null = null;
  @Output() editCompleteEvent: EventEmitter<void> = new EventEmitter<void>();

   readonly applicationForm: FormGroup = new FormGroup({
      Id: new FormControl(this.application?.Id),
      Title: new FormControl(this.application?.Title, Validators.required),
      Salary: new FormControl(this.application?.Salary, Validators.required),
      Experience: new FormControl(this.application?.Experience, Validators.required),
   });

  constructor(private readonly _apiService: ApiService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes['application'] && changes['application'].currentValue){
      this.applicationForm.setValue(changes['application'].currentValue);
    }
  }

  get buttonLabel(): string {
    return this.application ? 'Update' : 'Add New';
  }

  public checkForm(): boolean {
    return !this.applicationForm.value.Title || !this.applicationForm.value.Salary || !this.applicationForm.value.Experience;
  }

  public submitNewApplication(): void {
    var newApp: Application = this.applicationForm.getRawValue();
    this._apiService.addApplication(newApp);
    this.applicationForm.reset();
  }

  public updateApplication(): void {
    var updatedApp: Application = this.applicationForm.getRawValue();
    this._apiService.updateApplication(updatedApp);
    this.applicationForm.reset();
    this.editCompleteEvent.emit();
  }

}
