import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { coursesAction } from './action-types';
import { concatMap, map } from 'rxjs/operators';
import { CoursesHttpService } from './services/courses-http.service';
import { allCoursesLoaded } from './course.actions';


@Injectable()
export class CourseEffects {
    constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService) {

    }
    loadCourse$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(coursesAction.loadAllCourses),
                concatMap(action =>
                    this.coursesHttpService.findAllCourses()),
                map(courses => allCoursesLoaded({courses}))
            )
    );
}
