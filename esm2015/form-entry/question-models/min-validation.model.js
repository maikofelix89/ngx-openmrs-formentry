import { ValidationModel } from './validation.model';
export class MinValidationModel extends ValidationModel {
    constructor(validations) {
        super(validations);
        const min = validations.min;
        this.min = +min;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLXZhbGlkYXRpb24ubW9kZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9taW4tdmFsaWRhdGlvbi5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsTUFBTSx5QkFBMEIsU0FBUSxlQUFlO0lBR3JELFlBQVksV0FBZ0I7UUFDMUIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ25CLE1BQU0sR0FBRyxHQUFRLFdBQVcsQ0FBQyxHQUFHLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuL3ZhbGlkYXRpb24ubW9kZWwnO1xuXG5leHBvcnQgY2xhc3MgTWluVmFsaWRhdGlvbk1vZGVsIGV4dGVuZHMgVmFsaWRhdGlvbk1vZGVsIHtcbiAgbWluOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IodmFsaWRhdGlvbnM6IGFueSkge1xuICAgIHN1cGVyKHZhbGlkYXRpb25zKTtcbiAgICBjb25zdCBtaW46IGFueSA9IHZhbGlkYXRpb25zLm1pbjtcbiAgICB0aGlzLm1pbiA9ICttaW47XG4gIH1cbn1cbiJdfQ==