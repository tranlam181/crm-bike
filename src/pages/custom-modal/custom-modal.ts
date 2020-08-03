import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { Api3cProvider } from "../../providers/api3c";

/**
 * Generated class for the CustomModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-custom-modal",
  templateUrl: "custom-modal.html",
})
export class CustomModalPage {
  reportData: any;
  isLoading: boolean = false;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private api3c: Api3cProvider
  ) {
    console.log("UserId", navParams.get("data"));
  }

  ionViewDidLoad() {
    this.isLoading = true;

    return this.api3c
      .get3CCallHistory("2020-07-30T00:00:00Z", "2020-07-31T00:00:00Z", 1)
      .then((data: any) => {
        if (data && data.code && data.code === "OK") {
          this.reportData = data.calls;
        }

        this.isLoading = false;
      })
      .catch((e) => {
        console.error(e);
        this.isLoading = false;
      });
  }

  dismissModal() {
    let data = { foo: "bar" };
    this.viewCtrl.dismiss(data);
  }

  closeModal() {
    this.navCtrl.pop();
  }
}
