import { Component, OnInit,SimpleChanges } from '@angular/core';
import { MasterServiceService } from '../../services/master-service.service'
import { StoreService } from '../../services/store.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  // ***********************
  // variables
  // **********************
  // 
  public rangeSelected='month'
  // 
  public data:any={}
  // 
  public loading:boolean=false
  // ***********************
  // functions
  // **********************
  public getData=(range:string)=>{
    this.loading=true
    this.master.sendGet('analytics/captures/'+range,res=>{
      this.loading=false
      if(res){
        if(res.status==200){
          this.data=res.data
          // 
          
          this.data['positives']=this.data['stepChart'].filter(el=>el['result']=='positive')
          this.data['negatives']=this.data['stepChart'].filter(el=>el['result']=='negative')
          
        }else{
          Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
        }
      }else{
        Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
      }
    })
  }
  // change range
  public changeRange=():void=>{
    this.getData(this.rangeSelected)
  }
  // 

  // ***********************
  // life cycles
  // **********************

  constructor(private master: MasterServiceService) { }

  ngOnInit(): void {
    this.getData(this.rangeSelected)
  }


}
