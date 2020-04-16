import { initialState } from './lesson.state';
import { on, createReducer } from '@ngrx/store';
import { LessonActionType } from './lesson.action.types';

export const LessonReducer = createReducer(
    initialState,
    on (LessonActionType.loadCourseLessons,
        (state, action) => {
            return {
                ...state
            };
        }
    ),
    on (LessonActionType.courseLessonsLoaded,
        (state, action) => {
            const course = state[action.courseId] || {};
            // const lessons = course.lessons || [];
            const lessons = course['lessons'] || [];
            return {
                ...state,
                [action.courseId]: {
                // lessons: [action.lessons],
                    lessons: [
                        ...lessons,
                        ...action.lessons,
                    ],
                    pagination: {
                        pageSize: 3,
                        pageIndex: 0,
                        length: 10
                    }
                }
            };
        }
    )
);

