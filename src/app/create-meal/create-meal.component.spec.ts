import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMealComponent } from './create-meal.component';

describe('CreateMealComponent', () => {
  let component: CreateMealComponent;
  let fixture: ComponentFixture<CreateMealComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMealComponent]
    });
    fixture = TestBed.createComponent(CreateMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
