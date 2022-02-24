import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute } from "@angular/router";
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
  public id=''
  public value = "http://localhost:4200/pdf/1"
  public error = NgxQrcodeErrorCorrectionLevels.HIGH
  public type = NgxQrcodeElementTypes.URL
  public data={}
  // 
  generateImage(){
    
    var node:any = document.getElementById('MyDIv');
    
    // this.exportAsPDF('MyDIv')
    debugger
    let id=this.id;
    let master=this.master;
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        var img = new Image(100,100);
        img.src = dataUrl;
        console.log('base: ',dataUrl);
        
        master.sendPost('mails/send',{emailAddress:'linkarlozcore@hotmail.com',_id:id},res=>{
          debugger
        })
        // (document.getElementById('image') as HTMLImageElement).src=img.src
        // document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }
  // 
  
  exportAsPDF(div_id) {
    let data = document.getElementById(div_id);
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save('Filename.pdf');
    });
  }
  
  public captureScreen() {
    const data = document.getElementById('invoice');
    html2canvas(data).then(canvas => {
    const imgWidth = 208;
    const pageHeight = 295;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;
    const contentDataURL = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); 
    const position = 0;
    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
    pdf.save('invoice.pdf'); 
    });
    }

    public getData=(id)=>{
      this.id=id
      this.master.sendGet('reports/report/'+id,res=>{
        if(res){
          if(res.status==200){
            
            this.data=res.data.report
            
          }else{
            Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
          }
        }else{
          Swal.fire({ title: 'Ups!', text: 'Something went wrong, try again', icon: 'error', confirmButtonText: 'Ok' })
        }
      })
    }
  constructor(
    private route: ActivatedRoute,
    public master: MasterServiceService,
  ) {
    
    this.getData(this.route.snapshot.params["id"])
   }

  ngOnInit(): void {
    
  }

}
