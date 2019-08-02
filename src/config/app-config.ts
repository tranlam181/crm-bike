export default class AppConfig {
    static baseUrl = 'http://localhost:9237/crm/api'
    static baseUrlAuth = 'http://localhost:9237/crm/auth'
    // static baseUrl = 'https://c3.mobifone.vn/crm/api'
    // static baseUrlAuth = 'https://c3.mobifone.vn/crm/auth'
    static hotline3C = '0768511234'
    static baseUrl3C = `https://3c-web1.mobifone.vn/${AppConfig.hotline3C}/c2call?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpcHBob25lIjoiNDIwMV8xIn0.SnemWC3ywSO1mDWu_EcLKlSzpAZnHi395m9Z7TeD_ZM&number=`
}