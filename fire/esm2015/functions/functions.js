import { ɵgetAllInstancesOf } from '@angular/fire';
import { from, timer } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
export class Functions {
    constructor(functions) {
        return functions;
    }
}
export const FUNCTIONS_PROVIDER_NAME = 'functions';
export class FunctionsInstances {
    constructor() {
        return ɵgetAllInstancesOf(FUNCTIONS_PROVIDER_NAME);
    }
}
export const functionInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(FUNCTIONS_PROVIDER_NAME))), distinct());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Z1bmN0aW9ucy9mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFNckQsTUFBTSxPQUFPLFNBQVM7SUFDcEIsWUFBWSxTQUE0QjtRQUN0QyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxXQUFXLENBQUM7QUFLbkQsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QjtRQUNFLE9BQU8sa0JBQWtCLENBQW9CLHVCQUF1QixDQUFDLENBQUM7SUFDeEUsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ2pELFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQW9CLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxFQUNyRixRQUFRLEVBQUUsQ0FDWCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRnVuY3Rpb25zIGFzIEZpcmViYXNlRnVuY3Rpb25zIH0gZnJvbSAnZmlyZWJhc2UvZnVuY3Rpb25zJztcbmltcG9ydCB7IMm1Z2V0QWxsSW5zdGFuY2VzT2YgfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IGZyb20sIHRpbWVyIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGRpc3RpbmN0IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG4vLyBzZWUgbm90ZXMgaW4gY29yZS9maXJlYmFzZS5hcHAubW9kdWxlLnRzIGZvciB3aHkgd2UncmUgYnVpbGRpbmcgdGhlIGNsYXNzIGxpa2UgdGhpc1xuLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWVtcHR5LWludGVyZmFjZVxuZXhwb3J0IGludGVyZmFjZSBGdW5jdGlvbnMgZXh0ZW5kcyBGaXJlYmFzZUZ1bmN0aW9ucyB7fVxuXG5leHBvcnQgY2xhc3MgRnVuY3Rpb25zIHtcbiAgY29uc3RydWN0b3IoZnVuY3Rpb25zOiBGaXJlYmFzZUZ1bmN0aW9ucykge1xuICAgIHJldHVybiBmdW5jdGlvbnM7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IEZVTkNUSU9OU19QUk9WSURFUl9OQU1FID0gJ2Z1bmN0aW9ucyc7XG5cbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1lbXB0eS1pbnRlcmZhY2VcbmV4cG9ydCBpbnRlcmZhY2UgRnVuY3Rpb25zSW5zdGFuY2VzIGV4dGVuZHMgQXJyYXk8RmlyZWJhc2VGdW5jdGlvbnM+IHt9XG5cbmV4cG9ydCBjbGFzcyBGdW5jdGlvbnNJbnN0YW5jZXMge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICByZXR1cm4gybVnZXRBbGxJbnN0YW5jZXNPZjxGaXJlYmFzZUZ1bmN0aW9ucz4oRlVOQ1RJT05TX1BST1ZJREVSX05BTUUpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBmdW5jdGlvbkluc3RhbmNlJCA9IHRpbWVyKDAsIDMwMCkucGlwZShcbiAgY29uY2F0TWFwKCgpID0+IGZyb20oybVnZXRBbGxJbnN0YW5jZXNPZjxGaXJlYmFzZUZ1bmN0aW9ucz4oRlVOQ1RJT05TX1BST1ZJREVSX05BTUUpKSksXG4gIGRpc3RpbmN0KCksXG4pO1xuIl19