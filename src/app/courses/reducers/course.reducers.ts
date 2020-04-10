import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Course, compareCourses } from '../model/course';
import { coursesAction } from '../action-types';

export interface CoursesState extends EntityState<Course> {
    allCoursesLoadedFlag: boolean;
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

export const initialCourseState = adapter.getInitialState({
    allCoursesLoadedFlag: false
});

export const courseReducer = createReducer(
    initialCourseState,
    on(coursesAction.allCoursesLoaded,
        (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoadedFlag: true})
    ),

    on(coursesAction.updateCourse,
        (state, action) => adapter.updateOne(action.update, state)
    )
);

export const {selectEntities, selectAll} = adapter.getSelectors();

