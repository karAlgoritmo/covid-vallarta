import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MasterServiceService } from '../../services/master-service.service'
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode'
import Swal from 'sweetalert2'
import jsPDF from 'jspdf';
// // import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';
// 
@Component({
  selector: 'app-pdfs',
  templateUrl: './pdfs.component.html',
  styleUrls: ['./pdfs.component.scss']
})
export class PdfsComponent implements OnInit {
  public id = ''
  public value = ""
  public error = NgxQrcodeErrorCorrectionLevels.HIGH
  public type = NgxQrcodeElementTypes.URL
  public data = {}
  public loading: boolean = false
  // 
  public sendEmail = () => {
    this.loading = true
    this.master.sendPost('mails/send', { emailAddress: this.data['patientId'].email, _id: this.data['_id'] }, res => {
      this.loading = false
      if (res) {
        if (res.status == 200) {
          Swal.fire({ title: 'Success!', text: res.data.message, icon: 'success', confirmButtonText: 'Ok' })
        } else {
          Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
        }
      } else {
        Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
      }
    })
  }

  public getData = (id) => {
    this.id = id
    this.master.sendGet('reports/report/' + id, res => {
      if (res) {
        if (res.status == 200) {

          this.data = res.data.report

        } else {
          Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
        }
      } else {
        Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
      }
    })
  }
  constructor(
    private route: ActivatedRoute,
    public master: MasterServiceService,
  ) {
    this.value = window.location.href
    this.getData(this.route.snapshot.params["id"])
  }

  ngOnInit(): void {

  }

}
