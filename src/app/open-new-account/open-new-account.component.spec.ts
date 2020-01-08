import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenNewAccountComponent } from './open-new-account.component';

describe('OpenNewAccountComponent', () => {
  let component: OpenNewAccountComponent;
  let fixture: ComponentFixture<OpenNewAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenNewAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
