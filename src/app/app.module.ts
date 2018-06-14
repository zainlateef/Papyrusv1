import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FacetMenuComponent } from './Pages/user-page/navbar/facet-menu/facet-menu.component';
import { FeedComponent } from './Pages/user-page/feed/feed.component';
import { InteractComponent } from './Pages/interact/interact.component';
import { PublishComponent } from './Pages/publish/publish.component';
import { HomeComponent } from './Pages/home/home.component';
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { ViewPostComponent } from './Pages/view-post/view-post.component';
import { MainFeedComponent } from './Pages/main-feed/main-feed.component';
import { UserPageComponent } from './Pages/user-page/user-page.component';
import { FacetItemComponent } from './Pages/user-page/navbar/facet-menu/facet-item/facet-item.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './Pages/user-page/navbar/navbar.component';
import { FriendSearchComponent } from './Pages/user-page/navbar/friend-search/friend-search.component';
import { UserMenuComponent } from './Pages/user-page/navbar/user-menu/user-menu.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';

export const routes: Routes=[
  {path: '', component: HomeComponent},
  {path: 'feed', component: MainFeedComponent},
  {path: 'feed/:uid', component: UserPageComponent},
  {path: 'view/:postID', component: ViewPostComponent},
  {path: 'interact/:uid', component: InteractComponent},
  {path: 'publish/:uid', component: PublishComponent},
  {path: '**', component: ErrorPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainFeedComponent,
    UserPageComponent,
    FacetMenuComponent,
    FeedComponent,
    InteractComponent,
    PublishComponent,
    ViewPostComponent,
    ErrorPageComponent,
    FacetItemComponent,
    NavbarComponent,
    FriendSearchComponent,
    UserMenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{useHash: true}),
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ClickOutsideModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
