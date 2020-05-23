import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from "./shared/auth.guard";
import { SettingComponent } from './components/setting/setting.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatAppComponent } from "./components/chat-app/chat-app.component";
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin' },
  { path: 'admin', component: LogInComponent },
  { path: 'chat', component: ChatAppComponent, data: {title: 'chat',pageTitle:'chatting'} },
  {path: 'userprofile', component: UserProfileComponent,
    },
    {
      path: 'login', component: SignInComponent,
     
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard], data: {title: 'Dashboard',pageTitle:'Dashboard'} },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: {title: 'Profile',pageTitle:'Profile'} },
      { path: 'setting', component: SettingComponent, canActivate: [AuthGuard], data: {title: 'Setting',pageTitle:'Setting'} },
      { path: 'register', component: RegisterComponent, canActivate: [AuthGuard],data: {title: 'register',pageTitle:'register user'} },
      { path: 'chatroom', component: ChatRoomComponent, data: {title: 'chat room',pageTitle:'chatting'} },
      
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
