import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';

import { AppService } from 'src/app/utils/services/app.service';
import { AuthService } from 'src/app/utils/services/auth.service';

@Component({
  selector: 'app-user-dropdown-menu',
  templateUrl: './user-dropdown-menu.component.html',
  styleUrls: ['./user-dropdown-menu.component.scss'],
})
export class UserDropdownMenuComponent implements OnInit {
  public user;
  public userData;
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }
 
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private appService: AppService,
    public dataUsuario: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.dataUsuario.user;
    this.userData = this.dataUsuario.DataUsuario;
    console.log(this.userData);
  }

  toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }

  logout() {
    this.dataUsuario.logout();
  }
}
