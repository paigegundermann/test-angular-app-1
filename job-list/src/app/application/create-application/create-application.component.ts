import { Component } from '@angular/core';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'app-create-application',
  imports: [MatInput, MatFormField, MatLabel],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.css'
})
export class CreateApplicationComponent {

}
