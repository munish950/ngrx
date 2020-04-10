import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LessonState } from './lesson.state';


const featureLessonSelector = createFeatureSelector<LessonState>('lessons');

const getAllLessons = createSelector(
    featureLessonSelector,
    lessons => lessons
);

export const getCourseLessons = createSelector(
    getAllLessons,
    (allLessons, props) => {
        const state = allLessons[props.courseId];
        return state ? state.lessons : [];
    }
);
