import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MasterServiceService } from '../../services/master-service.service'
import { StoreService } from '../../services/store.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-data-user',
  templateUrl: './data-user.component.html',
  styleUrls: ['./data-user.component.scss']
})
export class DataUserComponent implements OnInit {
  // ***********************
  // variables
  // **********************
  // loading status
  public loading: boolean = false
  // form of login
  public information = new FormGroup({
    middlename:new FormControl('', []),
    title:new FormControl('', []),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    dateOfBirth: new FormControl('', [Validators.required]),
    passportNo: new FormControl('', [Validators.required]),
    gender: new FormControl('1', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  })
  // ***********************
  // functions
  // **********************
  public save = (): void => {
    if (this.information.valid) {
      this.information.get('gender').setValue(this.information.value['gender'] == '1' ? true : false)
      this.loading = true
      this.master.sendPost('patients/register', this.information.value, res => {
        this.loading = false
        if(res.status==200){
          Swal.fire({ title: 'Complete', text: 'Registration Success !', icon: 'success', confirmButtonText: 'Ok' })
          this.information.reset()
        }else{
          Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
        }
      })
    }
  }
  test(){
    
  }
  // ***********************
  // life cycles
  // **********************
  constructor(private master: MasterServiceService, private store: StoreService) {

  }

  ngOnInit(): void {
  }

}
