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
  // field
  public fieldFilters = ['firstName', 'lastName', 'passportNo', 'email']
  // 
  public filter: string = ''
  // 
  public selected = {}
  // 
  public loading = true
  //  
  public pending = []
  // 
  public allpending = []
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
  // get all pending data
  public getData = (): void => {
    this.loading = true
    this.master.sendGet('reports/pending', res => {
      this.loading = false
      if (res.status == 200) {
        this.pending = res.data.reports
        this.allpending = res.data.reports
      } else {
        Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
      }
    })
  }
  // search pending data
  public search = (word: string, event) => {
    if (event.key == 'Enter') {
      word = word.toLowerCase()
      for (let index = 0; index < this.fieldFilters.length; index++) {
        this.pending = this.allpending.filter(el => (el['patientId'][this.fieldFilters[index]].toLowerCase()).indexOf(word) >= 0 ||
          word.indexOf((el['patientId'][this.fieldFilters[index]]).toLowerCase()) >= 0)
        if (this.pending.length > 0) {
          return
        }
      }
    }
  }

  // capture result
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
          if (res.status == 200) {
            // send email
            this.sendEmail()
          } else {
            Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
          }
        })
    }
  }
  // todo: send email
  public sendEmail = () => {
    this.master.sendPost('mails/send', { emailAddress: this.selected['patientId'].email, _id: this.selected['_id'] }, res => {
      if (res) {
        if (res.status == 200) {
          this.loading = false
          // after save
          this.pending.splice(this.selected['index'], 1);
          (document.getElementById('close-capture') as HTMLButtonElement).click();
          this.information.reset();
          Swal.fire({ title: 'Success!', text: res.data.message, icon: 'success', confirmButtonText: 'Ok' })
        } else {
          Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
        }
      } else {
        Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
      }
    })
  }
  // select a pending card
  public getSelected = (e, index): void => {
    this.selected = e.value;
    this.selected['index'] = index
    if (e.isDelete) {
      this.delete(this.selected['_id'])
    } else {
      (document.getElementById('capture') as HTMLButtonElement).click()
    }
  }
  // quest delete
  public delete = (id: number): void => {
    Swal.fire({
      title: 'Are you sure to delete this pending report?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.loading = true

        this.master.sendDelete('reports/delete', id, res => {
          this.loading = false
          if (res.status == 200) {
            this.pending.splice(this.selected['index'], 1);
            Swal.fire({ title: 'Delete Success!', text: res.message, icon: 'success', confirmButtonText: 'Ok' })
          } else {
            Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
          }
        })
      }
    })
  }

  // ***********************
  // life cycles
  // **********************
  constructor(private master: MasterServiceService, private store: StoreService) { }

  ngOnInit(): void {
    this.getData()
  }

}
