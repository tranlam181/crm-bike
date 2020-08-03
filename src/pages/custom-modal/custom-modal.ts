import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController,
} from "ionic-angular";
import { Api3cProvider } from "../../providers/api3c";
import moment from "moment";

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
  callDate: any;
  phone: String;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private api3c: Api3cProvider
  ) {
    this.callDate = navParams.get("data").call_date;
    this.phone = navParams.get("data").phone;
  }

  ionViewDidLoad() {
    this.isLoading = true;

    let startDate = this._getStartCallDate(this.callDate);
    let endDate = this._getEndCallDate(this.callDate);

    return this.api3c
      .get3CCallHistory(startDate, endDate, 1)
      .then((data: any) => {
        if (data && data.code && data.code === "OK") {
          let tmpArr = data.calls.filter((e) => {
            return e.caller == this.phone || e.caller.indexOf(this.phone) >= 0;
          });
          console.log(data.calls, tmpArr);

          this.reportData = tmpArr;
        }

        this.isLoading = false;
      })
      .catch((e) => {
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

  onOpenLink(link) {
    window.open(link, "_system", "location=yes");
  }

  _getStartCallDate(dateStr) {
    return (
      moment(dateStr, "DD/MM/YYYY").add(-3, "d").format("YYYY-MM-DDTHH:mm:ss") +
      "Z"
    );
  }

  _getEndCallDate(dateStr) {
    return (
      moment(dateStr, "DD/MM/YYYY").add(1, "d").format("YYYY-MM-DDTHH:mm:ss") +
      "Z"
    );
  }
}
