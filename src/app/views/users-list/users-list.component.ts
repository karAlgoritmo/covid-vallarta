import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MasterServiceService } from '../../services/master-service.service'
import { StoreService } from '../../services/store.service'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  // ***********************
  // variable
  // **********************
  // 
  public select = null
  // loading status
  public loading: boolean = false
  // form of login
  public information = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  public informationUpdate = new FormGroup({
    _id: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  //  users colection
  public users: any[] = []
  // ***********************
  // functions
  // **********************
  // set data
  public setData = (user: any): void => {
    this.informationUpdate.setValue({ _id: user._id, username: user.username, password: user.password })
  }
  // 
  public getData = (): void => {
    this.loading = true
    this.master.sendGet('users', res => {
      this.loading = false
      if (res.status == 200) {
        this.users = res.data.users
      } else {
        Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
      }
    })
  }
  //todo: update
  public update = (): void => {
    this.loading = true
    this.master.sendPut('users/user', this.informationUpdate.value, res => {
      this.loading = false
      if (res.status == 200) {
        (document.getElementById('closeUpdate') as HTMLButtonElement).click();
        Swal.fire({ title: 'Update Success!', text: res.data.message, icon: 'success', confirmButtonText: 'Ok' })
        this.getData()
      } else {
        Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
      }
    })
  }
  //todo: create
  public create = (): void => {
    this.loading = true
    this.master.sendPost('users/user', this.information.value, res => {
      this.loading = false
      if (res.status == 200) {
        Swal.fire({ title: 'Create Success!', text: res.data.message, icon: 'success', confirmButtonText: 'Ok' })
        this.users.push({ ...res.data.user })
        this.information.reset()
      } else {
        Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
      }
    })
  }
  //todo: delete
  public delete = (user,index): void => {
    Swal.fire({
      title: 'Are you sure to delete this user?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.master.sendDelete('users/user', user._id, res => {
          this.loading = false
          if (res.status == 200) {
            Swal.fire('Deleted!', '', 'success')
            this.users.splice(index,1)
          } else {
            Swal.fire({ title: 'Ups!', text: 'Something were wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
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
