import { async, ComponentFixture, tick, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFontAwesomeComponent, AngularFontAwesomeModule } from 'angular-font-awesome';
import { FeedComponent } from './feed.component';
import { AppComponent } from '../../../app.component';
import { HomeComponent } from '../../home/home.component';
import { MainFeedComponent } from '../../main-feed/main-feed.component';
import { UserPageComponent } from '../user-page.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { InteractComponent } from '../../interact/interact.component';
import { PublishComponent } from '../../publish/publish.component';
import { ViewPostComponent } from '../../view-post/view-post.component';
import { ErrorPageComponent } from '../../error-page/error-page.component';
import { NavItemComponent } from '../navbar/nav-item/nav-item.component';
import { routes } from '../../../app.module';
import { Router } from '@angular/router';


describe('FeedComponent', () => {

  let component : FeedComponent;
  let fixture : ComponentFixture<FeedComponent>;
  let router : Router;
  let location : Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        MainFeedComponent,
        UserPageComponent,
        NavbarComponent,
        FeedComponent,
        InteractComponent,
        PublishComponent,
        ViewPostComponent,
        ErrorPageComponent,
        NavItemComponent
      ],
        imports: [RouterTestingModule.withRoutes(routes),AngularFontAwesomeModule],
    });

    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();

  }));

  it( 'recives the correct url parameters', fakeAsync(() => {
    router.navigate(['feed']);
    tick(50);
    expect(component.loadOnUrlChange).toHaveBeenCalled();
  }));

});
