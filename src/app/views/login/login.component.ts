import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { MasterServiceService } from '../../services/master-service.service'
import { StoreService } from '../../services/store.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // ***********************
  // variables
  // **********************
  // loading status
  public loading: boolean = false
  // form of login
  public information = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  // ***********************
  // functions
  // **********************
  public save = (): void => {
    if (this.information.valid) {
      this.loading = true
      this.master.sendPost('auth/login', this.information.value, res => {
        this.loading = false
        if (res) {
          if (res.status == 200) {
            this.store.login = res.data
            this.master.token = res.data.token
            localStorage.setItem('token', res.data.token)
            this.master.headers['headers']['Authorization'] = res.data.token
            this.router.navigate(['pending'])
          }
        } 
      })
    }
  }
  // ***********************
  // life cycles
  // **********************
  constructor(private master: MasterServiceService, private store: StoreService, private router: Router) { }

  ngOnInit(): void {
  }

}
