import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './user-page/navbar/navbar.component';
import { FeedComponent } from './user-page/feed/feed.component';
import { InteractComponent } from './interact/interact.component';
import { PublishComponent } from './publish/publish.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router'
import { ErrorPageComponent } from './error-page/error-page.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MainFeedComponent } from './main-feed/main-feed.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes=[
  {path: '', component: HomeComponent},
  {path: 'feed', component: MainFeedComponent},
  {path: 'feed/:uid', component: UserPageComponent},
  {path: 'feed/:uid/:category', component:UserPageComponent},
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
    NavbarComponent,
    FeedComponent,
    InteractComponent,
    PublishComponent,
    ViewPostComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{useHash: true}),
    AngularFontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
