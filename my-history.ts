import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking.model';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-my-history',
  templateUrl: './my-history.component.html',
  styleUrls: ['./my-history.component.css']
})
export class MyHistoryComponent implements OnInit {
  bookingHistory:Booking[];
  constructor(private bookingService:BookingService) { }
  loadBookings(){
    this.bookingService.getBookingByUserId(parseInt(sessionStorage.getItem('userId'))).subscribe(
      data=>this.bookingHistory=data
    )
  }
  ngOnInit(): void {
    this.loadBookings()

  }

}
