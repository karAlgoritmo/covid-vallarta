import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// services
import {MasterServiceService} from '../app/services/master-service.service'
import {StoreService} from '../app/services/store.service'
// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { DataUserComponent } from './views/data-user/data-user.component';
import { PendingComponent } from './views/pending/pending.component';
import { HistoryComponent } from './views/history/history.component';
import { PdfsComponent } from './views/pdfs/pdfs.component';
import { ReportsComponent } from './views/reports/reports.component';
import { UsersListComponent } from './views/users-list/users-list.component';
import { CardPendingComponent } from './components/card-pending/card-pending.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { CardHistoryComponent } from './components/card-history/card-history.component';
import { GraphicComponent } from './components/graphic/graphic.component';
// material
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
// QR
import {NgxQRCodeModule} from '@techiediaries/ngx-qrcode';
import { BarComponent } from './graphics/bar/bar.component';
import { PieComponent } from './graphics/pie/pie.component';
import { LineComponent } from './graphics/line/line.component'
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DataUserComponent,
    PendingComponent,
    HistoryComponent,
    PdfsComponent,
    ReportsComponent,
    UsersListComponent,
    CardPendingComponent,
    NavHeaderComponent,
    CardHistoryComponent,
    GraphicComponent,
    BarComponent,
    PieComponent,
    LineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatIconModule,
    MatRadioModule,
    NgxQRCodeModule,
    MatDatepickerModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [MasterServiceService,StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
