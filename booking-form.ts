import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/models/flight.model';
import { BookingService } from 'src/app/service/booking.service';
import { FlightService } from 'src/app/service/flight.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css']
})
export class BookingFormComponent implements OnInit {
  bookingForm:FormGroup
  flight:Flight
  constructor(private fb:FormBuilder,private service:BookingService,private route:ActivatedRoute,private flightService:FlightService){
    this.bookingForm = this.fb.group({
      flightNumber:[''],
      bookingDate:['',Validators.required],
      numberOfPassengers:[0,Validators.required],
    })
  }
  addNewBooking(){
    if(this.bookingForm.valid){
      let booking = {
        flight:{
          flightNumber: this.flight.flightNumber
        },
        user:{
         userId:+sessionStorage.getItem('userId')
        },
          bookingDate:this.bookingForm.value.bookingDate,
          numberOfPassengers:+this.bookingForm.value.numberOfPassengers,
        }
        console.log(booking);
        this.service.addBooking(booking).subscribe((result)=>{
          console.log(result);
          this.bookingForm.reset();
          
        },(error)=>{
          console.log(error);
        })
    }
  }
  ngOnInit(): void {
    const flightId=+this.route.snapshot.paramMap.get('id');
    this.flightService.getFlightById(flightId).subscribe(
      data=>{this.flight=data;console.log(this.flight)
        this.bookingForm.setValue({
          flightNumber:this.flight.flightNumber,
          bookingDate:'',
          numberOfPassengers:0
        })
      }
    )
    
  }

}
