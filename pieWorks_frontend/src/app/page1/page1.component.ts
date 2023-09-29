import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {
  uniqueCityNames: string[] = [];
  selectedCity: string = 'Rewa'; // Set Rewa as the default selected city
  selectedCityData: any = null;
  selectedCityWeatherImage: string = ''; // Weather image URL

  // Define a mapping of weather condition codes to image URLs
  weatherIcons: { [key: string]: string } = {
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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((response: any[]) => {
      this.uniqueCityNames = Array.from(new Set(response.map((item: any) => item.name)));
      
      // Select Rewa by default
      this.selectCity(this.selectedCity);
    });
  }

  selectCity(cityName: string) {
    this.selectedCity = cityName;
  
    // Fetch the data and find the matching city inside the subscription
    this.dataService.getData().subscribe((data: any[]) => {
      console.log('Data for', cityName, data); // Add this line for debugging
      const cityData = data.find((item: any) => item.name === cityName);
      this.selectedCityData = cityData;
  
      // Update the weather image URL
      this.selectedCityWeatherImage = this.getWeatherImage(cityData.weather[0].icon);
    });
  }
  

  getWeatherImage(weatherConditionCode: string): string {
    // Get the image URL based on the provided weather condition code
    const imageUrl = this.weatherIcons[weatherConditionCode] || this.weatherIcons['default'];

    // Return the image URL
    return imageUrl;
  }

  getTemperatureImage(): string {
    // Get the image URL for temperature
    return 'https://tse1.mm.bing.net/th?id=OIP.Se85UPRy6_ZlY2gKoglKMwHaHa&pid=Api&P=0&h=180';
  }
}
