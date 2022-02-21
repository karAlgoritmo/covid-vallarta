import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// views
import { LoginComponent } from './views/login/login.component';
import { DataUserComponent } from './views/data-user/data-user.component';
import { PendingComponent } from './views/pending/pending.component';
import { HistoryComponent } from './views/history/history.component';
import { PdfsComponent } from './views/pdfs/pdfs.component';
import { ReportsComponent } from './views/reports/reports.component';
import { UsersListComponent } from './views/users-list/users-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'patient', component: DataUserComponent },
  { path: 'pending', component: PendingComponent },
  { path: 'captured', component: HistoryComponent },
  { path: 'pdf', component: PdfsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'users', component: UsersListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
