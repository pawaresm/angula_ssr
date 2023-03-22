import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SideComponent } from './side/side.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    NavComponent,
    SideComponent,
    FooterComponent
  ],
  imports: [BrowserModule,
    CommonModule,

  ],
  exports:[  NavComponent,
    SideComponent,
    FooterComponent,

  ]
})
export class ShareModule { }
