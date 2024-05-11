import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScreenComponent } from './screen.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ScreenComponent', () => {
    let component: ScreenComponent;
    let fixture: ComponentFixture<ScreenComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                ScreenComponent,
                HeaderComponent,
                FooterComponent,
                HttpClientModule,
                RouterTestingModule
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should include header and footer components', () => {
        const headerElement = fixture.nativeElement.querySelector('app-header');
        const footerElement = fixture.nativeElement.querySelector('app-footer');

        expect(headerElement).not.toBeNull();
        expect(footerElement).not.toBeNull();
    });
});
