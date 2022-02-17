import { Injectable } from '@angular/core';
import axios from 'axios'
import Swal from 'sweetalert2'
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
      if (res) {
        callback(res)
      }
    }).catch(error => {
      Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error' })
    })
  }

  public sendPut = (action, params, callback) => {
    axios.put(`${this.host}${action}`, params, this.headers).then(res => {
      if (res) {
        callback(res)
      }
    }).catch(error => {
      Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error' })
    })
  }

  public sendDelete = (action, params, callback) => {
    axios.delete(`${this.host}${action}/${params}`,  this.headers).then(res => {
      if (res) {
        callback(res)
      }
    }).catch(error => {
      Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error' })
    })
  }

  public sendPatch = (action, params, callback) => {
    axios.patch(`${this.host}${action}`, params, this.headers).then(res => {
      if (res) {
        callback(res)
      }
    }).catch(error => {
      Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error' })
    })
  }

  public sendGet = (action, callback) => {
    axios.get(`${this.host}${action}`, this.headers).then(res => {
      callback(res)
    }).catch(error => {
      Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error' })
    })
  }
  constructor() {
    this.token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
    this.headers = { headers: { 'Content-Type': 'application/json', "Authorization": this.token } }

  }
}
