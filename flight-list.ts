import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/service/flight.service';
import { UtilityService } from 'src/app/service/utility.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights:Flight[]=[];
  errorMessage:string;
  userRole:string;
   ngOnInit(): void {
    this.loadFlights()
  }
  constructor(private flightService:FlightService,public utilityService: UtilityService,private router:Router){}
  loadFlights(){
    this.flightService.getFlights().subscribe(
      data=>this.flights=data,
      error=>window.alert("No Flights are available")
    )

  }
  updateFlight(id:number):void{
    this.router.navigate(['/add-flight',id])
  }
  deleteFlight(id:number):void{
    this.flightService.deleteFlight(id).subscribe()
    this.loadFlights()
  }
  navigateToBooking(flightId:number){
    this.router.navigate(['/book-form',flightId])
  }
  

}
