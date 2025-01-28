import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public baseUrl:string="https://ide-ccffffdefb321865798edccecfbdeone.premiumproject.examly.io/proxy/8080/api"

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.baseUrl+"/user")
  }

  getUserById(userId:number):Observable<User>{
    return this.http.get<User>(this.baseUrl+"/user/"+userId)
  }

  deleteUser(userId:number):Observable<void>{
    return this.http.delete<void>(this.baseUrl+"/user/"+userId)
  }

  addUser(user:User):Observable<User>{
    return this.http.post<User>(this.baseUrl+"/register",user)
  }

  loginUser(user:any):Observable<User>{
    console.log(user);
    return this.http.post<User>(this.baseUrl+"/login",user)
  }

  updateUser(user:User):Observable<User>{
    return this.http.put<User>(this.baseUrl+"/user/"+user.userId,user)
  }

  constructor(private http:HttpClient) { }



  //for navbar
  // Tracks if the user is logged in
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  // Tracks the user's role ('Admin' or 'Passenger')
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRoleSubject.asObservable();

  // Tracks the user's name
  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  // Simulate login
  login(role: string, username: string) {
    this.isLoggedInSubject.next(true);
    this.userRoleSubject.next(role);
    this.usernameSubject.next(username);
  }

  // Simulate logout
  logout() {
    this.isLoggedInSubject.next(false);
    this.userRoleSubject.next(null);
    this.usernameSubject.next(null);
  }
}
