import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Course } from '../model/course';
import { coursesAction } from '../action-types';

export interface CoursesState extends EntityState<Course> {

}

export const adapter = createEntityAdapter<Course>();

export const initialCourseState = adapter.getInitialState();

export const courseReducer = createReducer(
    initialCourseState,
    on(coursesAction.allCoursesLoaded,
        (state, action) => adapter.addAll(action.courses, state)
    )
);
