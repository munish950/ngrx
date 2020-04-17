import { getCourseLessons } from './lesson.selectors';
import { Store } from '@ngrx/store';
import { LessonState } from './lesson.state';



describe('Lesson Selector', () => {

    describe('getCourseLessons', () => {

        it('Should return lessons for correct course id', () => {
            const allLessons = {
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
    
            const props = {courseId : 4};
            const outcome = [
                {
                    id: 52,
                    description: 'The Origins of Flux',
                    duration: '8:17',
                    seqNo: 3,
                    courseId: 4
                }
            ];
    
            const result = getCourseLessons.projector(allLessons, props);
    
            expect(result).toEqual(outcome);
            
            
        });

        it('Should return empty array for incorrect course id', () => {
            const allLessons = {
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
    
            const props = {courseId : 1};
            const outcome = [];
    
            const result = getCourseLessons.projector(allLessons, props);
    
            expect(result).toEqual(outcome);
            
            
        });

    });

    
    
});

