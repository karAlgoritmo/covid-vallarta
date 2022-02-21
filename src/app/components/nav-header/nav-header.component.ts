import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service'
import { MasterServiceService } from '../../services/master-service.service'
@Component({
  selector: 'nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {

  getData=()=>{
    this.master.sendGet('auth/user',res=>{
      if(res.status==200){
        this.store.user=res.data.userData
      }
    })
  }
  // 
  public logout=():void=>{
    localStorage.removeItem('token')
    location.href=""
  }
  constructor(private master:MasterServiceService,public store:StoreService) { }

  ngOnInit(): void {
    
    if(this.store.user==null){
      this.getData()
    }
  }

}
