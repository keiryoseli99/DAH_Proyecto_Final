import { asyncScheduler, Observable } from 'rxjs';
import { map, pairwise, startWith } from 'rxjs/operators';
function _fromRef(ref, scheduler = asyncScheduler) {
    return new Observable(subscriber => {
        let unsubscribe;
        if (scheduler != null) {
            scheduler.schedule(() => {
                unsubscribe = ref.onSnapshot({ includeMetadataChanges: true }, subscriber);
            });
        }
        else {
            unsubscribe = ref.onSnapshot({ includeMetadataChanges: true }, subscriber);
        }
        return () => {
            if (unsubscribe != null) {
                unsubscribe();
            }
        };
    });
}
export function fromRef(ref, scheduler) {
    return _fromRef(ref, scheduler);
}
export function fromDocRef(ref, scheduler) {
    return fromRef(ref, scheduler)
        .pipe(startWith(undefined), pairwise(), map(([priorPayload, payload]) => {
        if (!payload.exists) {
            return { payload, type: 'removed' };
        }
        if (!(priorPayload === null || priorPayload === void 0 ? void 0 : priorPayload.exists)) {
            return { payload, type: 'added' };
        }
        return { payload, type: 'modified' };
    }));
}
export function fromCollectionRef(ref, scheduler) {
    return fromRef(ref, scheduler).pipe(map(payload => ({ payload, type: 'query' })));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbVJlZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wYXQvZmlyZXN0b3JlL29ic2VydmFibGUvZnJvbVJlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBaUIsTUFBTSxNQUFNLENBQUM7QUFFakUsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUQsU0FBUyxRQUFRLENBQU8sR0FBaUIsRUFBRSxZQUEyQixjQUFjO0lBQ2xGLE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDakMsSUFBSSxXQUF1QixDQUFDO1FBQzVCLElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtZQUNyQixTQUFTLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtnQkFDdEIsV0FBVyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxXQUFXLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLHNCQUFzQixFQUFFLElBQUksRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzVFO1FBRUQsT0FBTyxHQUFHLEVBQUU7WUFDVixJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLFdBQVcsRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsT0FBTyxDQUFPLEdBQW9DLEVBQUUsU0FBeUI7SUFDM0YsT0FBTyxRQUFRLENBQWdCLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsTUFBTSxVQUFVLFVBQVUsQ0FBSSxHQUF5QixFQUFFLFNBQXlCO0lBQ2hGLE9BQU8sT0FBTyxDQUF5QixHQUFHLEVBQUUsU0FBUyxDQUFDO1NBQ25ELElBQUksQ0FDSCxTQUFTLENBQWlDLFNBQVMsQ0FBQyxFQUNwRCxRQUFRLEVBQUUsRUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsRUFBRSxFQUFFO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ25CLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO1NBQ3JDO1FBQ0QsSUFBSSxDQUFDLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLE1BQU0sQ0FBQSxFQUFFO1lBQ3pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDdkMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUksR0FBYSxFQUFFLFNBQXlCO0lBQzNFLE9BQU8sT0FBTyxDQUFzQixHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhc3luY1NjaGVkdWxlciwgT2JzZXJ2YWJsZSwgU2NoZWR1bGVyTGlrZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQWN0aW9uLCBEb2N1bWVudFJlZmVyZW5jZSwgRG9jdW1lbnRTbmFwc2hvdCwgUXVlcnksIFF1ZXJ5U25hcHNob3QsIFJlZmVyZW5jZSB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgbWFwLCBwYWlyd2lzZSwgc3RhcnRXaXRoIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5mdW5jdGlvbiBfZnJvbVJlZjxULCBSPihyZWY6IFJlZmVyZW5jZTxUPiwgc2NoZWR1bGVyOiBTY2hlZHVsZXJMaWtlID0gYXN5bmNTY2hlZHVsZXIpOiBPYnNlcnZhYmxlPFI+IHtcbiAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4ge1xuICAgIGxldCB1bnN1YnNjcmliZTogKCkgPT4gdm9pZDtcbiAgICBpZiAoc2NoZWR1bGVyICE9IG51bGwpIHtcbiAgICAgIHNjaGVkdWxlci5zY2hlZHVsZSgoKSA9PiB7XG4gICAgICAgIHVuc3Vic2NyaWJlID0gcmVmLm9uU25hcHNob3QoeyBpbmNsdWRlTWV0YWRhdGFDaGFuZ2VzOiB0cnVlIH0sIHN1YnNjcmliZXIpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVuc3Vic2NyaWJlID0gcmVmLm9uU25hcHNob3QoeyBpbmNsdWRlTWV0YWRhdGFDaGFuZ2VzOiB0cnVlIH0sIHN1YnNjcmliZXIpO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAodW5zdWJzY3JpYmUgIT0gbnVsbCkge1xuICAgICAgICB1bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZnJvbVJlZjxSLCBUPihyZWY6IERvY3VtZW50UmVmZXJlbmNlPFQ+IHwgUXVlcnk8VD4sIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpIHtcbiAgcmV0dXJuIF9mcm9tUmVmPHR5cGVvZiByZWYsIFI+KHJlZiwgc2NoZWR1bGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Eb2NSZWY8VD4ocmVmOiBEb2N1bWVudFJlZmVyZW5jZTxUPiwgc2NoZWR1bGVyPzogU2NoZWR1bGVyTGlrZSk6IE9ic2VydmFibGU8QWN0aW9uPERvY3VtZW50U25hcHNob3Q8VD4+PiB7XG4gIHJldHVybiBmcm9tUmVmPERvY3VtZW50U25hcHNob3Q8VD4sIFQ+KHJlZiwgc2NoZWR1bGVyKVxuICAgIC5waXBlKFxuICAgICAgc3RhcnRXaXRoPERvY3VtZW50U25hcHNob3Q8VD4sIHVuZGVmaW5lZD4odW5kZWZpbmVkKSxcbiAgICAgIHBhaXJ3aXNlKCksXG4gICAgICBtYXAoKFtwcmlvclBheWxvYWQsIHBheWxvYWRdKSA9PiB7XG4gICAgICAgIGlmICghcGF5bG9hZC5leGlzdHMpIHtcbiAgICAgICAgICByZXR1cm4geyBwYXlsb2FkLCB0eXBlOiAncmVtb3ZlZCcgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXByaW9yUGF5bG9hZD8uZXhpc3RzKSB7XG4gICAgICAgICAgcmV0dXJuIHsgcGF5bG9hZCwgdHlwZTogJ2FkZGVkJyB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHBheWxvYWQsIHR5cGU6ICdtb2RpZmllZCcgfTtcbiAgICAgIH0pXG4gICAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Db2xsZWN0aW9uUmVmPFQ+KHJlZjogUXVlcnk8VD4sIHNjaGVkdWxlcj86IFNjaGVkdWxlckxpa2UpOiBPYnNlcnZhYmxlPEFjdGlvbjxRdWVyeVNuYXBzaG90PFQ+Pj4ge1xuICByZXR1cm4gZnJvbVJlZjxRdWVyeVNuYXBzaG90PFQ+LCBUPihyZWYsIHNjaGVkdWxlcikucGlwZShtYXAocGF5bG9hZCA9PiAoeyBwYXlsb2FkLCB0eXBlOiAncXVlcnknIH0pKSk7XG59XG4iXX0=