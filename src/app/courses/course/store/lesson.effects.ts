import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType} from '@ngrx/effects';
import { LessonActionType } from './lesson.action.types';
import { concatMap, map, catchError } from 'rxjs/operators';
import { CoursesHttpService } from '../../services/courses-http.service';


@Injectable()
export class LessonEffects {

    constructor(private actions$: Actions, private httpService: CoursesHttpService){}

    loadLessons$ = createEffect(
        () => this.actions$.pipe(
            ofType(LessonActionType.loadCourseLessons),
            concatMap(action => this.httpService.findLessons(
                    action.courseId,
                    0,
                    3
                ).pipe(
                    map(lessons => LessonActionType.courseLessonsLoaded(
                        {courseId: 4, lessons: lessons}
                    )
                    /* TO DO,
                    catchError()
                    */
                )
                )
            )
        )
    );

}
