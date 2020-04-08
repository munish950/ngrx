import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, first, map } from 'rxjs/operators';
import { LessonActionType } from './lesson.action.types';

import { CoursesHttpService } from '../../services/courses-http.service';

@Injectable()
export class LessonResolver implements Resolve<any> {
    constructor(
        private store: Store<any>,
        private coursesService: CoursesHttpService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const courseId = route.paramMap.get('courseUrl');
        this.store.dispatch(LessonActionType.loadCourseLessons(
            {
                courseId: Number(courseId)
            }
        ));
        return of(true);
        /*
        return this.store.pipe(
            tap(storeState => {
                // get url of selected course
                const courseId = route.paramMap.get('courseUrl');
                // Need to fetch course id from store
                this.store.dispatch(LessonActionType.loadCourseLessons({
                        courseId: Number(courseId),
                        pageSize: 3,
                        pageIndex: 0
                    })
                );
            }),
            first()
        );
        */
    }
}


