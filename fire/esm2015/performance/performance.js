import { ɵgetAllInstancesOf } from '@angular/fire';
import { from, timer } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
export class Performance {
    constructor(performance) {
        return performance;
    }
}
export const PERFORMANCE_PROVIDER_NAME = 'performance';
export class PerformanceInstances {
    constructor() {
        return ɵgetAllInstancesOf(PERFORMANCE_PROVIDER_NAME);
    }
}
export const performanceInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(PERFORMANCE_PROVIDER_NAME))), distinct());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGVyZm9ybWFuY2UvcGVyZm9ybWFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNckQsTUFBTSxPQUFPLFdBQVc7SUFDdEIsWUFBWSxXQUFnQztRQUMxQyxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FBRyxhQUFhLENBQUM7QUFLdkQsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQjtRQUNFLE9BQU8sa0JBQWtCLENBQXNCLHlCQUF5QixDQUFDLENBQUM7SUFDNUUsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ3BELFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQXNCLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxFQUN6RixRQUFRLEVBQUUsQ0FDWCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRmlyZWJhc2VQZXJmb3JtYW5jZSB9IGZyb20gJ2ZpcmViYXNlL3BlcmZvcm1hbmNlJztcbmltcG9ydCB7IMm1Z2V0QWxsSW5zdGFuY2VzT2YgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IGZyb20sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGRpc3RpbmN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyBzZWUgbm90ZXMgaW4gY29yZS9maXJlYmFzZS5hcHAubW9kdWxlLnRzIGZvciB3aHkgd2UncmUgYnVpbGRpbmcgdGhlIGNsYXNzIGxpa2UgdGhpc1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5LWludGVyZmFjZVxuZXhwb3J0IGludGVyZmFjZSBQZXJmb3JtYW5jZSBleHRlbmRzIEZpcmViYXNlUGVyZm9ybWFuY2Uge31cblxuZXhwb3J0IGNsYXNzIFBlcmZvcm1hbmNlIHtcbiAgY29uc3RydWN0b3IocGVyZm9ybWFuY2U6IEZpcmViYXNlUGVyZm9ybWFuY2UpIHtcbiAgICByZXR1cm4gcGVyZm9ybWFuY2U7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IFBFUkZPUk1BTkNFX1BST1ZJREVSX05BTUUgPSAncGVyZm9ybWFuY2UnO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHktaW50ZXJmYWNlXG5leHBvcnQgaW50ZXJmYWNlIFBlcmZvcm1hbmNlSW5zdGFuY2VzIGV4dGVuZHMgQXJyYXk8RmlyZWJhc2VQZXJmb3JtYW5jZT4ge31cblxuZXhwb3J0IGNsYXNzIFBlcmZvcm1hbmNlSW5zdGFuY2VzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgcmV0dXJuIMm1Z2V0QWxsSW5zdGFuY2VzT2Y8RmlyZWJhc2VQZXJmb3JtYW5jZT4oUEVSRk9STUFOQ0VfUFJPVklERVJfTkFNRSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHBlcmZvcm1hbmNlSW5zdGFuY2UkID0gdGltZXIoMCwgMzAwKS5waXBlKFxuICBjb25jYXRNYXAoKCkgPT4gZnJvbSjJtWdldEFsbEluc3RhbmNlc09mPEZpcmViYXNlUGVyZm9ybWFuY2U+KFBFUkZPUk1BTkNFX1BST1ZJREVSX05BTUUpKSksXG4gIGRpc3RpbmN0KCksXG4pO1xuIl19