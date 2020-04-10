import { createAction, props } from '@ngrx/store';
import { Lesson } from '../../model/lesson';

export const loadCourseLessons = createAction(
    '[Lesson] Load Course Lessons',
    //props<{courseId: number, pageSize: number, pageIndex: number}>()
    props<{courseId: number}>()
);

export const courseLessonsLoaded = createAction(
    '[Lesson] Course Lessons Loaded',
    // props<{courseId: number, lessonCount: number, lessons: Lesson[]}>()
    props<{courseId: number, lessons: Lesson[]}>()
);

export const loadCourseNextLessons = createAction(
    '[Lesson] Load Course Next Lessons',
    props<{courseId: number}>()
);

export const loadedCourseNextLessons = createAction(
    '[Lesson] Loaded Course Next Lessons',
    props<{courseId: number, lessons: Lesson[]}>()
);

export const loadCoursePreviousLessons = createAction(
    '[Lesson] Load Course Previous Lessons',
    props<{courseId: number}>()
);

export const loadedCoursePreviousLessons = createAction(
    '[Lesson] Loaded Course Previous Lessons',
    props<{courseId: number}>()
);

export const courseLessonsError = createAction(
    '[Error] Load Lessons Error',
    props<{error: string}>()
);
