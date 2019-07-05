import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  @ViewChild('gMaps') elementRef: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  map: any;
  from = '';
  to = '';
  isDirection = false;

  constructor(public navController: NavController) {
  }

  ionViewWillEnter() {
    this.initMap();
  }

  initMap() {
    console.log('initMap called');
    const latLong = new google.maps.LatLng(12.9330904, 77.614231);

    const mapOptions = {
      center: latLong,
      zoom: 19,
      mapType: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.elementRef.nativeElement, mapOptions);

  }

  getDirection() {
    if (this.from != '' && this.to != '') {
      this.startNavigation(this.from, this.to);
    } else {
      alert('Please enter valid detail');
    }
  }

  startNavigation(from: string, to: string) {

    const dService = new google.maps.DirectionsService;
    const dDisplay = new google.maps.DirectionsRenderer;

    dDisplay.setMap(this.map);
    dDisplay.setPanel(this.directionsPanel.nativeElement);

    dService.route({
        origin: from,
        destination: to,
        travelMode: google.maps.TravelMode.DRIVING
    }, (res, status) => {

        if (status === google.maps.DirectionsStatus.OK) {
          this.isDirection = true;
          dDisplay.setDirections(res);
        } else {
            alert(status);
        }

    });

}
}
