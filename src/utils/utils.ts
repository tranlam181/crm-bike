import { LoadingController, ToastController } from "ionic-angular";

export default class Utils {
    static showLoading(loadingCtrl:LoadingController, msg?: string) {
        let loading:any = loadingCtrl.create({
            spinner: 'dots',
            content: msg ? msg : 'Đang tải...'
          })
          loading.present()
          return loading
    }

    static showToast(toastCtrl: ToastController, msg: string) {
        let toast = toastCtrl.create({
          message: msg,
          duration: 3600,
          position: 'middle',
          showCloseButton: true,
          dismissOnPageChange: true
        });
        toast.present();
    }
}