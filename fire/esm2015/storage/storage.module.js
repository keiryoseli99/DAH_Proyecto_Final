import { NgModule, Optional, NgZone, InjectionToken, Injector } from '@angular/core';
import { ɵgetDefaultInstanceOf, ɵAngularFireSchedulers, VERSION } from '@angular/fire';
import { Storage, StorageInstances, STORAGE_PROVIDER_NAME } from './storage';
import { FirebaseApps, FirebaseApp } from '@angular/fire/app';
import { AuthInstances } from '@angular/fire/auth';
import { registerVersion } from 'firebase/app';
import { AppCheckInstances } from '@angular/fire/app-check';
import * as i0 from "@angular/core";
export const PROVIDED_STORAGE_INSTANCES = new InjectionToken('angularfire2.storage-instances');
export function defaultStorageInstanceFactory(provided, defaultApp) {
    const defaultStorage = ɵgetDefaultInstanceOf(STORAGE_PROVIDER_NAME, provided, defaultApp);
    return defaultStorage && new Storage(defaultStorage);
}
export function storageInstanceFactory(fn) {
    return (zone, injector) => {
        const storage = zone.runOutsideAngular(() => fn(injector));
        return new Storage(storage);
    };
}
const STORAGE_INSTANCES_PROVIDER = {
    provide: StorageInstances,
    deps: [
        [new Optional(), PROVIDED_STORAGE_INSTANCES],
    ]
};
const DEFAULT_STORAGE_INSTANCE_PROVIDER = {
    provide: Storage,
    useFactory: defaultStorageInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_STORAGE_INSTANCES],
        FirebaseApp,
    ]
};
export class StorageModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'gcs');
    }
}
StorageModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StorageModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
StorageModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StorageModule });
StorageModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StorageModule, providers: [
        DEFAULT_STORAGE_INSTANCE_PROVIDER,
        STORAGE_INSTANCES_PROVIDER,
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: StorageModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_STORAGE_INSTANCE_PROVIDER,
                        STORAGE_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: function () { return []; } });
export function provideStorage(fn, ...deps) {
    return {
        ngModule: StorageModule,
        providers: [{
                provide: PROVIDED_STORAGE_INSTANCES,
                useFactory: storageInstanceFactory(fn),
                multi: true,
                deps: [
                    NgZone,
                    Injector,
                    ɵAngularFireSchedulers,
                    FirebaseApps,
                    // Defensively load Auth first, if provided
                    [new Optional(), AuthInstances],
                    [new Optional(), AppCheckInstances],
                    ...deps,
                ]
            }]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3RvcmFnZS9zdG9yYWdlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFMUcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RixPQUFPLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLHFCQUFxQixFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDOUQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRTVELE1BQU0sQ0FBQyxNQUFNLDBCQUEwQixHQUFHLElBQUksY0FBYyxDQUFZLGdDQUFnQyxDQUFDLENBQUM7QUFFMUcsTUFBTSxVQUFVLDZCQUE2QixDQUFDLFFBQXFDLEVBQUUsVUFBdUI7SUFDMUcsTUFBTSxjQUFjLEdBQUcscUJBQXFCLENBQWtCLHFCQUFxQixFQUFFLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzRyxPQUFPLGNBQWMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN2RCxDQUFDO0FBRUQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLEVBQTJDO0lBQ2hGLE9BQU8sQ0FBQyxJQUFZLEVBQUUsUUFBa0IsRUFBRSxFQUFFO1FBQzFDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMzRCxPQUFPLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLDBCQUEwQixHQUFHO0lBQ2pDLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsSUFBSSxFQUFFO1FBQ0osQ0FBQyxJQUFJLFFBQVEsRUFBRSxFQUFFLDBCQUEwQixDQUFFO0tBQzlDO0NBQ0YsQ0FBQztBQUVGLE1BQU0saUNBQWlDLEdBQUc7SUFDeEMsT0FBTyxFQUFFLE9BQU87SUFDaEIsVUFBVSxFQUFFLDZCQUE2QjtJQUN6QyxJQUFJLEVBQUU7UUFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsMEJBQTBCLENBQUU7UUFDN0MsV0FBVztLQUNaO0NBQ0YsQ0FBQztBQVFGLE1BQU0sT0FBTyxhQUFhO0lBQ3hCO1FBQ0UsZUFBZSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3RELENBQUM7OzBHQUhVLGFBQWE7MkdBQWIsYUFBYTsyR0FBYixhQUFhLGFBTGI7UUFDVCxpQ0FBaUM7UUFDakMsMEJBQTBCO0tBQzNCOzJGQUVVLGFBQWE7a0JBTnpCLFFBQVE7bUJBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULGlDQUFpQzt3QkFDakMsMEJBQTBCO3FCQUMzQjtpQkFDRjs7QUFPRCxNQUFNLFVBQVUsY0FBYyxDQUFDLEVBQXlCLEVBQUUsR0FBRyxJQUFXO0lBQ3RFLE9BQU87UUFDTCxRQUFRLEVBQUUsYUFBYTtRQUN2QixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsMEJBQTBCO2dCQUNuQyxVQUFVLEVBQUUsc0JBQXNCLENBQUMsRUFBRSxDQUFDO2dCQUN0QyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUU7b0JBQ0osTUFBTTtvQkFDTixRQUFRO29CQUNSLHNCQUFzQjtvQkFDdEIsWUFBWTtvQkFDWiwyQ0FBMkM7b0JBQzNDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxhQUFhLENBQUU7b0JBQ2hDLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSxpQkFBaUIsQ0FBRTtvQkFDcEMsR0FBRyxJQUFJO2lCQUNSO2FBQ0YsQ0FBQztLQUNILENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE9wdGlvbmFsLCBOZ1pvbmUsIEluamVjdGlvblRva2VuLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3RvciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmlyZWJhc2VTdG9yYWdlIH0gZnJvbSAnZmlyZWJhc2Uvc3RvcmFnZSc7XG5pbXBvcnQgeyDJtWdldERlZmF1bHRJbnN0YW5jZU9mLCDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycywgVkVSU0lPTiB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUnO1xuaW1wb3J0IHsgU3RvcmFnZSwgU3RvcmFnZUluc3RhbmNlcywgU1RPUkFHRV9QUk9WSURFUl9OQU1FIH0gZnJvbSAnLi9zdG9yYWdlJztcbmltcG9ydCB7IEZpcmViYXNlQXBwcywgRmlyZWJhc2VBcHAgfSBmcm9tICdAYW5ndWxhci9maXJlL2FwcCc7XG5pbXBvcnQgeyBBdXRoSW5zdGFuY2VzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZS9hdXRoJztcbmltcG9ydCB7IHJlZ2lzdGVyVmVyc2lvbiB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBBcHBDaGVja0luc3RhbmNlcyB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvYXBwLWNoZWNrJztcblxuZXhwb3J0IGNvbnN0IFBST1ZJREVEX1NUT1JBR0VfSU5TVEFOQ0VTID0gbmV3IEluamVjdGlvblRva2VuPFN0b3JhZ2VbXT4oJ2FuZ3VsYXJmaXJlMi5zdG9yYWdlLWluc3RhbmNlcycpO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdFN0b3JhZ2VJbnN0YW5jZUZhY3RvcnkocHJvdmlkZWQ6IEZpcmViYXNlU3RvcmFnZVtdfHVuZGVmaW5lZCwgZGVmYXVsdEFwcDogRmlyZWJhc2VBcHApIHtcbiAgY29uc3QgZGVmYXVsdFN0b3JhZ2UgPSDJtWdldERlZmF1bHRJbnN0YW5jZU9mPEZpcmViYXNlU3RvcmFnZT4oU1RPUkFHRV9QUk9WSURFUl9OQU1FLCBwcm92aWRlZCwgZGVmYXVsdEFwcCk7XG4gIHJldHVybiBkZWZhdWx0U3RvcmFnZSAmJiBuZXcgU3RvcmFnZShkZWZhdWx0U3RvcmFnZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9yYWdlSW5zdGFuY2VGYWN0b3J5KGZuOiAoaW5qZWN0b3I6IEluamVjdG9yKSA9PiBGaXJlYmFzZVN0b3JhZ2UpIHtcbiAgcmV0dXJuICh6b25lOiBOZ1pvbmUsIGluamVjdG9yOiBJbmplY3RvcikgPT4ge1xuICAgIGNvbnN0IHN0b3JhZ2UgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGZuKGluamVjdG9yKSk7XG4gICAgcmV0dXJuIG5ldyBTdG9yYWdlKHN0b3JhZ2UpO1xuICB9O1xufVxuXG5jb25zdCBTVE9SQUdFX0lOU1RBTkNFU19QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogU3RvcmFnZUluc3RhbmNlcyxcbiAgZGVwczogW1xuICAgIFtuZXcgT3B0aW9uYWwoKSwgUFJPVklERURfU1RPUkFHRV9JTlNUQU5DRVMgXSxcbiAgXVxufTtcblxuY29uc3QgREVGQVVMVF9TVE9SQUdFX0lOU1RBTkNFX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBTdG9yYWdlLFxuICB1c2VGYWN0b3J5OiBkZWZhdWx0U3RvcmFnZUluc3RhbmNlRmFjdG9yeSxcbiAgZGVwczogW1xuICAgIFtuZXcgT3B0aW9uYWwoKSwgUFJPVklERURfU1RPUkFHRV9JTlNUQU5DRVMgXSxcbiAgICBGaXJlYmFzZUFwcCxcbiAgXVxufTtcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgREVGQVVMVF9TVE9SQUdFX0lOU1RBTkNFX1BST1ZJREVSLFxuICAgIFNUT1JBR0VfSU5TVEFOQ0VTX1BST1ZJREVSLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JhZ2VNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICByZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAnZ2NzJyk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByb3ZpZGVTdG9yYWdlKGZuOiAoKSA9PiBGaXJlYmFzZVN0b3JhZ2UsIC4uLmRlcHM6IGFueVtdKTogTW9kdWxlV2l0aFByb3ZpZGVyczxTdG9yYWdlTW9kdWxlPiB7XG4gIHJldHVybiB7XG4gICAgbmdNb2R1bGU6IFN0b3JhZ2VNb2R1bGUsXG4gICAgcHJvdmlkZXJzOiBbe1xuICAgICAgcHJvdmlkZTogUFJPVklERURfU1RPUkFHRV9JTlNUQU5DRVMsXG4gICAgICB1c2VGYWN0b3J5OiBzdG9yYWdlSW5zdGFuY2VGYWN0b3J5KGZuKSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgICAgZGVwczogW1xuICAgICAgICBOZ1pvbmUsXG4gICAgICAgIEluamVjdG9yLFxuICAgICAgICDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgICAgICAgRmlyZWJhc2VBcHBzLFxuICAgICAgICAvLyBEZWZlbnNpdmVseSBsb2FkIEF1dGggZmlyc3QsIGlmIHByb3ZpZGVkXG4gICAgICAgIFtuZXcgT3B0aW9uYWwoKSwgQXV0aEluc3RhbmNlcyBdLFxuICAgICAgICBbbmV3IE9wdGlvbmFsKCksIEFwcENoZWNrSW5zdGFuY2VzIF0sXG4gICAgICAgIC4uLmRlcHMsXG4gICAgICBdXG4gICAgfV1cbiAgfTtcbn1cbiJdfQ==