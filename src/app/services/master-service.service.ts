import { Injectable } from '@angular/core';
import axios from 'axios'
@Injectable({
  providedIn: 'root'
})
export class MasterServiceService {
  // ********************
  // variales
  // *******************
  public token = ''
  public headers: object = { headers: { 'Content-Type': 'application/json', "Authorization": this.token } }
  private host: string = "http://20.0.0.127:8080/"
  // ********************
  // functions
  // *******************

  public sendPost = (action, params, callback) => {
    
    axios.post(`${this.host}${action}`, params, this.headers).then(res => {
      
      if(res){
        callback(res)
      }
    }).catch(error => {
      
    })
  }

  public sendGet = (action,  callback) => {
    
    axios.get(`${this.host}${action}`, this.headers).then(res => {
      callback(res)
    }).catch(error => {
      
    })
  }
  constructor() { 
    this.token=localStorage.getItem('token')?localStorage.getItem('token'):''
    this.headers = { headers: { 'Content-Type': 'application/json', "Authorization": this.token } }
    
  }
}
