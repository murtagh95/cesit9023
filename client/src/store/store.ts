import { configureStore } from '@reduxjs/toolkit';
import carrerasSlice from '../slices/carrerasSlice';
import counterSlice from '../slices/counterSlice';
import cursosSlice from '../slices/cursosSlice';
import materiasSlice from '../slices/materiasSlice';
import tareasSlice from '../slices/tareasSlice';
import alumnosSlice from '../slices/alumnosSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    tarea: tareasSlice,
    carrera: carrerasSlice,
    curso: cursosSlice,
    materia: materiasSlice,
    alumno: alumnosSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
