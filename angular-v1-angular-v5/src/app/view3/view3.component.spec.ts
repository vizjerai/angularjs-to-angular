import { TestBed, async } from '@angular/core/testing';
import { View3Component } from './view3.component';

describe('View3Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        View3Component
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(View3Component);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'Angular 5 - View 3'`, async(() => {
    const fixture = TestBed.createComponent(View3Component);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular 5 - View 3');
  }));
  it('should render title in a h2 tag', async(() => {
    const fixture = TestBed.createComponent(View3Component);
    fixture.detectChanges();
    const app = fixture.debugElement.componentInstance;
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(app.title);
  }));
});
