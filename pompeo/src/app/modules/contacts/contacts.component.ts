import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DynamicScriptLoaderService } from 'src/app/service/dynamic-script-loader.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export default class ContactsComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) map!: ElementRef;
  google: google.maps.Map | undefined;

  constructor(
    private readonly dynamicScriptLoaderService: DynamicScriptLoaderService
  ) {}

  ngAfterViewInit(): void {
    this.loadScripts();
  }

  initMap() {
    // The location of New York
    const newYork = {
      lat: 40.76794387741631,
      lng: -73.98132433068027,
    };

    // The map, centered at New York
    this.google = new google.maps.Map(this.map.nativeElement, {
      center: newYork,
      zoom: 18,
      mapId: '45e6069b743e9903',
    } as google.maps.MapOptions);
    // The marker, positioned at New York
    const marker = new google.maps.Marker({
      position: newYork,
      map: this.google,
    });
  }

  private loadScripts() {
    this.dynamicScriptLoaderService
      .load('google')
      .then(() => {
        this.initMap();
      })
      .catch((error) => console.log(error));
  }
}
