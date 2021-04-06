import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';
import { 
  Router, 
  Event, 
  NavigationStart,
  NavigationEnd, 
  NavigationCancel, 
  NavigationError 
} from '@angular/router';

import { slideInAnimation } from './app.animation';
import { MessageService } from './messages/message.service';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations : [slideInAnimation]
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
  loadding = true;

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userName(): string {
    if (this.authService.currentUser) {
      return this.authService.currentUser.userName;
    }
    return '';
  }

  get isMessageDisplayed(): boolean {
    return this.messageService.messageIsDisplayed;
  }

  constructor(private authService: AuthService, 
              private router: Router,
              private messageService: MessageService) {
    this.router.events.subscribe((routerEvent: Event) =>{
      this.checkRouterEvent(routerEvent);
    });
   }

  checkRouterEvent(routerEvent: Event): void {
    if(routerEvent instanceof NavigationStart){
      this.loadding = true;
    }

    if(routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationError ||
      routerEvent instanceof NavigationCancel)
    {
      this.loadding = false;
    }
  }

  showOrHideMessages(): void{
    if(!this.messageService.messageIsDisplayed){
      this.router.navigate([{ outlets: { popup: ['messages']}}]);
    }else{
      this.router.navigate([{ outlets: { popup: null}}])
    }
    this.messageService.messageIsDisplayed = !this.messageService.messageIsDisplayed;
  }

  logOut(): void {
    this.authService.logout();
    this.router.navigateByUrl('/welcome')
  }
}
