import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { MasterServiceService } from '../../services/master-service.service'
import { StoreService } from '../../services/store.service'
import Swal from 'sweetalert2'
@Component({
  selector: 'card-captured',
  templateUrl: './card-history.component.html',
  styleUrls: ['./card-history.component.scss']
})
export class CardHistoryComponent implements OnInit {
  // *****************
  // variables
  // *****************
  @Input() data = {}
  // 
  @Output() setData$:EventEmitter<object>=new EventEmitter()
  // *****************
  // functions
  // *****************
  public select=():void=>{
    
    this.setData$.emit({value:this.data})
  }
  // *****************
  // life cycles
  // *****************

  constructor(private master: MasterServiceService, private store: StoreService) { 

  }

  ngOnInit(): void {
  }

}
