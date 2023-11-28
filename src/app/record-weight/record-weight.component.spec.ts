import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecordWeightComponent } from './record-weight.component';

describe('RecordWeightComponent', () => {
  let component: RecordWeightComponent;
  let fixture: ComponentFixture<RecordWeightComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecordWeightComponent]
    });
    fixture = TestBed.createComponent(RecordWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
