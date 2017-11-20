// angular stuff
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

// this application's components
import {AppComponent} from './app.component';
import {ListComponent} from './documents/list/list.component';
import {DetailComponent} from './documents/details/detail.component';
import {AddComponent} from './documents/add/add.component';

const appRoutes: Routes = [
  {path: 'list', component: ListComponent},
  {path: 'detail', component: DetailComponent},
  {path: 'detail/:id', component: DetailComponent},
  {path: 'add', component: AddComponent},
  {path: '**', redirectTo: '/list', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DetailComponent,
    AddComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
