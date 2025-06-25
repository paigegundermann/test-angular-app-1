import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationTableItemComponent } from './application-table-item.component';

describe('ApplicationTableItemComponent', () => {
  let component: ApplicationTableItemComponent;
  let fixture: ComponentFixture<ApplicationTableItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationTableItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationTableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
