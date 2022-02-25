import { Component, OnInit } from '@angular/core';
import { MasterServiceService } from '../../services/master-service.service'
import { StoreService } from '../../services/store.service'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  // ***********************
  // variable
  // **********************
  // field
  public fieldFilters = ['firstName', 'lastName', 'passportNo', 'email',]
  // 
  public filter: string = ''
  // 
  public loading:boolean=true
  // 
  public captured=[]
   // 
   public allCaptured=[]
   // 
  public selected = {}
// ***********************
  // functions
  // **********************
  // get all pending data
  public getData = (): void => {
    this.loading = true
    this.master.sendGet('reports/captured', res => {
      this.loading = false
      if (res.status == 200) {
        this.captured = res.data.reports
        this.allCaptured = res.data.reports
      } else {
        Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
      }
    })
  }
  // select a pending card
  public getSelected = (e, index): void => {
    this.selected['index'] = index
    this.selected = e.value;
    if(e.isDelete){
      this.delete(this.selected['_id'])
    }else{
      (document.getElementById('capture') as HTMLButtonElement).click()
    }
  }
  // search pending data
  public search = (word: string, event) => {
    if (event.key == 'Enter') {
      word = word.toLowerCase()
      for (let index = 0; index < this.fieldFilters.length; index++) {
        this.captured = this.allCaptured.filter(el => (el['patientId'][this.fieldFilters[index]].toLowerCase()).indexOf(word) >= 0 ||
          word.indexOf((el['patientId'][this.fieldFilters[index]]).toLowerCase()) >= 0)
        if (this.captured.length > 0) {
          return
        }
      }
    }
  }
  // quest delete
  public delete = (id: number): void => {
    Swal.fire({
      title: 'Are you sure to delete this capture report?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Replace`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.deleteHard(id)
      } else if (result.isDenied) {
        this.deleteSoft(id)
      }
    })
  }
  // delete
  public deleteHard = (id) => {
    this.loading = true
    this.master.sendDelete('reports/delete',id, res => {
        this.loading = false
        if (res.status == 200) {
          this.captured.splice(this.selected['index'], 1);
          Swal.fire({ title: 'Delete Success!', text: res.data.message, icon: 'success', confirmButtonText: 'Ok' })
        } else {
          Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
        }
      })
  }
  // delete
  public deleteSoft = (id) => {
    this.loading = true
    this.master.sendPost('reports/soft-delete',{id:id}, res => {
        this.loading = false
        if (res.status == 200) {
          this.captured.splice(this.selected['index'], 1);
          Swal.fire({ title: 'Delete Success!', text: res.data.message, icon: 'success', confirmButtonText: 'Ok' })
        } else {
          Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
        }
      })
  }
  // ***********************
  // life  cycles
  // **********************
  constructor(private master: MasterServiceService, private store: StoreService) { }

  ngOnInit(): void {
    this.getData()
  }

}
