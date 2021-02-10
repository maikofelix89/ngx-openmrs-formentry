import { Injectable } from '@angular/core';
import { AfeFormControl, AfeFormArray, AfeFormGroup, AfeControlType } from '../../abstract-controls-extension';
import { QuestionBase } from '../question-models/question-base';
import { ValidationFactory } from '../form-factory/validation.factory';
import { HidersDisablersFactory } from './hiders-disablers.factory';
import { AlertsFactory } from './show-messages.factory';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
export class FormControlService {
    constructor(validationFactory, hidersDisablersFactory, alertsFactory) {
        this.alertsFactory = alertsFactory;
        this.controls = [];
        this.validationFactory = validationFactory;
        this.hidersDisablersFactory = hidersDisablersFactory;
    }
    generateControlModel(questionModel, parentControl, generateChildren, form) {
        if (questionModel instanceof QuestionBase) {
            if (questionModel.controlType === AfeControlType.AfeFormArray) {
                return this.generateFormArray(questionModel, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormGroup) {
                return this.generateFormGroupModel(questionModel, generateChildren, parentControl, form);
            }
            if (questionModel.controlType === AfeControlType.AfeFormControl) {
                return this.generateFormControl(questionModel, parentControl, form);
            }
        }
        return null;
    }
    generateFormGroupModel(question, generateChildren, parentControl, form) {
        const formGroup = new AfeFormGroup({});
        this.wireHidersDisablers(question, formGroup, form);
        this.wireAlerts(question, formGroup, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formGroup);
        }
        const asGroup = question;
        if (generateChildren && asGroup && asGroup.questions.length > 0) {
            this._generateFormGroupChildrenModel(asGroup.questions, formGroup, form);
        }
        return formGroup;
    }
    _generateFormGroupChildrenModel(questions, parentControl, form) {
        if (questions.length > 0) {
            questions.forEach((element) => {
                const generated = this.generateControlModel(element, parentControl, true, form);
                if (generated !== null) {
                    parentControl.addControl(element.key, generated);
                }
            });
        }
    }
    generateFormArray(question, parentControl, form) {
        const validators = this.validationFactory.getValidators(question, form);
        let formArray;
        if (validators && validators.length > 0) {
            formArray = new AfeFormArray([], validators[0]);
        }
        else {
            formArray = new AfeFormArray([]);
        }
        formArray.uuid = question.key;
        this.wireHidersDisablers(question, formArray, form);
        this.wireAlerts(question, formArray, form);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, formArray);
        }
        return formArray;
    }
    generateFormControl(question, parentControl, form) {
        const value = question.defaultValue || '';
        const validators = this.validationFactory.getValidators(question, form);
        const control = new AfeFormControl(value, validators);
        control.uuid = question.key;
        this.wireHidersDisablers(question, control, form);
        this.wireAlerts(question, control, form);
        this.wireCalculator(question, control, form ? form.dataSourcesContainer.dataSources : null);
        if (parentControl instanceof AfeFormGroup) {
            parentControl.setControl(question.key, control);
        }
        return control;
    }
    wireAlerts(question, control, form) {
        if (question.alert && question.alert !== '') {
            const alert = this.alertsFactory.getJsExpressionshowAlert(question, control, form);
            control.setAlertFn(alert);
        }
    }
    wireHidersDisablers(question, control, form) {
        if (question.hide && question.hide !== '') {
            const hider = this.hidersDisablersFactory.getJsExpressionHider(question, control, form);
            control.setHidingFn(hider);
        }
        if (question.disable && question.disable !== '') {
            const disable = this.hidersDisablersFactory.getJsExpressionDisabler(question, control, form);
            control.setDisablingFn(disable);
        }
    }
    wireCalculator(question, control, dataSource) {
        if (question.calculateExpression && question.calculateExpression !== '') {
            const helper = new JsExpressionHelper();
            const runner = new ExpressionRunner();
            const runnable = runner.getRunnable(question.calculateExpression, control, helper.helperFunctions, dataSource);
            // this functionality strictly assumes the calculateExpression function has been defined in the JsExpressionHelper class
            control.setCalculatorFn(runnable.run);
        }
    }
}
FormControlService.decorators = [
    { type: Injectable },
];
FormControlService.ctorParameters = () => [
    { type: ValidationFactory },
    { type: HidersDisablersFactory },
    { type: AlertsFactory }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1jb250cm9sLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLWNvbnRyb2wuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzNDLE9BQU8sRUFDTCxjQUFjLEVBQ2QsWUFBWSxFQUNaLFlBQVksRUFDWixjQUFjLEVBQ2YsTUFBTSxtQ0FBbUMsQ0FBQztBQUkzQyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFFaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDdkUsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRXhELE9BQU8sRUFDTCxnQkFBZ0IsRUFFakIsTUFBTSx3Q0FBd0MsQ0FBQztBQUNoRCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUdyRSxNQUFNO0lBS0osWUFDRSxpQkFBb0MsRUFDcEMsc0JBQThDLEVBQ3RDLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBUHRDLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFTWixJQUFJLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsSUFBSSxDQUFDLHNCQUFzQixHQUFHLHNCQUFzQixDQUFDO0lBQ3ZELENBQUM7SUFFRCxvQkFBb0IsQ0FDbEIsYUFBNEMsRUFDNUMsYUFBMkIsRUFDM0IsZ0JBQXlCLEVBQ3pCLElBQVc7UUFFWCxFQUFFLENBQUMsQ0FBQyxhQUFhLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMxQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsV0FBVyxLQUFL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QUNGLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbEMsQ0FBQztJQUNILENBQUM7SUFFTyxjQUFjLENBQ3BCLFFBQXNCLEVBQ3RCLE9BQXVCLEVBQ3ZCLFVBQWdCO1FBRWhCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsSUFBSSxRQUFRLENBQUMsbUJBQW1CLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4RSxNQUFNLE1BQU0sR0FBdUIsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO1lBQzVELE1BQU0sTUFBTSxHQUFxQixJQUFJLGdCQUFnQixFQUFFLENBQUM7WUFDeEQsTUFBTSxRQUFRLEdBQWEsTUFBTSxDQUFDLFdBQVcsQ0FDM0MsUUFBUSxDQUFDLG1CQUFtQixFQUM1QixPQUFPLEVBQ1AsTUFBTSxDQUFDLGVBQWUsRUFDdEIsVUFBVSxDQUNYLENBQUM7WUFDRix3SEFBd0g7WUFDeEgsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsQ0FBQztJQUNILENBQUM7OztZQXpMRixVQUFVOzs7WUFWRixpQkFBaUI7WUFDakIsc0JBQXNCO1lBQ3RCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7XG4gIEFmZUZvcm1Db250cm9sLFxuICBBZmVGb3JtQXJyYXksXG4gIEFmZUZvcm1Hcm91cCxcbiAgQWZlQ29udHJvbFR5cGVcbn0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcblxuaW1wb3J0IHsgTmVzdGVkUXVlc3Rpb24gfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9uZXN0ZWQtcXVlc3Rpb25zJztcblxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xuaW1wb3J0IHsgUXVlc3Rpb25Hcm91cCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9ncm91cC1xdWVzdGlvbic7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRmFjdG9yeSB9IGZyb20gJy4uL2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnknO1xuaW1wb3J0IHsgSGlkZXJzRGlzYWJsZXJzRmFjdG9yeSB9IGZyb20gJy4vaGlkZXJzLWRpc2FibGVycy5mYWN0b3J5JztcbmltcG9ydCB7IEFsZXJ0c0ZhY3RvcnkgfSBmcm9tICcuL3Nob3ctbWVzc2FnZXMuZmFjdG9yeSc7XG5pbXBvcnQgeyBGb3JtIH0gZnJvbSAnLi9mb3JtJztcbmltcG9ydCB7XG4gIEV4cHJlc3Npb25SdW5uZXIsXG4gIFJ1bm5hYmxlXG59IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvbkhlbHBlciB9IGZyb20gJy4uL2hlbHBlcnMvanMtZXhwcmVzc2lvbi1oZWxwZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRm9ybUNvbnRyb2xTZXJ2aWNlIHtcbiAgY29udHJvbHMgPSBbXTtcbiAgdmFsaWRhdGlvbkZhY3Rvcnk6IFZhbGlkYXRpb25GYWN0b3J5O1xuICBoaWRlcnNEaXNhYmxlcnNGYWN0b3J5OiBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHZhbGlkYXRpb25GYWN0b3J5OiBWYWxpZGF0aW9uRmFjdG9yeSxcbiAgICBoaWRlcnNEaXNhYmxlcnNGYWN0b3J5OiBIaWRlcnNEaXNhYmxlcnNGYWN0b3J5LFxuICAgIHByaXZhdGUgYWxlcnRzRmFjdG9yeTogQWxlcnRzRmFjdG9yeVxuICApIHtcbiAgICB0aGlzLnZhbGlkYXRpb25GYWN0b3J5ID0gdmFsaWRhdGlvbkZhY3Rvcnk7XG4gICAgdGhpcy5oaWRlcnNEaXNhYmxlcnNGYWN0b3J5ID0gaGlkZXJzRGlzYWJsZXJzRmFjdG9yeTtcbiAgfVxuXG4gIGdlbmVyYXRlQ29udHJvbE1vZGVsKFxuICAgIHF1ZXN0aW9uTW9kZWw6IFF1ZXN0aW9uQmFzZSB8IE5lc3RlZFF1ZXN0aW9uLFxuICAgIHBhcmVudENvbnRyb2w6IEFmZUZvcm1Hcm91cCxcbiAgICBnZW5lcmF0ZUNoaWxkcmVuOiBib29sZWFuLFxuICAgIGZvcm0/OiBGb3JtXG4gICk6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHtcbiAgICBpZiAocXVlc3Rpb25Nb2RlbCBpbnN0YW5jZW9mIFF1ZXN0aW9uQmFzZSkge1xuICAgICAgaWYgKHF1ZXN0aW9uTW9kZWwuY29udHJvbFR5cGUgPT09IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1BcnJheSkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1BcnJheShxdWVzdGlvbk1vZGVsLCBwYXJlbnRDb250cm9sLCBmb3JtKTtcbiAgICAgIH1cbiAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtR3JvdXApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGVGb3JtR3JvdXBNb2RlbChcbiAgICAgICAgICBxdWVzdGlvbk1vZGVsLFxuICAgICAgICAgIGdlbmVyYXRlQ2hpbGRyZW4sXG4gICAgICAgICAgcGFyZW50Q29udHJvbCxcbiAgICAgICAgICBmb3JtXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChxdWVzdGlvbk1vZGVsLmNvbnRyb2xUeXBlID09PSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0ZUZvcm1Db250cm9sKHF1ZXN0aW9uTW9kZWwsIHBhcmVudENvbnRyb2wsIGZvcm0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGdlbmVyYXRlRm9ybUdyb3VwTW9kZWwoXG4gICAgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICBnZW5lcmF0ZUNoaWxkcmVuOiBib29sZWFuLFxuICAgIHBhcmVudENvbnRyb2w/OiBBZmVGb3JtR3JvdXAsXG4gICAgZm9ybT86IEZvcm1cbiAgKTogQWZlRm9ybUdyb3VwIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSBuZXcgQWZlRm9ybUdyb3VwKHt9KTtcbiAgICB0aGlzLndpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb24sIGZvcm1Hcm91cCwgZm9ybSk7XG4gICAgdGhpcy53aXJlQWxlcnRzKHF1ZXN0aW9uLCBmb3JtR3JvdXAsIGZvcm0pO1xuICAgIGlmIChwYXJlbnRDb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUdyb3VwKSB7XG4gICAgICBwYXJlbnRDb250cm9sLnNldENvbnRyb2wocXVlc3Rpb24ua2V5LCBmb3JtR3JvdXApO1xuICAgIH1cblxuICAgIGNvbnN0IGFzR3JvdXAgPSBxdWVzdGlvbiBhcyBRdWVzdGlvbkdyb3VwO1xuXG4gICAgaWYgKGdlbmVyYXRlQ2hpbGRyZW4gJiYgYXNHcm91cCAmJiBhc0dyb3VwLnF1ZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLl9nZW5lcmF0ZUZvcm1Hcm91cENoaWxkcmVuTW9kZWwoYXNHcm91cC5xdWVzdGlvbnMsIGZvcm1Hcm91cCwgZm9ybSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZvcm1Hcm91cDtcbiAgfVxuXG4gIF9nZW5lcmF0ZUZvcm1Hcm91cENoaWxkcmVuTW9kZWwoXG4gICAgcXVlc3Rpb25zOiBRdWVzdGlvbkJhc2VbXSxcbiAgICBwYXJlbnRDb250cm9sOiBBZmVGb3JtR3JvdXAsXG4gICAgZm9ybT86IEZvcm1cbiAgKSB7XG4gICAgaWYgKHF1ZXN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICBxdWVzdGlvbnMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICBjb25zdCBnZW5lcmF0ZWQgPSB0aGlzLmdlbmVyYXRlQ29udHJvbE1vZGVsKFxuICAgICAgICAgIGVsZW1lbnQsXG4gICAgICAgICAgcGFyZW50Q29udHJvbCxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIGZvcm1cbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGdlbmVyYXRlZCAhPT0gbnVsbCkge1xuICAgICAgICAgIHBhcmVudENvbnRyb2wuYWRkQ29udHJvbChlbGVtZW50LmtleSwgZ2VuZXJhdGVkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2VuZXJhdGVGb3JtQXJyYXkoXG4gICAgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICBwYXJlbnRDb250cm9sPzogQWZlRm9ybUdyb3VwLFxuICAgIGZvcm0/OiBGb3JtXG4gICk6IEFmZUZvcm1BcnJheSB7XG4gICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZ2V0VmFsaWRhdG9ycyhxdWVzdGlvbiwgZm9ybSk7XG4gICAgbGV0IGZvcm1BcnJheTogQWZlRm9ybUFycmF5O1xuICAgIGlmICh2YWxpZGF0b3JzICYmIHZhbGlkYXRvcnMubGVuZ3RoID4gMCkge1xuICAgICAgZm9ybUFycmF5ID0gbmV3IEFmZUZvcm1BcnJheShbXSwgdmFsaWRhdG9yc1swXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1BcnJheSA9IG5ldyBBZmVGb3JtQXJyYXkoW10pO1xuICAgIH1cbiAgICBmb3JtQXJyYXkudXVpZCA9IHF1ZXN0aW9uLmtleTtcbiAgICB0aGlzLndpcmVIaWRlcnNEaXNhYmxlcnMocXVlc3Rpb24sIGZvcm1BcnJheSwgZm9ybSk7XG4gICAgdGhpcy53aXJlQWxlcnRzKHF1ZXN0aW9uLCBmb3JtQXJyYXksIGZvcm0pO1xuICAgIGlmIChwYXJlbnRDb250cm9sIGluc3RhbmNlb2YgQWZlRm9ybUdyb3VwKSB7XG4gICAgICBwYXJlbnRDb250cm9sLnNldENvbnRyb2wocXVlc3Rpb24ua2V5LCBmb3JtQXJyYXkpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtQXJyYXk7XG4gIH1cblxuICBnZW5lcmF0ZUZvcm1Db250cm9sKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgcGFyZW50Q29udHJvbD86IEFmZUZvcm1Hcm91cCxcbiAgICBmb3JtPzogRm9ybVxuICApOiBBZmVGb3JtQ29udHJvbCB7XG4gICAgY29uc3QgdmFsdWUgPSBxdWVzdGlvbi5kZWZhdWx0VmFsdWUgfHwgJyc7XG4gICAgY29uc3QgdmFsaWRhdG9ycyA9IHRoaXMudmFsaWRhdGlvbkZhY3RvcnkuZ2V0VmFsaWRhdG9ycyhxdWVzdGlvbiwgZm9ybSk7XG5cbiAgICBjb25zdCBjb250cm9sID0gbmV3IEFmZUZvcm1Db250cm9sKHZhbHVlLCB2YWxpZGF0b3JzKTtcbiAgICBjb250cm9sLnV1aWQgPSBxdWVzdGlvbi5rZXk7XG4gICAgdGhpcy53aXJlSGlkZXJzRGlzYWJsZXJzKHF1ZXN0aW9uLCBjb250cm9sLCBmb3JtKTtcbiAgICB0aGlzLndpcmVBbGVydHMocXVlc3Rpb24sIGNvbnRyb2wsIGZvcm0pO1xuICAgIHRoaXMud2lyZUNhbGN1bGF0b3IoXG4gICAgICBxdWVzdGlvbixcbiAgICAgIGNvbnRyb2wsXG4gICAgICBmb3JtID8gZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcyA6IG51bGxcbiAgICApO1xuXG4gICAgaWYgKHBhcmVudENvbnRyb2wgaW5zdGFuY2VvZiBBZmVGb3JtR3JvdXApIHtcbiAgICAgIHBhcmVudENvbnRyb2wuc2V0Q29udHJvbChxdWVzdGlvbi5rZXksIGNvbnRyb2wpO1xuICAgIH1cblxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgcHJpdmF0ZSB3aXJlQWxlcnRzKFxuICAgIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsXG4gICAgY29udHJvbDogQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwIHwgQWZlRm9ybUNvbnRyb2wsXG4gICAgZm9ybT86IEZvcm1cbiAgKSB7XG4gICAgaWYgKHF1ZXN0aW9uLmFsZXJ0ICYmIHF1ZXN0aW9uLmFsZXJ0ICE9PSAnJykge1xuICAgICAgY29uc3QgYWxlcnQgPSB0aGlzLmFsZXJ0c0ZhY3RvcnkuZ2V0SnNFeHByZXNzaW9uc2hvd0FsZXJ0KFxuICAgICAgICBxdWVzdGlvbixcbiAgICAgICAgY29udHJvbCxcbiAgICAgICAgZm9ybVxuICAgICAgKTtcbiAgICAgIGNvbnRyb2wuc2V0QWxlcnRGbihhbGVydCk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgd2lyZUhpZGVyc0Rpc2FibGVycyhcbiAgICBxdWVzdGlvbjogUXVlc3Rpb25CYXNlLFxuICAgIGNvbnRyb2w6IEFmZUZvcm1BcnJheSB8IEFmZUZvcm1Hcm91cCB8IEFmZUZvcm1Db250cm9sLFxuICAgIGZvcm0/OiBGb3JtXG4gICkge1xuICAgIGlmIChxdWVzdGlvbi5oaWRlICYmIHF1ZXN0aW9uLmhpZGUgIT09ICcnKSB7XG4gICAgICBjb25zdCBoaWRlciA9IHRoaXMuaGlkZXJzRGlzYWJsZXJzRmFjdG9yeS5nZXRKc0V4cHJlc3Npb25IaWRlcihcbiAgICAgICAgcXVlc3Rpb24sXG4gICAgICAgIGNvbnRyb2wsXG4gICAgICAgIGZvcm1cbiAgICAgICk7XG4gICAgICBjb250cm9sLnNldEhpZGluZ0ZuKGhpZGVyKTtcbiAgICB9XG5cbiAgICBpZiAocXVlc3Rpb24uZGlzYWJsZSAmJiBxdWVzdGlvbi5kaXNhYmxlICE9PSAnJykge1xuICAgICAgY29uc3QgZGlzYWJsZSA9IHRoaXMuaGlkZXJzRGlzYWJsZXJzRmFjdG9yeS5nZXRKc0V4cHJlc3Npb25EaXNhYmxlcihcbiAgICAgICAgcXVlc3Rpb24sXG4gICAgICAgIGNvbnRyb2wsXG4gICAgICAgIGZvcm1cbiAgICAgICk7XG4gICAgICBjb250cm9sLnNldERpc2FibGluZ0ZuKGRpc2FibGUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgd2lyZUNhbGN1bGF0b3IoXG4gICAgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSxcbiAgICBjb250cm9sOiBBZmVGb3JtQ29udHJvbCxcbiAgICBkYXRhU291cmNlPzogYW55XG4gICkge1xuICAgIGlmIChxdWVzdGlvbi5jYWxjdWxhdGVFeHByZXNzaW9uICYmIHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb24gIT09ICcnKSB7XG4gICAgICBjb25zdCBoZWxwZXI6IEpzRXhwcmVzc2lvbkhlbHBlciA9IG5ldyBKc0V4cHJlc3Npb25IZWxwZXIoKTtcbiAgICAgIGNvbnN0IHJ1bm5lcjogRXhwcmVzc2lvblJ1bm5lciA9IG5ldyBFeHByZXNzaW9uUnVubmVyKCk7XG4gICAgICBjb25zdCBydW5uYWJsZTogUnVubmFibGUgPSBydW5uZXIuZ2V0UnVubmFibGUoXG4gICAgICAgIHF1ZXN0aW9uLmNhbGN1bGF0ZUV4cHJlc3Npb24sXG4gICAgICAgIGNvbnRyb2wsXG4gICAgICAgIGhlbHBlci5oZWxwZXJGdW5jdGlvbnMsXG4gICAgICAgIGRhdGFTb3VyY2VcbiAgICAgICk7XG4gICAgICAvLyB0aGlzIGZ1bmN0aW9uYWxpdHkgc3RyaWN0bHkgYXNzdW1lcyB0aGUgY2FsY3VsYXRlRXhwcmVzc2lvbiBmdW5jdGlvbiBoYXMgYmVlbiBkZWZpbmVkIGluIHRoZSBKc0V4cHJlc3Npb25IZWxwZXIgY2xhc3NcbiAgICAgIGNvbnRyb2wuc2V0Q2FsY3VsYXRvckZuKHJ1bm5hYmxlLnJ1bik7XG4gICAgfVxuICB9XG59XG4iXX0=