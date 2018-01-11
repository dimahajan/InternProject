import { Component,ViewChild } from '@angular/core';
import { NavController,Slides ,Platform,ToastController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {DomSanitizer} from '@angular/platform-browser';
import { Network } from '@ionic-native/network';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AboutPage } from '../about/about';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  myList : any[];
  flag : boolean;
  disabled1: boolean;
  disabled2: boolean;
  @ViewChild(Slides) slides : Slides;

  constructor(private diagnostic: Diagnostic,public platform: Platform,private toastCtrl: ToastController,private network: Network,public http:Http,public _DomSanitizer: DomSanitizer,public navCtrl: NavController,private camera:Camera) {
    this.myList=[[false,true,true,"","",true,""]];
    this.flag=false;
    this.disabled1=false;
    this.disabled1=false;
    this.platform.ready().then(() => {
      let successCallback = (isAvailable) => {
        this.disabled1=false;
      };
      let errorCallback = (e) => {
        this.disabled1=true;
        let toast = this.toastCtrl.create({
          message: 'This Divise has no Camera=>'+e,
          duration: 5000,
          position: 'middle',
          cssClass: "toast",
        });
        toast.present();
      };
      this.diagnostic.isCameraAvailable().then(successCallback).catch(errorCallback);
      this.network.onConnect().subscribe(data => {
        if(this.flag){
          let toast = this.toastCtrl.create({
            message: 'network connected successfully',
            duration: 5000,
            position: 'middle',
            cssClass: "toast",
          });
          toast.present();
          this.myList = [this.myList[0],[true,false,true,"","",false,""]]
          this.callApi();
        }
      }, error => console.error(error));

      this.network.onDisconnect().subscribe(data => {
        let toast = this.toastCtrl.create({
          message: 'network is not connected plese connect to network',
          duration: 5000,
          position: 'middle',
          cssClass: "toast",
        });
        toast.present();
      }, error => console.error(error));
    });
  }

  about(){
    this.navCtrl.push(AboutPage);
  }
callApi(){
  if(this.network.type!='none'){
    setTimeout(() => { this.slides.slideTo(1,500);},2000);
    let headers = new Headers({
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json'
     } );
    //headers.append('Content-Type','application/json');
    let body= {
      img : this.myList[0][4]
    };
    this.http.post("https://192.168.14.123:5001/forApp",JSON.stringify(body),{headers:headers})
    .map(res=> res.json())
    .subscribe(data=>{
      let res1  = data.result.split('#');
      this.myList[1] = [true,true,false,res1[2],'data:image/jpeg;base64,'+res1[0],false,res1[1]];
    },(e)=>{
      this.myList=[[false,true,true,"","",true,""]];
      let toast = this.toastCtrl.create({
        message: 'server not available now plese try after some time ',
        duration: 5000,
        position: 'middle',
        cssClass: "toast",
      });
      toast.present();
    });

  }else{
    let toast = this.toastCtrl.create({
      message: 'network is not connected plese connect to network',
      duration: 5000,
      position: 'middle',
      cssClass: "toast",
    });
    toast.present();
    this.myList = [this.myList[0]]
    this.flag=true;
  }
}
browsePhoto(){
   const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    }
    this.camera.getPicture(options).then((imageData) => {
      this.slides.slideTo(0,0);
        this.myList = [[true,true,false,"Uploade Image",'data:image/jpeg;base64,' + imageData,true,""],[true,false,true,"","",false,""]];
        this.callApi();
    }, (err) => { });
  }
takePhoto(){
    const options: CameraOptions = {
      cameraDirection:1,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum:true
    }
    this.camera.getPicture(options).then((imageData) => {
    this.slides.slideTo(0,0);
    this.myList = [[true,true,false,"Camera Image",'data:image/jpeg;base64,' + imageData,true,""],[true,false,true,"","",false,""]];
    this.callApi();
    }, (err) => {});
   }
}
