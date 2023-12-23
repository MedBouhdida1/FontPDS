import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { NoDataComponent } from './no-data/no-data.component';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    SpinnerComponent,
    NoDataComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [SidebarComponent, NavbarComponent, FooterComponent, SpinnerComponent, NoDataComponent]
})
export class SharedModule { }
