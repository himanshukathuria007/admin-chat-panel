import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { WesiteLayoutComponent } from './components/layouts/wesite-layout/wesite-layout.component';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/authconfig.interceptor';

import { TopbarComponent } from './components/topbar/topbar.component';
import { SettingComponent } from './components/setting/setting.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { PageTitleService } from './shared/pageTitle.service';
import { AuthenticationService } from './shared/authentication.service'
import { AuthGuardService } from './shared/auth-guard.service'
import { RegisterComponent } from './components/register/register.component';


import { ChatAppComponent } from "./components/chat-app/chat-app.component";
import { ChatWindowComponent } from "./components/chat-window/chat-window.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { MessageComponent } from "./components/message/message.component";
import { ChatInputComponent } from "./components/chat-input/chat-input.component";
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { PrivateChatComponent } from './components/private-chat/private-chat.component';
import { PrivateAreaComponent } from './components/private-area/private-area.component';
import { UserService } from './shared/user.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignInComponent } from './components/sign-in/sign-in.component';

import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { ChatNamePopupComponent } from './components/chat-name-popup/chat-name-popup.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptortwo } from './auth/auth.interceptor';


const config: SocketIoConfig = { url: "http://localhost:3000", options: {} };

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    AdminLayoutComponent,
    WesiteLayoutComponent,
    ProfileComponent,
    TopbarComponent,
    SettingComponent,
    RegisterComponent,
    UserProfileComponent,
    SignInComponent,
    PrivateAreaComponent,
  
    PrivateChatComponent,
    ChatAppComponent,
    ChatWindowComponent,
    UsersListComponent,
    MessageComponent,
    ChatInputComponent,
    ChatNamePopupComponent,
    ChatRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    Title,
    AuthenticationService,
     AuthGuardService,
     ,AuthGuard,UserService,
    PageTitleService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptortwo,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
