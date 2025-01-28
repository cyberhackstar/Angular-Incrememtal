import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  public baseUrl:string="https://ide-ccffffdefb321865798edccecfbdeone.premiumproject.examly.io/proxy/8080/api/bookings";

  constructor(private http:HttpClient) { }
  
  getBookings():Observable<Booking[]>{
    return this.http.get<Booking[]>(this.baseUrl);
  }

  getBookingByUserId(userId:number):Observable<Booking[]>{
    return this.http.get<Booking[]>(this.baseUrl+"/user/"+userId)
  }

  getBookingById(bookingId:number):Observable<Booking>{
    return this.http.get<Booking>(this.baseUrl+"/"+bookingId)
  }
  deleteBooking(bookingId:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"/"+bookingId)
  }
  addBooking(booking:any):Observable<Booking>{
    return this.http.post<Booking>(this.baseUrl,booking)
  }
  updateBooking(booking:Booking):Observable<Booking>{
    return this.http.put<Booking>(this.baseUrl+"/"+booking.bookingId,booking)
  }
  
}
