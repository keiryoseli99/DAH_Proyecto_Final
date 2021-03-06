
import * as i0 from '@angular/core';
import { InjectionToken, PLATFORM_ID, Injectable, Inject, Optional, NgModule } from '@angular/core';
import { Subject, of, Observable, from, merge } from 'rxjs';
import { observeOn, switchMap, map, shareReplay, first, switchMapTo, subscribeOn, filter } from 'rxjs/operators';
import * as i1 from '@angular/fire';
import { keepUnstableUntilFirst, VERSION } from '@angular/fire';
import { ɵcacheInstance, ɵfirebaseAppFactory, ɵlazySDKProxy, FIREBASE_OPTIONS, FIREBASE_APP_NAME, ɵapplyMixins } from '@angular/fire/compat';
import { isPlatformServer } from '@angular/common';
import * as i2 from '@angular/fire/app-check';
import firebase from 'firebase/compat/app';

// DO NOT MODIFY, this file is autogenerated by tools/build.ts
// Export a null object with the same keys as firebase/compat/auth, so Proxy can work with proxy-polyfill in Internet Explorer
const proxyPolyfillCompat = {
    name: null,
    config: null,
    emulatorConfig: null,
    app: null,
    applyActionCode: null,
    checkActionCode: null,
    confirmPasswordReset: null,
    createUserWithEmailAndPassword: null,
    currentUser: null,
    fetchSignInMethodsForEmail: null,
    isSignInWithEmailLink: null,
    getRedirectResult: null,
    languageCode: null,
    settings: null,
    onAuthStateChanged: null,
    onIdTokenChanged: null,
    sendSignInLinkToEmail: null,
    sendPasswordResetEmail: null,
    setPersistence: null,
    signInAndRetrieveDataWithCredential: null,
    signInAnonymously: null,
    signInWithCredential: null,
    signInWithCustomToken: null,
    signInWithEmailAndPassword: null,
    signInWithPhoneNumber: null,
    signInWithEmailLink: null,
    signInWithPopup: null,
    signInWithRedirect: null,
    signOut: null,
    tenantId: null,
    updateCurrentUser: null,
    useDeviceLanguage: null,
    useEmulator: null,
    verifyPasswordResetCode: null,
};

const USE_EMULATOR = new InjectionToken('angularfire2.auth.use-emulator');
const SETTINGS = new InjectionToken('angularfire2.auth.settings');
const TENANT_ID = new InjectionToken('angularfire2.auth.tenant-id');
const LANGUAGE_CODE = new InjectionToken('angularfire2.auth.langugage-code');
const USE_DEVICE_LANGUAGE = new InjectionToken('angularfire2.auth.use-device-language');
const PERSISTENCE = new InjectionToken('angularfire.auth.persistence');
const ɵauthFactory = (app, zone, useEmulator, tenantId, languageCode, useDeviceLanguage, settings, persistence) => ɵcacheInstance(`${app.name}.auth`, 'AngularFireAuth', app.name, () => {
    const auth = zone.runOutsideAngular(() => app.auth());
    if (useEmulator) {
        auth.useEmulator(...useEmulator);
    }
    if (tenantId) {
        auth.tenantId = tenantId;
    }
    auth.languageCode = languageCode;
    if (useDeviceLanguage) {
        auth.useDeviceLanguage();
    }
    if (settings) {
        for (const [k, v] of Object.entries(settings)) {
            auth.settings[k] = v;
        }
    }
    if (persistence) {
        auth.setPersistence(persistence);
    }
    return auth;
}, [useEmulator, tenantId, languageCode, useDeviceLanguage, settings, persistence]);
class AngularFireAuth {
    constructor(options, name, 
    // tslint:disable-next-line:ban-types
    platformId, zone, schedulers, useEmulator, // can't use the tuple here
    settings, // can't use firebase.auth.AuthSettings here
    tenantId, languageCode, useDeviceLanguage, persistence, _appCheckInstances) {
        const logins = new Subject();
        const auth = of(undefined).pipe(observeOn(schedulers.outsideAngular), switchMap(() => zone.runOutsideAngular(() => import('firebase/compat/auth'))), map(() => ɵfirebaseAppFactory(options, zone, name)), map(app => ɵauthFactory(app, zone, useEmulator, tenantId, languageCode, useDeviceLanguage, settings, persistence)), shareReplay({ bufferSize: 1, refCount: false }));
        if (isPlatformServer(platformId)) {
            this.authState = this.user = this.idToken = this.idTokenResult = this.credential = of(null);
        }
        else {
            // HACK, as we're exporting auth.Auth, rather than auth, developers importing firebase.auth
            //       (e.g, `import { auth } from 'firebase/compat/app'`) are getting an undefined auth object unexpectedly
            //       as we're completely lazy. Let's eagerly load the Auth SDK here.
            //       There could potentially be race conditions still... but this greatly decreases the odds while
            //       we reevaluate the API.
            const _ = auth.pipe(first()).subscribe();
            const redirectResult = auth.pipe(switchMap(auth => auth.getRedirectResult().then(it => it, () => null)), keepUnstableUntilFirst, shareReplay({ bufferSize: 1, refCount: false }));
            const authStateChanged = auth.pipe(switchMap(auth => new Observable(sub => ({ unsubscribe: zone.runOutsideAngular(() => auth.onAuthStateChanged(next => sub.next(next), err => sub.error(err), () => sub.complete())) }))));
            const idTokenChanged = auth.pipe(switchMap(auth => new Observable(sub => ({ unsubscribe: zone.runOutsideAngular(() => auth.onIdTokenChanged(next => sub.next(next), err => sub.error(err), () => sub.complete())) }))));
            this.authState = redirectResult.pipe(switchMapTo(authStateChanged), subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
            this.user = redirectResult.pipe(switchMapTo(idTokenChanged), subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
            this.idToken = this.user.pipe(switchMap(user => user ? from(user.getIdToken()) : of(null)));
            this.idTokenResult = this.user.pipe(switchMap(user => user ? from(user.getIdTokenResult()) : of(null)));
            this.credential = merge(redirectResult, logins, 
            // pipe in null authState to make credential zipable, just a weird devexp if
            // authState and user go null to still have a credential
            this.authState.pipe(filter(it => !it))).pipe(
            // handle the { user: { } } when a user is already logged in, rather have null
            // TODO handle the type corcersion better
            map(credential => (credential === null || credential === void 0 ? void 0 : credential.user) ? credential : null), subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular));
        }
        return ɵlazySDKProxy(this, auth, zone, { spy: {
                apply: (name, _, val) => {
                    // If they call a signIn or createUser function listen into the promise
                    // this will give us the user credential, push onto the logins Subject
                    // to be consumed in .credential
                    if (name.startsWith('signIn') || name.startsWith('createUser')) {
                        // TODO fix the types, the trouble is UserCredential has everything optional
                        val.then((user) => logins.next(user));
                    }
                }
            } });
    }
}
AngularFireAuth.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireAuth, deps: [{ token: FIREBASE_OPTIONS }, { token: FIREBASE_APP_NAME, optional: true }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: i1.ɵAngularFireSchedulers }, { token: USE_EMULATOR, optional: true }, { token: SETTINGS, optional: true }, { token: TENANT_ID, optional: true }, { token: LANGUAGE_CODE, optional: true }, { token: USE_DEVICE_LANGUAGE, optional: true }, { token: PERSISTENCE, optional: true }, { token: i2.AppCheckInstances, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
AngularFireAuth.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireAuth, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireAuth, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [FIREBASE_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [FIREBASE_APP_NAME]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.NgZone }, { type: i1.ɵAngularFireSchedulers }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [USE_EMULATOR]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [SETTINGS]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [TENANT_ID]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [LANGUAGE_CODE]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [USE_DEVICE_LANGUAGE]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [PERSISTENCE]
                }] }, { type: i2.AppCheckInstances, decorators: [{
                    type: Optional
                }] }]; } });
ɵapplyMixins(AngularFireAuth, [proxyPolyfillCompat]);

class AngularFireAuthModule {
    constructor() {
        firebase.registerVersion('angularfire', VERSION.full, 'auth-compat');
    }
}
AngularFireAuthModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireAuthModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AngularFireAuthModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireAuthModule });
AngularFireAuthModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireAuthModule, providers: [AngularFireAuth] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireAuthModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [AngularFireAuth]
                }]
        }], ctorParameters: function () { return []; } });

/**
 * Generated bundle index. Do not edit.
 */

export { AngularFireAuth, AngularFireAuthModule, LANGUAGE_CODE, PERSISTENCE, SETTINGS, TENANT_ID, USE_DEVICE_LANGUAGE, USE_EMULATOR, ɵauthFactory };
//# sourceMappingURL=angular-fire-compat-auth.js.map
