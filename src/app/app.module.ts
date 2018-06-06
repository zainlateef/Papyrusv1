import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Pages/user-page/navbar/navbar.component';
import { FeedComponent } from './Pages/user-page/feed/feed.component';
import { InteractComponent } from './Pages/interact/interact.component';
import { PublishComponent } from './Pages/publish/publish.component';
import { HomeComponent } from './Pages/home/home.component';
import { RouterModule, Routes } from '@angular/router'
import { ErrorPageComponent } from './Pages/error-page/error-page.component';
import { ViewPostComponent } from './Pages/view-post/view-post.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MainFeedComponent } from './Pages/main-feed/main-feed.component';
import { UserPageComponent } from './Pages/user-page/user-page.component';

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
