import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight.model';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  public baseUrl:string="https://ide-ccffffdefb321865798edccecfbdeone.premiumproject.examly.io/proxy/8080/api/flights";

  constructor(private http:HttpClient) { }
  
  getFlights():Observable<Flight[]>{
    return this.http.get<Flight[]>(this.baseUrl)
  }
  getFlightById(flightId:number):Observable<Flight>{
    return this.http.get<Flight>(this.baseUrl+"/"+flightId)
  }
  addFlight(flight:Flight):Observable<Flight>{
    return this.http.post<Flight>(this.baseUrl,flight)
  }
  updateFlight(flight):Observable<Flight>{
    return this.http.put<Flight>(this.baseUrl+"/"+flight.flightId,flight)
  }
  deleteFlight(flightId:number):Observable<void>{    
    return this.http.delete<void>(this.baseUrl+"/"+flightId)
  }
  
}
