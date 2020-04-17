import { LessonActionType } from './lesson.action.types';
import { initialState } from './lesson.state';
import { LessonReducer } from './lesson.reducer';
import { createAction } from '@ngrx/store';



export const dummyAction = createAction(
    'Dummy Action'
);

describe('LessonReducer', () => {

    it('Should return default state', () => {

        const newState = LessonReducer(initialState, dummyAction);
        expect(newState).toBe(initialState);
        expect(newState).toEqual(initialState);
    });


    it('Should add new lessons to state', () => {

        const lessonsObj = {
            courseId: 4,
            lessons: [
              {
                id: 52,
                description: 'The Origins of Flux',
                duration: '8:17',
                seqNo: 3,
                courseId: 4
              }
            ]
        };

        const expectedStateObj = {
            4: {
                lessons: [
                    {
                        id: 52,
                        description: 'The Origins of Flux',
                        duration: '8:17',
                        seqNo: 3,
                        courseId: 4
                    }
                ]
            }
        };

        const loadedCourseAction = LessonActionType.courseLessonsLoaded(lessonsObj);
        const newState = LessonReducer(initialState, loadedCourseAction);

        expect(newState).not.toBe(initialState);
        expect(newState).toEqual(expectedStateObj);

    });
});
