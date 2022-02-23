import { Component, OnInit } from '@angular/core';

import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode'
// import * as jspdf from 'jspdf';
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
  value = "http://localhost:4200/pdf/1"
  error = NgxQrcodeErrorCorrectionLevels.HIGH
  type = NgxQrcodeElementTypes.URL
  // 
  generateImage(){
    var node:any = document.getElementById('MyDIv');
    htmlToImage.toPng(node)
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        (document.getElementById('image') as HTMLImageElement).src=img.src
        // document.body.appendChild(img);
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }
  // 
  
  // exportAsPDF(div_id) {
  //   let data = document.getElementById(div_id);
  //   html2canvas(data).then(canvas => {
  //     const contentDataURL = canvas.toDataURL('image/png')
  //     let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
  //     // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
  //     pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
  //     pdf.save('Filename.pdf');
  //   });
  // }
  
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
  constructor() { }

  ngOnInit(): void {
  }

}
