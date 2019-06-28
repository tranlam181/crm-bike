import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomerCallOutPage } from './customer-call-out';

@NgModule({
  declarations: [
    CustomerCallOutPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomerCallOutPage),
  ],
})
export class CustomerCallOutPageModule {}
