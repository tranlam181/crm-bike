import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { HomePage } from '../pages/home/home';
import { CustomerListPage } from '../pages/customer-list/customer-list';
import { CustomerAddNewPage } from '../pages/customer-add-new/customer-add-new';
import { CustomerImportPage } from '../pages/customer-import/customer-import';
import { LogoutPage } from '../pages/logout/logout';
import { ApiAuthenticateProvider } from '../providers/api-authenticate';
import { LoginPage } from '../pages/login/login';
import EVENTS from '../config/EVENTS';
import { CalloutReportPage } from '../pages/callout-report/callout-report';
import { MaintanceReportPage } from '../pages/maintance-report/maintance-report';
import { CustomerExportPage } from '../pages/customer-export/customer-export';
import { FeedbackAfterBuyReportPage } from '../pages/feedback-after-buy-report/feedback-after-buy-report';
import { FeedbackAfterMaintanceReportPage } from '../pages/feedback-after-maintance-report/feedback-after-maintance-report';

// RxJS
import { ReplaySubject } from "rxjs/ReplaySubject";
// import { ArrayObservable } from "rxjs/observable/ArrayObservable";
// Models
import { SideMenuContentComponent } from '../components/side-menu-content/side-menu-content.component';
import { SideMenuSettings } from '../components/side-menu-content/models/side-menu-settings';
import { MenuOptionModel } from '../components/side-menu-content/models/menu-option-model';
import { SettingPage } from '../pages/setting/setting';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  activePage: any
  pages: Array<{title: string, component: any, icon: string}>;
  logInPage: {title: string, component: any, icon: string};
  isLoggedIn: boolean = false
  userInfo: any

  // Get the instance to call the public methods
  @ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;
  // Options to show in the SideMenuComponent
	public options: Array<MenuOptionModel>;
	// Settings for the SideMenuComponent
	public sideMenuSettings: SideMenuSettings = {
		accordionMode: true,
		showSelectedOption: true,
		selectedOptionClass: 'selected-menu',
    subOptionIndentation: {
      md: '32px',
      ios: '48px',
      wp: '32px'
    }
  };
  private unreadCountObservable: any = new ReplaySubject<number>(0);

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public menuCtrl: MenuController,
    private apiAuthenticate: ApiAuthenticateProvider,
    private event: Events ) {

    this.initializeApp();

    this.logInPage = { title: 'Đăng nhập', component: LoginPage, icon: 'log-in'}
  }

  ngOnDestroy() {
    this.event.unsubscribe(EVENTS.USER_LOG_CHANGED)
    this.event.unsubscribe(EVENTS.USER_UNAUTHORIZED)
  }

  _load() {
    this.apiAuthenticate.checkLoggedIn().then(ok => {
      this.isLoggedIn = ok
      if (ok) {
        this.userInfo = this.apiAuthenticate.userInfo
      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      // subscriber event
      this.event.subscribe(EVENTS.USER_LOG_CHANGED, () => {
        this._load()
      })
      this.event.subscribe(EVENTS.USER_UNAUTHORIZED, () => {
        this.apiAuthenticate.logout().then(data => {
          this._load()
          this.nav.setRoot(LoginPage)
        })
      })
      // this.splashScreen.hide();
      this._load()

      this.initializeOptions();
    });

    // Change the value for the batch every 5 seconds
		setInterval(() => {
			this.unreadCountObservable.next(Math.floor(Math.random() * 10));
		}, 5000);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page
  }


  // menu
  private initializeOptions(): void {
		this.options = new Array<MenuOptionModel>();
		// Load simple menu options
    // ------------------------------------------
    this.options.push(...[
      { displayName: 'Trang chủ', component: HomePage, iconName: 'home', selected: true },
      { displayName: 'DS Khách hàng', component: CustomerListPage, iconName: 'people' },
      { displayName: 'Thêm Khách hàng', component: CustomerAddNewPage, iconName: 'add' },
      { displayName: 'Báo cáo', subItems: [
        { displayName: 'Báo cáo ý kiến mua xe', component: FeedbackAfterBuyReportPage, iconName: 'stats' },
        { displayName: 'Báo cáo ý kiến dịch vụ', component: FeedbackAfterMaintanceReportPage, iconName: 'stats' },
        { displayName: 'Báo cáo gọi ra', component: CalloutReportPage, iconName: 'stats' },
        { displayName: 'Báo cáo KH đến', component: MaintanceReportPage, iconName: 'stats' },
      ]},
      { displayName: 'Import Khách hàng', component: CustomerImportPage, iconName: 'cube' },
      { displayName: 'Export Khách hàng', component: CustomerExportPage, iconName: 'cube' },
      { displayName: 'Cài đặt', component: SettingPage, iconName: 'settings' },
      { displayName: 'Thoát', component: LogoutPage, iconName: 'log-out' }
    ])
	}

	public selectOption(option: MenuOptionModel): void {
		this.menuCtrl.close().then(() => {

			if (option.custom && option.custom.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.custom && option.custom.isLogout) {
				this.presentAlert('You\'ve clicked the logout option!');
			} else if(option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url, '_blank');
			} else {
				// Redirect to the selected page
				this.nav.setRoot(option.component || HomePage, { 'title': option.displayName });
			}
		});
	}

	public collapseMenuOptions(): void {
		// Collapse all the options
		this.sideMenu.collapseAllOptions();
	}

	public presentAlert(message: string): void {
		console.log(message);
	}
}
