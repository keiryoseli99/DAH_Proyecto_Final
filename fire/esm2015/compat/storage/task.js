import { fromTask } from './observable/fromTask';
import { map } from 'rxjs/operators';
/**
 * Create an AngularFireUploadTask from a regular UploadTask from the Storage SDK.
 * This method creates an observable of the upload and returns on object that provides
 * multiple methods for controlling and monitoring the file upload.
 */
export function createUploadTask(task) {
    const inner$ = fromTask(task);
    return {
        task,
        then: task.then.bind(task),
        catch: task.catch.bind(task),
        pause: task.pause.bind(task),
        cancel: task.cancel.bind(task),
        resume: task.resume.bind(task),
        snapshotChanges: () => inner$,
        percentageChanges: () => inner$.pipe(map(s => s.bytesTransferred / s.totalBytes * 100))
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wYXQvc3RvcmFnZS90YXNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFnQnJDOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsSUFBZ0I7SUFDL0MsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLE9BQU87UUFDTCxJQUFJO1FBQ0osSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUMxQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDNUIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUM5QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzlCLGVBQWUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxNQUFNO1FBQzdCLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ2xDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUNsRDtLQUNGLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXBsb2FkVGFzaywgVXBsb2FkVGFza1NuYXBzaG90IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IGZyb21UYXNrIH0gZnJvbSAnLi9vYnNlcnZhYmxlL2Zyb21UYXNrJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlyZVVwbG9hZFRhc2sge1xuICB0YXNrOiBVcGxvYWRUYXNrO1xuICBzbmFwc2hvdENoYW5nZXMoKTogT2JzZXJ2YWJsZTxVcGxvYWRUYXNrU25hcHNob3QgfCB1bmRlZmluZWQ+O1xuICBwZXJjZW50YWdlQ2hhbmdlcygpOiBPYnNlcnZhYmxlPG51bWJlciB8IHVuZGVmaW5lZD47XG4gIHBhdXNlKCk6IGJvb2xlYW47XG4gIGNhbmNlbCgpOiBib29sZWFuO1xuICByZXN1bWUoKTogYm9vbGVhbjtcbiAgdGhlbihcbiAgICBvbkZ1bGZpbGxlZD86ICgoYTogVXBsb2FkVGFza1NuYXBzaG90KSA9PiBhbnkpIHwgbnVsbCxcbiAgICBvblJlamVjdGVkPzogKChhOiBFcnJvcikgPT4gYW55KSB8IG51bGxcbiAgKTogUHJvbWlzZTxhbnk+O1xuICBjYXRjaChvblJlamVjdGVkOiAoYTogRXJyb3IpID0+IGFueSk6IFByb21pc2U8YW55Pjtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gQW5ndWxhckZpcmVVcGxvYWRUYXNrIGZyb20gYSByZWd1bGFyIFVwbG9hZFRhc2sgZnJvbSB0aGUgU3RvcmFnZSBTREsuXG4gKiBUaGlzIG1ldGhvZCBjcmVhdGVzIGFuIG9ic2VydmFibGUgb2YgdGhlIHVwbG9hZCBhbmQgcmV0dXJucyBvbiBvYmplY3QgdGhhdCBwcm92aWRlc1xuICogbXVsdGlwbGUgbWV0aG9kcyBmb3IgY29udHJvbGxpbmcgYW5kIG1vbml0b3JpbmcgdGhlIGZpbGUgdXBsb2FkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVXBsb2FkVGFzayh0YXNrOiBVcGxvYWRUYXNrKTogQW5ndWxhckZpcmVVcGxvYWRUYXNrIHtcbiAgY29uc3QgaW5uZXIkID0gZnJvbVRhc2sodGFzayk7XG4gIHJldHVybiB7XG4gICAgdGFzayxcbiAgICB0aGVuOiB0YXNrLnRoZW4uYmluZCh0YXNrKSxcbiAgICBjYXRjaDogdGFzay5jYXRjaC5iaW5kKHRhc2spLFxuICAgIHBhdXNlOiB0YXNrLnBhdXNlLmJpbmQodGFzayksXG4gICAgY2FuY2VsOiB0YXNrLmNhbmNlbC5iaW5kKHRhc2spLFxuICAgIHJlc3VtZTogdGFzay5yZXN1bWUuYmluZCh0YXNrKSxcbiAgICBzbmFwc2hvdENoYW5nZXM6ICgpID0+IGlubmVyJCxcbiAgICBwZXJjZW50YWdlQ2hhbmdlczogKCkgPT4gaW5uZXIkLnBpcGUoXG4gICAgICBtYXAocyA9PiBzLmJ5dGVzVHJhbnNmZXJyZWQgLyBzLnRvdGFsQnl0ZXMgKiAxMDApXG4gICAgKVxuICB9O1xufVxuIl19