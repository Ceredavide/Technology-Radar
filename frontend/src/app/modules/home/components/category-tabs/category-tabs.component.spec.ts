import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryTabs } from './category-tabs.component';

describe('CategoryTabsComponent', () => {
  let component: CategoryTabs;
  let fixture: ComponentFixture<CategoryTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryTabs]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryTabs);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update categories input correctly', () => {
    const testCategories = ['Category 1', 'Category 2', 'Category 3'];
    component.categories = testCategories;

    expect(component.categories).toEqual(testCategories);
  });

  it('should emit onTabChange when selectTab is called', () => {
    spyOn(component.onTabChange, 'emit');
    const index = 1;
    component.selectTab(index);

    expect(component.selectedTab).toEqual(index);
    expect(component.onTabChange.emit).toHaveBeenCalledWith(index);
  });

  it('should handle selectTabFromSelect correctly', () => {
    spyOn(component.onTabChange, 'emit');
    const event = { target: { value: '2' } } as unknown as Event;
    component.selectTabFromSelect(event);

    expect(component.selectedTab).toEqual(2);
    expect(component.onTabChange.emit).toHaveBeenCalledWith(2);
  });
});
