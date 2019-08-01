import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { ApiCustomerProvider } from '../providers/api-customer';
import { HttpClientModule } from '@angular/common/http';
import { CustomerAddNewPage } from '../pages/customer-add-new/customer-add-new';
import { CustomerDetailPage } from '../pages/customer-detail/customer-detail';
import { ApiCategoryProvider } from '../providers/api-category';
import { TabComingPage } from '../pages/customer-list/tab-coming/tab-coming';
import { TabPassivePage } from '../pages/customer-list/tab-passive/tab-passive';
import { TabBirthdayPage } from '../pages/customer-list/tab-birthday/tab-birthday';
import { TabAllPage } from '../pages/customer-list/tab-all/tab-all';
import { CustomerEditPage } from '../pages/customer-edit/customer-edit';
import { MaintancePage } from '../pages/maintance/maintance';
import { CalloutPage } from '../pages/callout/callout';

import { IonicSelectableModule } from "ionic-selectable";
import { TabActivePage } from '../pages/customer-list/tab-active/tab-active';
import { TabAfterBuyDatePage } from '../pages/customer-list/tab-after-buy-date/tab-after-buy-date';
import { TabAfterMaintanceDatePage } from '../pages/customer-list/tab-after-maintance-date/tab-after-maintance-date';
import { FeedbackAfterBuyPage } from '../pages/feedback-after-buy/feedback-after-buy';
import { FeedbackAfterMaintancePage } from '../pages/feedback-after-maintance/feedback-after-maintance';
import { PipesModule } from '../pipes/pipes.module';
import { SchedulePage } from '../pages/schedule/schedule';
import { CustomerImportPage } from '../pages/customer-import/customer-import';
import { IonicStorageModule } from '@ionic/storage';
import { ApiAuthenticateProvider } from '../providers/api-authenticate';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';

@NgModule({
  declarations: [
    MyApp,
    CustomerListPage,
    CustomerAddNewPage,
    CustomerDetailPage,
    CustomerEditPage,
    CustomerImportPage,
    MaintancePage,
    CalloutPage,
    TabComingPage,
    TabPassivePage,
    TabActivePage,
    TabBirthdayPage,
    TabAllPage,
    TabAfterBuyDatePage,
    TabAfterMaintanceDatePage,
    FeedbackAfterBuyPage,
    FeedbackAfterMaintancePage,
    SchedulePage,
    LoginPage,
    LogoutPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicSelectableModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CustomerListPage,
    CustomerAddNewPage,
    CustomerDetailPage,
    CustomerEditPage,
    CustomerImportPage,
    MaintancePage,
    CalloutPage,
    TabComingPage,
    TabPassivePage,
    TabActivePage,
    TabBirthdayPage,
    TabAllPage,
    TabAfterBuyDatePage,
    TabAfterMaintanceDatePage,
    FeedbackAfterBuyPage,
    FeedbackAfterMaintancePage,
    SchedulePage,
    LoginPage,
    LogoutPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiCustomerProvider,
    ApiCategoryProvider,
    ApiAuthenticateProvider
  ]
})
export class AppModule {}
