import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public login = {}
  public user=null
  
  constructor() {

  }
}
