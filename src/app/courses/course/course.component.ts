import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom, switchMap} from 'rxjs/operators';
// import {CoursesHttpService} from '../services/courses-http.service';
import { LessonState } from './store/lesson.state';
import { Store, select } from '@ngrx/store';
import { getCourseLessons } from './store/lesson.selectors';
import { getCoursebyId } from '../course.selectors';
import { LessonActionType } from './store/lesson.action.types';



@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  displayedColumns = ['seqNo', 'description', 'duration'];

  nextPage = 0;
  length = 10;
  pageSize = 3;
  courseId: number;

  constructor(
    // private coursesService: CoursesHttpService,
    private route: ActivatedRoute,
    private store: Store<any>
    ) { }

  ngOnInit() {
    // const courseId = this.route.snapshot.paramMap.get('courseUrl');

    const courseId$ = this.route.params.pipe(
      map(params => params['courseUrl'])
    );
    /*
    this.store.pipe(

    );
    */

    this.course$ = courseId$.pipe(
      switchMap(id => {
        this.courseId = id;
        // this.lessons$ = this.store.pipe(select(getCourseLessons, { courseId: id }));
        this.store.dispatch(LessonActionType.loadCourseLessons({
            courseId: this.courseId,
            pageSize: 3,
            pageIndex: 0
          })
        );
        this.lessons$ = this.store.pipe(select(getCourseLessons, { courseId: id }));
        return this.store.pipe(select(getCoursebyId, { id : id }));
      })
    );
    /*
    this.lessons$ = courseId$.pipe(
        switchMap(id => this.store.pipe(select(getCourseLessons, { courseId: id })))
    );
    */

  }


  loadLessonsPage(event: {
    previousPageIndex: number,
    pageIndex: number,
    pageSize: number,
    length: number
    }) {
    console.log(event);
    const previousPageIndex = event.previousPageIndex;
    const length = event.length;
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    this.store.dispatch(LessonActionType.loadCourseLessons({
        courseId: this.courseId,
        pageSize: pageSize,
        pageIndex: pageIndex
      })
    );
  }

}


