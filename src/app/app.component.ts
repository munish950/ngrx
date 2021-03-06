import {Component, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private store: Store<AppState>) {}

    ngOnInit() {
      /*
      this.isLoggedIn$ = this.store.pipe(
        map(state => !!state['auth'].user)
      );
      this.isLoggedOut$ = this.store.pipe(
        map(state => !state['auth'].user)
      );
      */
      this.isLoggedIn$ = this.store.pipe(
        select(isLoggedIn)
      );

      this.isLoggedOut$ = this.store.pipe(
        select(isLoggedOut)
      );

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

    }

    logout() {
      // dispatch action, create reducer for calculate new state
      this.store.dispatch(logout());
      this.router.navigateByUrl('/login');
    }
}
