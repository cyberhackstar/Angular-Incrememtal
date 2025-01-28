import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private router: Router) { }

  isLoggedIn():boolean{
    let email = sessionStorage.getItem("email")
    console.log(email)
    if(email==null || email==='') 
        return false
      else
      return true
  }

  isAdmin():boolean{  return sessionStorage.getItem("role")==='Admin'}

  isUser():boolean {  return sessionStorage.getItem("role")==='User' }

  logout(){
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }
}
