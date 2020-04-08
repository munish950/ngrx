import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import {concatMap, delay, filter, first, map, shareReplay, tap, withLatestFrom, switchMap} from 'rxjs/operators';
import {CoursesHttpService} from '../services/courses-http.service';
import { LessonState } from './store/lesson.state';
import { Store, select } from '@ngrx/store';
import { getCourseLessons } from './store/lesson.selectors';


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
  length: 10;
  pageSize = 3;
  courseId: number;

  constructor(
    private coursesService: CoursesHttpService,
    private route: ActivatedRoute,
    private store: Store<LessonState>
    ) { }

  ngOnInit() {
    // const courseId = this.route.snapshot.paramMap.get('courseUrl');

    const courseId$ = this.route.params.pipe(
      map(params => params['courseUrl']),
    );

    this.lessons$ = courseId$.pipe(
        switchMap(id => this.store.pipe(select(getCourseLessons, { courseId: id })))
    );

    
    /*
    this.course$ = this.store.pipe(
      // Need to select Course id of current course
    );
    */

  }


  loadLessonsPage(course: Course) {

  }

}
