import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit {
  cityNames: string[] = [];
  selectedCity: string = 'Rewa'; // Set Rewa as the default selected city
  filteredData: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((data: any[]) => {
      this.cityNames = Array.from(new Set(data.map((item: any) => item.name)));
      
      // Load data for the default selected city (Rewa)
      this.filterDataByCity(this.selectedCity);
    });
  }

  filterDataByCity(cityName: string) {
    this.selectedCity = cityName;
    this.dataService.getData()
      .pipe(
        map((data: any[]) => data.filter((item: any) => item.name === cityName))
      )
      .subscribe((filteredData: any[]) => {
        this.filteredData = filteredData;
      });
  }

  getWeatherImage(weatherConditionCode: string): string {
    const weatherIcons: { [key: string]: string } = {
      '01d': 'https://tse4.mm.bing.net/th?id=OIP.caMCZiaHtvDN--2g4uu2kQHaHa&pid=Api&P=0&h=180',
      '01n': 'https://tse2.mm.bing.net/th?id=OIP.cNL7yurxDgyBNxQo3zbWNwHaHa&pid=Api&P=0&h=180',
      '02d': 'https://tse4.mm.bing.net/th?id=OIP.q31GHonjjyH46EUf3yYNgAHaHa&pid=Api&P=0&h=180',
      '02n': 'https://tse2.mm.bing.net/th?id=OIP.3YNv-FjXmNjxjSqjxA4eBwAAAA&pid=Api&P=0&h=180',
      '03d': 'https://tse3.mm.bing.net/th?id=OIP.gdzN-7hdP0DK6Q6c7Q2WdgHaHa&pid=Api&P=0&h=180',
      '03n': 'https://tse4.mm.bing.net/th?id=OIP.WPtBRS9frvj93PYkBAB_3QAAAA&pid=Api&P=0&h=180',
      '04d': 'https://tse4.mm.bing.net/th?id=OIP.p-tzST2S2IrS6907_B78CwAAAA&pid=Api&P=0&h=180',
      '04n': 'https://tse1.mm.bing.net/th?id=OIP.EWZMbddFE5iW9tjUWOOQfQAAAA&pid=Api&P=0&h=180',
      '09d': 'https://tse4.mm.bing.net/th?id=OIP.1NsY2ibzwRLxkL4FymxVJwHaHa&pid=Api&P=0&h=180',
      '09n': 'https://tse2.mm.bing.net/th?id=OIP.w8hDb3jLzW0yrQPgqvwIAAAAAA&pid=Api&P=0&h=180',
      // Default image URL
      'default': 'https://tse2.mm.bing.net/th?id=OIP.ggrVidbwPd0SIvheY2zZJwHaHa&pid=Api&P=0&h=180',
    };

    // Get the URL for the provided weather condition code or use a default URL
    const imageUrl = weatherIcons[weatherConditionCode] || weatherIcons['default'];
    return imageUrl;
  }
}
