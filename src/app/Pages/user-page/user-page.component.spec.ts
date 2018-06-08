import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPageComponent } from './user-page.component';
import { NavbarComponent } from './navbar/navbar.component'
import { FeedComponent } from './feed/feed.component';
import { NavItemComponent } from './navbar/nav-item/nav-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFontAwesomeComponent, AngularFontAwesomeModule } from 'angular-font-awesome';
describe('UserPageComponent', () => {
  let component: UserPageComponent;
  let fixture: ComponentFixture<UserPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPageComponent,NavbarComponent,FeedComponent,NavItemComponent],
      imports : [RouterTestingModule,AngularFontAwesomeModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
