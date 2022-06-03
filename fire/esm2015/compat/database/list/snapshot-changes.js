import { listChanges } from './changes';
import { validateEventsArray } from './utils';
export function snapshotChanges(query, events, scheduler) {
    events = validateEventsArray(events);
    return listChanges(query, events, scheduler);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25hcHNob3QtY2hhbmdlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb21wYXQvZGF0YWJhc2UvbGlzdC9zbmFwc2hvdC1jaGFuZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFeEMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTlDLE1BQU0sVUFBVSxlQUFlLENBQzdCLEtBQW9CLEVBQ3BCLE1BQXFCLEVBQ3JCLFNBQXlCO0lBRXpCLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyxPQUFPLFdBQVcsQ0FBSSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ2xELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTY2hlZHVsZXJMaWtlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBsaXN0Q2hhbmdlcyB9IGZyb20gJy4vY2hhbmdlcyc7XG5pbXBvcnQgeyBDaGlsZEV2ZW50LCBEYXRhYmFzZVF1ZXJ5LCBTbmFwc2hvdEFjdGlvbiB9IGZyb20gJy4uL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgdmFsaWRhdGVFdmVudHNBcnJheSB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gc25hcHNob3RDaGFuZ2VzPFQ+KFxuICBxdWVyeTogRGF0YWJhc2VRdWVyeSxcbiAgZXZlbnRzPzogQ2hpbGRFdmVudFtdLFxuICBzY2hlZHVsZXI/OiBTY2hlZHVsZXJMaWtlXG4pOiBPYnNlcnZhYmxlPFNuYXBzaG90QWN0aW9uPFQ+W10+IHtcbiAgZXZlbnRzID0gdmFsaWRhdGVFdmVudHNBcnJheShldmVudHMpO1xuICByZXR1cm4gbGlzdENoYW5nZXM8VD4ocXVlcnksIGV2ZW50cywgc2NoZWR1bGVyKTtcbn1cbiJdfQ==