import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordMealComponent } from './record-meal.component';

describe('RecordMealComponent', () => {
  let component: RecordMealComponent;
  let fixture: ComponentFixture<RecordMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordMealComponent]
    });
    fixture = TestBed.createComponent(RecordMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
