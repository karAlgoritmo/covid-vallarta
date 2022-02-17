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
  public filter: string = ''
  // 
  public selected = {}
  // 
  public loading = true
  //  
  public pending = []
  // form of login
  public information = new FormGroup({
    dateOfSample: new FormControl('', [Validators.required]),
    dateReport: new FormControl('', [Validators.required]),
    result: new FormControl('', [Validators.required]),
    hourOfSample: new FormControl('', [Validators.required]),
    hourReport: new FormControl('', [Validators.required]),
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
  // search
  public search = (word:string) => {
    word=word.toLowerCase()
  }
  // save
  public save = (): void => {
    if (this.information.valid) {
      this.loading = true
      this.master.sendPatch('reports/capture',
        {
          reportId: this.selected['_id'],
          result: this.information.value['result'],
          dateOfSample: this.information.value['dateOfSample'] + 'T' + this.information.value['hourOfSample'],
          dateOfReport: this.information.value['dateReport'] + 'T' + this.information.value['hourReport'],
          capturedBy: this.store.user['userId']
        }, res => {
          this.loading = false
          if (res.status == 200) {
            this.pending.splice(this.selected['index'], 1);
            (document.getElementById('close-capture') as HTMLButtonElement).click();
            Swal.fire({ title: 'Capture Success!', text: res.message, icon: 'success', confirmButtonText: 'Ok' })
            this.information.reset();
          } else {
            Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
          }
        })
    }
  }
  // 
  public getSelected = (e, index): void => {
    debugger
    this.selected['index'] = index
    this.selected = e.value;
    (document.getElementById('capture') as HTMLButtonElement).click()
  }
  // ***********************
  // life cycles
  // **********************
  constructor(private master: MasterServiceService, private store: StoreService) { }

  ngOnInit(): void {
    this.getData()
  }

}
