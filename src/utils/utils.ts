import { LoadingController, ToastController, AlertController, Loading, Toast, Alert } from "ionic-angular";

export default class Utils {
    static showLoading(loadingCtrl:LoadingController, msg?: string) {
        let loading: Loading = loadingCtrl.create({
            spinner: 'dots',
            content: msg ? msg : 'Đang tải...'
          })
          loading.present()
          return loading
    }

    static showToast(toastCtrl: ToastController, msg: string) {
        let toast: Toast = toastCtrl.create({
          message: msg,
          duration: 3600,
          position: 'middle',
          showCloseButton: true,
          dismissOnPageChange: true
        });
        toast.present();
    }

    static showConfirmAlert(alertCtrl: AlertController, 
      title: string, 
      msg: string, 
      handler?) {
      let confirm: Alert = alertCtrl.create({
        title: title,
        message: msg,
        buttons: [         
          {
            text: 'OK',
            handler: handler
          },
          {
            text: 'Cancel'
          }
        ]
      });
      return confirm.present()
    }
}