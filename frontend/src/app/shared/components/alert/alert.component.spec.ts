import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default alertType "info"', () => {
    expect(component.alertType).toEqual('info');
  });

  it('should display the correct message', () => {
    const testMessage = 'This is a test alert message.';
    component.message = testMessage;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain(testMessage);
  });

  it('should apply the correct CSS class based on alertType', () => {
    component.alertType = 'error';
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.text-red-800')).not.toBeNull();
  });
});