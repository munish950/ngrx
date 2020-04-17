import { provideMockActions } from '@ngrx/effects/testing';
import { hot, cold} from 'jasmine-marbles';

import { LessonEffects } from './lesson.effects';
import { CoursesHttpService } from '../../services/courses-http.service';
import { LessonActionType } from './lesson.action.types';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';

describe('Lesson effetcs', () => {
    let actions$: Observable<Action>;
    let effects: LessonEffects;
    let courseApi: jasmine.SpyObj<CoursesHttpService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LessonEffects,
                provideMockActions(() => actions$),
                {
                  provide: CoursesHttpService,
                  useValue: jasmine.createSpyObj('CoursesHttpService', ['findLessons'])
                }
              ]
        });

        effects = TestBed.get(LessonEffects);
        courseApi = TestBed.get(CoursesHttpService);
    });

    it('Should be created', () => {
        expect(effects).toBeDefined();
    });

    describe('loadCourseLessons', () => {

        it('should return a stream with lessons loaded action', () => {
            
            const action = LessonActionType.loadCourseLessons(
                {courseId: 1, pageSize: 3, pageIndex: 1}
            );
            const outcome = LessonActionType.courseLessonsLoaded({courseId: 1, lessons: [] });
      
            actions$ = hot('-a', { a: action });
            const response = cold('-a|', { a: [] });
            courseApi.findLessons.and.returnValue(response);
      
            const expected = cold('--b', { b: outcome });
            expect(effects.loadLessons$).toBeObservable(expected);
          });

        /*
        it('should fail and return an action with the error', () => {
            const action = LessonActionType.loadCourseLessons(
                {courseId: 1, pageSize: 3, pageIndex: 1}
            );
            const error = 'My Error';
            const outcome = LessonActionType.courseLessonsError({error: 'My Error'});
      
            actions$ = hot('-a', { a: action });
            const response = cold('-#|', {}, {error: 'My Error'});
            courseApi.findLessons.and.returnValue(response);
      
            const expected = cold('--(b|)', { b: outcome });
            expect(effects.loadLessons$).toBeObservable(expected);
        });
        */

    });
    
});


