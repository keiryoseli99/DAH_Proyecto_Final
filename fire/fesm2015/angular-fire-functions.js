import * as i0 from '@angular/core';
import { InjectionToken, Optional, NgModule, NgZone, Injector } from '@angular/core';
import { ɵgetAllInstancesOf, ɵgetDefaultInstanceOf, VERSION, ɵAngularFireSchedulers, ɵzoneWrap } from '@angular/fire';
import { timer, from } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AuthInstances } from '@angular/fire/auth';
import { registerVersion } from 'firebase/app';
import { AppCheckInstances } from '@angular/fire/app-check';
import { httpsCallable as httpsCallable$1 } from 'rxfire/functions';
import { connectFunctionsEmulator as connectFunctionsEmulator$1, getFunctions as getFunctions$1, httpsCallable as httpsCallable$2 } from 'firebase/functions';
export * from 'firebase/functions';

class Functions {
    constructor(functions) {
        return functions;
    }
}
const FUNCTIONS_PROVIDER_NAME = 'functions';
class FunctionsInstances {
    constructor() {
        return ɵgetAllInstancesOf(FUNCTIONS_PROVIDER_NAME);
    }
}
const functionInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(FUNCTIONS_PROVIDER_NAME))), distinct());

const PROVIDED_FUNCTIONS_INSTANCES = new InjectionToken('angularfire2.functions-instances');
function defaultFunctionsInstanceFactory(provided, defaultApp) {
    const defaultAuth = ɵgetDefaultInstanceOf(FUNCTIONS_PROVIDER_NAME, provided, defaultApp);
    return defaultAuth && new Functions(defaultAuth);
}
function functionsInstanceFactory(fn) {
    return (zone, injector) => {
        const functions = zone.runOutsideAngular(() => fn(injector));
        return new Functions(functions);
    };
}
const FUNCTIONS_INSTANCES_PROVIDER = {
    provide: FunctionsInstances,
    deps: [
        [new Optional(), PROVIDED_FUNCTIONS_INSTANCES],
    ]
};
const DEFAULT_FUNCTIONS_INSTANCE_PROVIDER = {
    provide: Functions,
    useFactory: defaultFunctionsInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_FUNCTIONS_INSTANCES],
        FirebaseApp,
    ]
};
class FunctionsModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'fn');
    }
}
FunctionsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FunctionsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionsModule });
FunctionsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionsModule, providers: [
        DEFAULT_FUNCTIONS_INSTANCE_PROVIDER,
        FUNCTIONS_INSTANCES_PROVIDER,
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: FunctionsModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_FUNCTIONS_INSTANCE_PROVIDER,
                        FUNCTIONS_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: function () { return []; } });
function provideFunctions(fn, ...deps) {
    return {
        ngModule: FunctionsModule,
        providers: [{
                provide: PROVIDED_FUNCTIONS_INSTANCES,
                useFactory: functionsInstanceFactory(fn),
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

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const httpsCallableData = ɵzoneWrap(httpsCallable$1, true);

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
const connectFunctionsEmulator = ɵzoneWrap(connectFunctionsEmulator$1, true);
const getFunctions = ɵzoneWrap(getFunctions$1, true);
const httpsCallable = ɵzoneWrap(httpsCallable$2, true);

/**
 * Generated bundle index. Do not edit.
 */

export { Functions, FunctionsInstances, FunctionsModule, connectFunctionsEmulator, functionInstance$, getFunctions, httpsCallable, httpsCallableData, provideFunctions };
//# sourceMappingURL=angular-fire-functions.js.map
