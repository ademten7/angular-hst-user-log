import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialDesignsModule } from './material-designs/material-designs.module';
import { NavbarComponent } from './navbar/navbar.component';
import { UserLogComponent } from './user-log/user-log.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { ActionsService } from './services/actions.service';
import { FilterActionsPipe } from './pipes/filter-actions.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserLogComponent,
    DialogComponent,
    FilterActionsPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialDesignsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ApiService, ActionsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
