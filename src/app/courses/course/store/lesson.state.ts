import { Lesson } from '../../model/lesson';

export interface Pagination {
    pageSize: number;
    pageIndex: number;
    length: number;
}

export interface LessonState {
    [key: number]: {
        lessons: Lesson[];
        pagination: Pagination
    };
}

export const initialState: LessonState = {};
