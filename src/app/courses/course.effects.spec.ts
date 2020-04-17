import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { of, Observable } from 'rxjs';

import { CourseEffects } from './course.effects';
import { Course } from './model/course';
import { CoursesHttpService } from './services/courses-http.service';


xdescribe('Course effects', () => {
    // const courseService = jasmine.createSpyObj('courseService', ['get']);
    let actions$: Observable<any>;
    let courseEffects: CourseEffects;
    // let effects: any;

    beforeEach(() => {
        // courseEffects = new CourseEffects(actions$, courseService);

        TestBed.configureTestingModule({
            providers: [
                courseEffects,
                provideMockActions(() => actions$),
                {
                    provide: CoursesHttpService,
                    useValue: CoursesHttpService
                }
            ]
        });

        let courseService = TestBed.get(CoursesHttpService);


        courseEffects = TestBed.get(courseEffects);

    });

    it('Should be created', () => {
        expect(courseEffects).toBeTruthy();
    });

    it('Should call allCoursesLoaded action with course data', () => {
        const courseList: Course[] = [
            {
                id: 1,
                seqNo: 1,
                url: 'http//loacalhost.com',
                iconUrl: 'http:dummy.com',
                courseListIcon: '',
                description: 'Sample Description',
                longDescription: '',
                category: 'BEGINNER',
                lessonsCount: 10,
                promo: false
            }
        ];

        // const coursesLoadAction = coursesAction.loadAllCourses();
        // const coursesLoadedAction = coursesAction.allCoursesLoaded({courses: courseList});

        // actions$ = courseService.get.and.returnValue(of(courseList));

        

    });
});
