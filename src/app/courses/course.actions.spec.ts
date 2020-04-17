import { coursesAction } from './action-types';
import { Store } from '@ngrx/store';
import { Course } from './model/course';

xdescribe('Course action', () => {
    it('Should dispatch Load All Course Action', () => {
        const expectedAction = coursesAction.loadAllCourses;
        const store = jasmine.createSpyObj<Store<Course>>('store', ['dispatch']);

       expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
    });
});
