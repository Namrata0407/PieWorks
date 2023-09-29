import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  uniqueCityNames: string[] = [];
  selectedCity: string = '';
  selectedCityData: any = null;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((response: any[]) => {
      this.uniqueCityNames = Array.from(new Set(response.map((item: any) => item.name)));
    });
  }

  selectCity(cityName: string) {
    this.selectedCity = cityName;
  
    // Fetch the data and find the matching city inside the subscription
    this.dataService.getData().subscribe((data: any[]) => {
      const cityData = data.find((item: any) => item.name === cityName);
      this.selectedCityData = cityData;
    });
  }
  
}
