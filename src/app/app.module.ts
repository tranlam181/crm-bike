import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { ApiCustomerProvider } from '../providers/api-customer/api-customer';
import { HttpClientModule } from '@angular/common/http';
import { CustomerAddNewPage } from '../pages/customer-add-new/customer-add-new';
import { CustomerDetailPage } from '../pages/customer-detail/customer-detail';
import { ApiCategoryProvider } from '../providers/api-category/api-category';

@NgModule({
  declarations: [
    MyApp,
    CustomerListPage,
    CustomerAddNewPage,
    CustomerDetailPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CustomerListPage,
    CustomerAddNewPage,
    CustomerDetailPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiCustomerProvider,
    ApiCategoryProvider
  ]
})
export class AppModule {}
