import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Flight } from 'src/app/models/flight.model';
import { FlightService } from 'src/app/service/flight.service';

@Component({
  selector: 'app-add-flight',
  templateUrl: './add-flight.component.html',
  styleUrls: ['./add-flight.component.css']
})
export class AddFlightComponent implements OnInit {
  flight:Flight
  flightId:number=0
  flightForm:FormGroup
  isEditing:boolean=false
  constructor(private router:Router,private route:ActivatedRoute,private service:FlightService,private fb:FormBuilder){
    this.flightForm = this.fb.group({
      flightNumber:['',Validators.required],
      airline:['',Validators.required],
      departureLocation:['',Validators.required],
      arrivalLocation:['',Validators.required],
      departureTime:['',Validators.required],
      arrivalTime:['',Validators.required],
      price:[0,Validators.required]
    })
  }
  addNewFlight(){
  
    if(this.flightForm.valid){


      this.flight = {
        flightNumber:this.flightForm.value.flightNumber,
        airline:this.flightForm.value.airline,
        departureLocation:this.flightForm.value.departureLocation,
        arrivalLocation:this.flightForm.value.arrivalLocation,
        departureTime:this.flightForm.value.departureTime,
        arrivalTime:this.flightForm.value.arrivalTime,
        price:this.flightForm.value.price
      }


      if(this.flightId==0) {
        this.service.addFlight(this.flight).subscribe((result)=>{
          console.log(result)
          },(error)=>{
            alert("Flight not added"+error)
         })
      this.flightForm.reset()
      this.router.navigate(['/flight-list'])
    }
    else{
      this.flight.flightId=this.flightId
      this.service.updateFlight(this.flight).subscribe((result)=>{
        console.log(result)
        },(error)=>{
          alert("Flight not updated")
       })
    this.flightForm.reset()
    this.router.navigate(['/flight-list'])
    }
  }
}
  closeModal(){
    alert("Flight added successfully!")
    this.router.navigate(['/flight-list'])
  }
  ngOnInit(): void {
    this.flightId = +this.route.snapshot.paramMap.get('id')
    if(this.flightId!=0){
      this.service.getFlightById(this.flightId).subscribe((data)=>{
        this.flight = data
        this.flightForm.patchValue({...this.flight})
      })
    }
  }

}
