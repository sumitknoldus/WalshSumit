import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashProductsComponent } from './trash-products.component';

describe('TrashProductsComponent', () => {
  let component: TrashProductsComponent;
  let fixture: ComponentFixture<TrashProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrashProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrashProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
