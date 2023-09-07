import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './components/auth/registration-form/registration-form.component';
import { TradesComponent } from './components/trades/trades.component';
import { MyAccountComponent } from './components/auth/my-account/my-account.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegistrationFormComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'trading', component: TradesComponent, canActivate: [AuthGuard] },
  {
    path: 'my-account',
    component: MyAccountComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
