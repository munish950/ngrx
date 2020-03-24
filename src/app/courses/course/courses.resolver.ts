import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { tap, first, finalize } from 'rxjs/operators';
import { loadAllCourses } from '../course.actions';

@Injectable()
export class CoursesResolver implements Resolve<any> {
    loading = false;
    constructor(private store: Store<any>) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any> {
            return this.store
            .pipe(
                tap(() => {
                    if (!this.loading) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                first(),
                finalize(() => {
                    this.loading = false;
                })
            );
        }
}
