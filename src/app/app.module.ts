import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './feed/navbar/navbar.component';
import { FeedComponent } from './feed/feed.component';
import { InteractComponent } from './interact/interact.component';
import { PublishComponent } from './publish/publish.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router'
import { ErrorPageComponent } from './error-page/error-page.component';
import { ViewPostComponent } from './feed/view-post/view-post.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MainFeedComponent } from './main-feed/main-feed.component';

const routes: Routes=[
  {path: '', component: HomeComponent},
  {path: 'feed', component: MainFeedComponent},
  {path: 'feed/:uid', component: FeedComponent},
  {path: 'feed/:uid/:category', component: FeedComponent},
  {path: 'view/:postID', component: ViewPostComponent},
  {path: 'interact/:uid', component: InteractComponent},
  {path: 'publish/:uid', component: PublishComponent},
  {path: '**', component: ErrorPageComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FeedComponent,
    InteractComponent,
    PublishComponent,
    HomeComponent,
    ErrorPageComponent,
    ViewPostComponent,
    MainFeedComponent
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
