import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, Input} from '@angular/core';
import { MenuItem } from './../models/menu-item'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnDestroy {
  
  @Input() sidenavTemplateRef: any;

  sideMenuItems: MenuItem[];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.sideMenuItems = [
      {
        name: 'home',
        desc: 'Inicio',
        icon: 'home',
        path: 'home'
      },
      {
        name: 'users',
        desc: 'Cuenta',
        icon: 'account_balance',
        path: 'users'
      },
      {
        name: 'customers',
        desc: 'Clientes',
        icon: 'face',
        path: 'customers'
      },
      {
        name: 'customers',
        desc: 'Citas',
        icon: 'calendar_today',
        path: 'users'
      },
    ]

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
