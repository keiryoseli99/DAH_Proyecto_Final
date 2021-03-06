import { stateChanges } from './state-changes';
import { fromRef } from '../observable/fromRef';
import { map, scan, skipWhile, withLatestFrom } from 'rxjs/operators';
export function auditTrail(query, events, scheduler) {
    const auditTrail$ = stateChanges(query, events)
        .pipe(scan((current, action) => [...current, action], []));
    return waitForLoaded(query, auditTrail$, scheduler);
}
function loadedData(query, scheduler) {
    // Create an observable of loaded values to retrieve the
    // known dataset. This will allow us to know what key to
    // emit the "whole" array at when listening for child events.
    return fromRef(query, 'value', 'on', scheduler)
        .pipe(map(data => {
        // Store the last key in the data set
        let lastKeyToLoad;
        // Loop through loaded dataset to find the last key
        data.payload.forEach(child => {
            lastKeyToLoad = child.key;
            return false;
        });
        // return data set and the current last key loaded
        return { data, lastKeyToLoad };
    }));
}
function waitForLoaded(query, action$, scheduler) {
    const loaded$ = loadedData(query, scheduler);
    return loaded$
        .pipe(withLatestFrom(action$), 
    // Get the latest values from the "loaded" and "child" datasets
    // We can use both datasets to form an array of the latest values.
    map(([loaded, actions]) => {
        // Store the last key in the data set
        const lastKeyToLoad = loaded.lastKeyToLoad;
        // Store all child keys loaded at this point
        const loadedKeys = actions.map(snap => snap.key);
        return { actions, lastKeyToLoad, loadedKeys };
    }), 
    // This is the magical part, only emit when the last load key
    // in the dataset has been loaded by a child event. At this point
    // we can assume the dataset is "whole".
    skipWhile(meta => meta.loadedKeys.indexOf(meta.lastKeyToLoad) === -1), 
    // Pluck off the meta data because the user only cares
    // to iterate through the snapshots
    map(meta => meta.actions));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaXQtdHJhaWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29tcGF0L2RhdGFiYXNlL2xpc3QvYXVkaXQtdHJhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFdEUsTUFBTSxVQUFVLFVBQVUsQ0FBSSxLQUFvQixFQUFFLE1BQXFCLEVBQUUsU0FBeUI7SUFDbEcsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFJLEtBQUssRUFBRSxNQUFNLENBQUM7U0FDL0MsSUFBSSxDQUNILElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQ3BELENBQUM7SUFDSixPQUFPLGFBQWEsQ0FBSSxLQUFLLEVBQUUsV0FBVyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFPRCxTQUFTLFVBQVUsQ0FBSSxLQUFvQixFQUFFLFNBQXlCO0lBQ3BFLHdEQUF3RDtJQUN4RCx3REFBd0Q7SUFDeEQsNkRBQTZEO0lBQzdELE9BQU8sT0FBTyxDQUFJLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQztTQUNqRCxJQUFJLENBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ1QscUNBQXFDO1FBQ3JDLElBQUksYUFBYSxDQUFDO1FBQ2xCLG1EQUFtRDtRQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMzQixhQUFhLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztZQUFDLE9BQU8sS0FBSyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsa0RBQWtEO1FBQ2xELE9BQU8sRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUM7SUFDakMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUNKLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBSSxLQUFvQixFQUFFLE9BQXdDLEVBQUUsU0FBeUI7SUFDakgsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFJLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNoRCxPQUFPLE9BQU87U0FDWCxJQUFJLENBQ0gsY0FBYyxDQUFDLE9BQU8sQ0FBQztJQUN2QiwrREFBK0Q7SUFDL0Qsa0VBQWtFO0lBQ2xFLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUU7UUFDeEIscUNBQXFDO1FBQ3JDLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUM7UUFDM0MsNENBQTRDO1FBQzVDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDaEQsQ0FBQyxDQUFDO0lBQ0YsNkRBQTZEO0lBQzdELGlFQUFpRTtJQUNqRSx3Q0FBd0M7SUFDeEMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLHNEQUFzRDtJQUN0RCxtQ0FBbUM7SUFDbkMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUMxQixDQUFDO0FBQ04sQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFuZ3VsYXJGaXJlQWN0aW9uLCBDaGlsZEV2ZW50LCBEYXRhYmFzZVF1ZXJ5LCBEYXRhU25hcHNob3QsIFNuYXBzaG90QWN0aW9uIH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBzdGF0ZUNoYW5nZXMgfSBmcm9tICcuL3N0YXRlLWNoYW5nZXMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU2NoZWR1bGVyTGlrZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZnJvbVJlZiB9IGZyb20gJy4uL29ic2VydmFibGUvZnJvbVJlZic7XG5cbmltcG9ydCB7IG1hcCwgc2Nhbiwgc2tpcFdoaWxlLCB3aXRoTGF0ZXN0RnJvbSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGF1ZGl0VHJhaWw8VD4ocXVlcnk6IERhdGFiYXNlUXVlcnksIGV2ZW50cz86IENoaWxkRXZlbnRbXSwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8U25hcHNob3RBY3Rpb248VD5bXT4ge1xuICBjb25zdCBhdWRpdFRyYWlsJCA9IHN0YXRlQ2hhbmdlczxUPihxdWVyeSwgZXZlbnRzKVxuICAgIC5waXBlKFxuICAgICAgc2NhbigoY3VycmVudCwgYWN0aW9uKSA9PiBbLi4uY3VycmVudCwgYWN0aW9uXSwgW10pXG4gICAgKTtcbiAgcmV0dXJuIHdhaXRGb3JMb2FkZWQ8VD4ocXVlcnksIGF1ZGl0VHJhaWwkLCBzY2hlZHVsZXIpO1xufVxuXG5pbnRlcmZhY2UgTG9hZGVkTWV0YWRhdGEge1xuICBkYXRhOiBBbmd1bGFyRmlyZUFjdGlvbjxEYXRhU25hcHNob3Q+O1xuICBsYXN0S2V5VG9Mb2FkOiBhbnk7XG59XG5cbmZ1bmN0aW9uIGxvYWRlZERhdGE8VD4ocXVlcnk6IERhdGFiYXNlUXVlcnksIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPExvYWRlZE1ldGFkYXRhPiB7XG4gIC8vIENyZWF0ZSBhbiBvYnNlcnZhYmxlIG9mIGxvYWRlZCB2YWx1ZXMgdG8gcmV0cmlldmUgdGhlXG4gIC8vIGtub3duIGRhdGFzZXQuIFRoaXMgd2lsbCBhbGxvdyB1cyB0byBrbm93IHdoYXQga2V5IHRvXG4gIC8vIGVtaXQgdGhlIFwid2hvbGVcIiBhcnJheSBhdCB3aGVuIGxpc3RlbmluZyBmb3IgY2hpbGQgZXZlbnRzLlxuICByZXR1cm4gZnJvbVJlZjxUPihxdWVyeSwgJ3ZhbHVlJywgJ29uJywgc2NoZWR1bGVyKVxuICAucGlwZShcbiAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAvLyBTdG9yZSB0aGUgbGFzdCBrZXkgaW4gdGhlIGRhdGEgc2V0XG4gICAgICBsZXQgbGFzdEtleVRvTG9hZDtcbiAgICAgIC8vIExvb3AgdGhyb3VnaCBsb2FkZWQgZGF0YXNldCB0byBmaW5kIHRoZSBsYXN0IGtleVxuICAgICAgZGF0YS5wYXlsb2FkLmZvckVhY2goY2hpbGQgPT4ge1xuICAgICAgICBsYXN0S2V5VG9Mb2FkID0gY2hpbGQua2V5OyByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgIC8vIHJldHVybiBkYXRhIHNldCBhbmQgdGhlIGN1cnJlbnQgbGFzdCBrZXkgbG9hZGVkXG4gICAgICByZXR1cm4geyBkYXRhLCBsYXN0S2V5VG9Mb2FkIH07XG4gICAgfSlcbiAgKTtcbn1cblxuZnVuY3Rpb24gd2FpdEZvckxvYWRlZDxUPihxdWVyeTogRGF0YWJhc2VRdWVyeSwgYWN0aW9uJDogT2JzZXJ2YWJsZTxTbmFwc2hvdEFjdGlvbjxUPltdPiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSkge1xuICBjb25zdCBsb2FkZWQkID0gbG9hZGVkRGF0YTxUPihxdWVyeSwgc2NoZWR1bGVyKTtcbiAgcmV0dXJuIGxvYWRlZCRcbiAgICAucGlwZShcbiAgICAgIHdpdGhMYXRlc3RGcm9tKGFjdGlvbiQpLFxuICAgICAgLy8gR2V0IHRoZSBsYXRlc3QgdmFsdWVzIGZyb20gdGhlIFwibG9hZGVkXCIgYW5kIFwiY2hpbGRcIiBkYXRhc2V0c1xuICAgICAgLy8gV2UgY2FuIHVzZSBib3RoIGRhdGFzZXRzIHRvIGZvcm0gYW4gYXJyYXkgb2YgdGhlIGxhdGVzdCB2YWx1ZXMuXG4gICAgICBtYXAoKFtsb2FkZWQsIGFjdGlvbnNdKSA9PiB7XG4gICAgICAgIC8vIFN0b3JlIHRoZSBsYXN0IGtleSBpbiB0aGUgZGF0YSBzZXRcbiAgICAgICAgY29uc3QgbGFzdEtleVRvTG9hZCA9IGxvYWRlZC5sYXN0S2V5VG9Mb2FkO1xuICAgICAgICAvLyBTdG9yZSBhbGwgY2hpbGQga2V5cyBsb2FkZWQgYXQgdGhpcyBwb2ludFxuICAgICAgICBjb25zdCBsb2FkZWRLZXlzID0gYWN0aW9ucy5tYXAoc25hcCA9PiBzbmFwLmtleSk7XG4gICAgICAgIHJldHVybiB7IGFjdGlvbnMsIGxhc3RLZXlUb0xvYWQsIGxvYWRlZEtleXMgfTtcbiAgICAgIH0pLFxuICAgICAgLy8gVGhpcyBpcyB0aGUgbWFnaWNhbCBwYXJ0LCBvbmx5IGVtaXQgd2hlbiB0aGUgbGFzdCBsb2FkIGtleVxuICAgICAgLy8gaW4gdGhlIGRhdGFzZXQgaGFzIGJlZW4gbG9hZGVkIGJ5IGEgY2hpbGQgZXZlbnQuIEF0IHRoaXMgcG9pbnRcbiAgICAgIC8vIHdlIGNhbiBhc3N1bWUgdGhlIGRhdGFzZXQgaXMgXCJ3aG9sZVwiLlxuICAgICAgc2tpcFdoaWxlKG1ldGEgPT4gbWV0YS5sb2FkZWRLZXlzLmluZGV4T2YobWV0YS5sYXN0S2V5VG9Mb2FkKSA9PT0gLTEpLFxuICAgICAgLy8gUGx1Y2sgb2ZmIHRoZSBtZXRhIGRhdGEgYmVjYXVzZSB0aGUgdXNlciBvbmx5IGNhcmVzXG4gICAgICAvLyB0byBpdGVyYXRlIHRocm91Z2ggdGhlIHNuYXBzaG90c1xuICAgICAgbWFwKG1ldGEgPT4gbWV0YS5hY3Rpb25zKVxuICAgICk7XG59XG4iXX0=