import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType} from '@ngrx/effects';
import { LessonActionType } from './lesson.action.types';
import { concatMap, map, catchError, tap } from 'rxjs/operators';
import { CoursesHttpService } from '../../services/courses-http.service';
import { of } from 'rxjs';


@Injectable()
export class LessonEffects {

    constructor(private actions$: Actions, private httpService: CoursesHttpService){}

    loadLessons$ = createEffect(
        () => this.actions$.pipe(
            ofType(LessonActionType.loadCourseLessons),
            concatMap(action => this.httpService.findLessons(action.courseId, 0, 3)
                .pipe(
                    map(
                        lessons => LessonActionType.courseLessonsLoaded(
                            {courseId: action.courseId, lessons: lessons}
                        ),
                        catchError((error) => {
                                // LessonActionType.courseLessonsError({error: error});
                                return of(LessonActionType.courseLessonsError({error: error}));
                            }
                        )
                    )
                )
            )
        )
    );

    error$ = createEffect(
        () => this.actions$.pipe(
            ofType(LessonActionType.courseLessonsError),
            tap(action => {
                console.log('Error Occur', action.error);
            }
            )
        ),
        {dispatch: false}
    )

}
