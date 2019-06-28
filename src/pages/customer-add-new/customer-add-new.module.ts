import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerAddNewPage } from './customer-add-new';

@NgModule({
  declarations: [
    CustomerAddNewPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerAddNewPage),
  ],
})
export class CustomerAddNewPageModule {}
