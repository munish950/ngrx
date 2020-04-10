import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoursesState } from './reducers/course.reducers';
import * as fromCourses from './reducers/course.reducers';


export const selectCoursesState = createFeatureSelector<CoursesState>('courses');

export const getCourseSelector = createSelector(selectCoursesState, fromCourses.selectEntities);

export const selectAllCourses = createSelector(
    selectCoursesState,
    fromCourses.selectAll
);

// export const selectAllCourses = fromCourses.selectAll;

export const getCoursebyId = createSelector(
    getCourseSelector,
    (entities, props) => entities[props.id]
);

export const selectBeginneerCourse = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'BEGINNER')
);

export const selectAdvancedCourses = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.category === 'ADVANCED')
);

export const selectPromoTotal = createSelector(
    selectAllCourses,
    courses => courses.filter(course => course.promo).length
);

export const areCousesLoaded = createSelector(
    selectCoursesState,
    state => state.allCoursesLoadedFlag
);

