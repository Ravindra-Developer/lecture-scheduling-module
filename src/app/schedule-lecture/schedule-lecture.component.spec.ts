import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLectureComponent } from './schedule-lecture.component';

describe('ScheduleLectureComponent', () => {
  let component: ScheduleLectureComponent;
  let fixture: ComponentFixture<ScheduleLectureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleLectureComponent]
    });
    fixture = TestBed.createComponent(ScheduleLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
