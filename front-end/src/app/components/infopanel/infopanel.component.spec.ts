import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { InfopanelComponent } from './infopanel.component';
import { SampleData } from '../../services/samples/sampledata';
import { TradeHistory } from 'src/app/services/dataservice.service';

describe('InfopanelComponent', () => {
  let component: InfopanelComponent;
  let fixture: ComponentFixture<InfopanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpClient],
      declarations: [InfopanelComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfopanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show component if data is undefined', () => {
    const main_div_ement = fixture.debugElement.nativeElement.querySelector(
      'div.main.container'
    );
    expect(main_div_ement).not.toHaveClass('hide');
  });

  it('should hide component if data is defined', () => {
    /* define data */
    component.data = new TradeHistory(SampleData);

    const main_div_ement = fixture.debugElement.nativeElement.querySelector(
      'div.main.container'
    );
    fixture.detectChanges();

    expect(main_div_ement).toHaveClass('hide');
  });
});
