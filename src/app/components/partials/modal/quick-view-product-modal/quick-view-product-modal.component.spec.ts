import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickViewProductModalComponent } from './quick-view-product-modal.component';

describe('QuickViewProductModalComponent', () => {
  let component: QuickViewProductModalComponent;
  let fixture: ComponentFixture<QuickViewProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickViewProductModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickViewProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
