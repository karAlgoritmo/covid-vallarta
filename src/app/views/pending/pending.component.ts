import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MasterServiceService } from '../../services/master-service.service'
import { StoreService } from '../../services/store.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {
  // ***********************
  // variables
  // **********************
  // 
  public selected={}
  // 
  public loading = true
  //  
  public pending = []
  // form of login
  public information = new FormGroup({
    dateOfSample: new FormControl('', [Validators.required]),
    dateReport: new FormControl('', [Validators.required]),
    typeOfSample: new FormControl('', [Validators.required]),
    result: new FormControl('', [Validators.required]),
    referenceValue: new FormControl('', [Validators.required])
  })
  // ***********************
  // functions
  // **********************
  public getData = (): void => {
    this.loading = true
    this.master.sendGet('reports/pending', res => {
      this.loading = false
      if (res.status == 200) {

        this.pending = res.data.reports
      } else {
        Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
      }
    })
  }

  public save = (): void => {
    if (this.information.valid) {
      debugger
    }
  }
  // 
  public getSelected = (e): void => {

    this.selected=e.value;
    (document.getElementById('capture')as HTMLButtonElement).click()
  }
  // ***********************
  // life cycles
  // **********************
  constructor(private master: MasterServiceService) { }

  ngOnInit(): void {
    this.getData()
  }

}
