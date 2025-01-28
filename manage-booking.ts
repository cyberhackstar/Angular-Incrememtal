import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/service/booking.service';


@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {
  bookings:Booking[] = []
  errorMessage:string
  
  ngOnInit(): void {
    this.loadBookings()
  }
  constructor(private bookingService:BookingService){}
  loadBookings(){
    this.bookingService.getBookings().subscribe(
      data=>this.bookings=data
    )
  }
  updateBookingStatus(bookingId:number,status:string){
    this.bookingService.getBookingById(bookingId).subscribe(
      booking=>{
      booking.status=status;
      this.bookingService.updateBooking(booking).subscribe(
        updatedBooking=>{
          this.loadBookings();
          console.log('Updated status')
        }
      )

      }
    )


  }
}
