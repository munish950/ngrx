import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { loadAllCourses } from '../course.actions';
import { areCousesLoaded } from '../course.selectors';

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
                select(areCousesLoaded),
                tap(coursesLoaded => {
                    if (!this.loading && !coursesLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllCourses());
                    }
                }),
                filter(coursesLoaded => coursesLoaded),
                first(),
                finalize(() => {
                    this.loading = false;
                })
            );
        }
}
