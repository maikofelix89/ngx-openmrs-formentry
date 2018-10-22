/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
export var /** @type {?} */ MY_FORMATS = {
    parse: {
        dateInput: 'LL',
    },
    display: {
        dateInput: 'LL',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
    },
};
var NgxDateTimePickerComponent = /** @class */ (function () {
    function NgxDateTimePickerComponent() {
        this.selectedTime = moment().format();
        this.selectedDate = moment().format();
        this.loadInitial = false;
        this.showTimePicker = false;
        this.weeks = [0, 2, 4, 6, 8, 12, 16, 24];
        this.showTime = false;
        this.showWeeks = true;
        this.onDateChange = new EventEmitter();
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.onTimeSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ setDate = moment(this.selectedDate);
        var /** @type {?} */ setTime = $event;
        this.setDateTime(setDate, setTime);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.onDateSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ setDate = moment($event.value);
        var /** @type {?} */ setTime = this.selectedTime;
        var /** @type {?} */ dateString = this.setDateTime(setDate, setTime);
        var /** @type {?} */ selectedDate = $event.value;
        this.value = dateString;
    };
    /**
     * @param {?} status
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.toggleTimePicker = /**
     * @param {?} status
     * @return {?}
     */
    function (status) {
        this.showTimePicker = status;
        return;
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setCurrentTime = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ setDate = moment(this.selectedDate);
        var /** @type {?} */ currentTime = moment().format('HH:mm:ss');
        this.setDateTime(setDate, currentTime);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.weekSelect = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        var /** @type {?} */ dateToUse = moment(this.value).format();
        var /** @type {?} */ nextWeekDate = moment(dateToUse).add($event.value, 'weeks');
        var /** @type {?} */ nextWeekTime = dateToUse;
        this.setDateTime(nextWeekDate, nextWeekTime);
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.selectionChange = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        console.log('Week selected', $event);
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getWeekPickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime) {
            return 'col-sm-2 form-group';
        }
        return 'col-sm-3 form-group';
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getDatePickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        if (this.showTime === true) {
            return 'col-sm-8 form-group';
        }
        return 'col-sm-12 form-group';
    };
    /**
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.getTimePickerCssClass = /**
     * @return {?}
     */
    function () {
        if (this.showTime && this.showWeeks) {
            return 'col-sm-5 form-group';
        }
        if (this.showWeeks === true) {
            return 'col-sm-9 form-group';
        }
        return 'col-sm-4 form-group';
    };
    /**
     * @param {?} setDate
     * @param {?} setTime
     * @return {?}
     */
    NgxDateTimePickerComponent.prototype.setDateTime = /**
     * @param {?} setDate
     * @param {?} setTime
     * @return {?}
     */
    function (setDate, setTime) {
        var /** @type {?} */ newDate = moment(setDate).format('DD-MM-YYYY');
        var /** @type {?} */ newTime;
        if (this.showTime) {
            newTime = moment(setTime).format('HH:mm:ss');
        }
        else {
            newTime = '00:00:00';
        }
        var /** @type {?} */ newDateTime = moment(newDate + '' + newTime, 'DD-MM-YYYY HH:mm:ss');
        var /** @type {?} */ dateTimeString = moment(newDateTime).format();
        this.selectedDate = dateTimeString;
        this.selectedTime = dateTimeString;
        this.value = dateTimeString;
        this.onChange(this.value);
        return dateTimeString;
    };
    NgxDateTimePickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-date-time-picker',
                    template: "<div>\n  <div class=\"row\">\n    <div [class]=\"getDatePickerCssClass()\">\n      <div class=\"input-group\">\n        <input matInput \n              [matDatepicker]=\"picker\" \n              class=\"form-control\" \n              [value]=\"value\" \n              placeholder=\"Choose a date\" \n              (dateChange)=\"onDateSelect($event)\"\n              (click)=\"picker.open()\"\n              readonly\n        >\n        <mat-datepicker #picker disabled=\"false\"></mat-datepicker>\n        <mat-datepicker-toggle matSuffix [for]=\"picker\" class=\"input-group-btn\"></mat-datepicker-toggle>\n      </div>\n    </div>\n    <div [class]=\"getWeekPickerCssClass()\" *ngIf=\"showWeeks\">\n      <mat-select placeholder=\"Select Weeks\"  class=\"form-control\" name=\"weeks\" (selectionChange) =\"weekSelect($event)\">\n        <mat-option *ngFor=\"let count of weeks\" [value]=\"count\">\n          {{count}} Weeks\n        </mat-option>\n      </mat-select>\n    </div>\n    <div [class]=\"getTimePickerCssClass()\" *ngIf=\"showTime\">\n          <input type=\"text\" class=\"form-control\" [value]=\"value | date: 'shortTime'\" (focus)=\"toggleTimePicker(true)\" readonly placeholder=\"Select Time\"\n          />\n          <time-picker *ngIf=\"showTimePicker\" [initTime]=\"value\" [use12Hour]=\"true\" (onSelectTime)=\"onTimeSelect($event)\" (onTimePickerCancel)=\"toggleTimePicker($event)\"></time-picker>\n    </div>\n  </div>\n</div>\n\n",
                    styles: ["#time-section{display:inline-block}#ngx-atp-time-picker,#ngx-mat-form-field{width:100%}.up{bottom:100%!important;top:auto!important}.time-btn{margin-top:-20px}"],
                    providers: [
                        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
                        { provide: DateAdapter, useClass: MomentDateAdapter },
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(function () { return NgxDateTimePickerComponent; }),
                            multi: true
                        }
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxDateTimePickerComponent.propDecorators = {
        "weeks": [{ type: Input },],
        "modelValue": [{ type: Input },],
        "showTime": [{ type: Input },],
        "showWeeks": [{ type: Input },],
        "onDateChange": [{ type: Output },],
    };
    return NgxDateTimePickerComponent;
}());
export { NgxDateTimePickerComponent };
function NgxDateTimePickerComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NgxDateTimePickerComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NgxDateTimePickerComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NgxDateTimePickerComponent.propDecorators;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.selectedTime;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.selectedDate;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.loadInitial;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.value;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.showTimePicker;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.weeks;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.modelValue;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.showTime;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.showWeeks;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onDateChange;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onChange;
    /** @type {?} */
    NgxDateTimePickerComponent.prototype.onTouched;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LWRhdGUtdGltZS1waWNrZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uZ3gtZGF0ZS10aW1lLXBpY2tlci9uZ3gtZGF0ZS10aW1lLXBpY2tlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBd0IsaUJBQWlCLEVBQWUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0RixPQUFPLEVBQUUsV0FBVyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFDbEMscUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUV2QixNQUFNLENBQUMscUJBQU0sVUFBVSxHQUFHO0lBQ3RCLEtBQUssRUFBRTtRQUNILFNBQVMsRUFBRSxJQUFJO0tBQ2xCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxFQUFFLElBQUk7UUFDZixjQUFjLEVBQUUsVUFBVTtRQUMxQixhQUFhLEVBQUUsSUFBSTtRQUNuQixrQkFBa0IsRUFBRSxXQUFXO0tBQ2xDO0NBQ0osQ0FBQzs7OzRCQW1Ed0IsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFOzRCQUNqQixNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUU7MkJBQ2xCLEtBQUs7OEJBRUYsS0FBSztxQkFDRixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7d0JBRWxDLEtBQUs7eUJBQ0osSUFBSTs0QkFDQSxJ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QUFFLG83Q0FnQ2I7b0JBQ0csTUFBTSxFQUFFLENBQUMsaUtBQWlLLENBQUM7b0JBQzNLLFNBQVMsRUFBRTt3QkFDUCxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFO3dCQUNuRCxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLGlCQUFpQixFQUFFO3dCQUNyRDs0QkFDSSxPQUFPLEVBQUUsaUJBQWlCOzRCQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSwwQkFBMEIsRUFBMUIsQ0FBMEIsQ0FBQzs0QkFDekQsS0FBSyxFQUFFLElBQUk7eUJBQ2Q7cUJBQ0o7aUJBQ0o7Ozs7MEJBU0ksS0FBSzsrQkFDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSztpQ0FDTCxNQUFNOztxQ0E5RVg7O1NBa0VhLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBmb3J3YXJkUmVmLCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IERhdGVBZGFwdGVyLCBNQVRfREFURV9GT1JNQVRTIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY29yZSc7XG5pbXBvcnQgeyBNb21lbnREYXRlQWRhcHRlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsLW1vbWVudC1hZGFwdGVyJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmV4cG9ydCBjb25zdCBNWV9GT1JNQVRTID0ge1xuICAgIHBhcnNlOiB7XG4gICAgICAgIGRhdGVJbnB1dDogJ0xMJyxcbiAgICB9LFxuICAgIGRpc3BsYXk6IHtcbiAgICAgICAgZGF0ZUlucHV0OiAnTEwnLFxuICAgICAgICBtb250aFllYXJMYWJlbDogJ01NTSBZWVlZJyxcbiAgICAgICAgZGF0ZUExMXlMYWJlbDogJ0xMJyxcbiAgICAgICAgbW9udGhZZWFyQTExeUxhYmVsOiAnTU1NTSBZWVlZJyxcbiAgICB9LFxufTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZ3gtZGF0ZS10aW1lLXBpY2tlcicsXG4gICAgdGVtcGxhdGU6IGA8ZGl2PlxuICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgPGRpdiBbY2xhc3NdPVwiZ2V0RGF0ZVBpY2tlckNzc0NsYXNzKClcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxuICAgICAgICA8aW5wdXQgbWF0SW5wdXQgXG4gICAgICAgICAgICAgIFttYXREYXRlcGlja2VyXT1cInBpY2tlclwiIFxuICAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiIFxuICAgICAgICAgICAgICBbdmFsdWVdPVwidmFsdWVcIiBcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJDaG9vc2UgYSBkYXRlXCIgXG4gICAgICAgICAgICAgIChkYXRlQ2hhbmdlKT1cIm9uRGF0ZVNlbGVjdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInBpY2tlci5vcGVuKClcIlxuICAgICAgICAgICAgICByZWFkb25seVxuICAgICAgICA+XG4gICAgICAgIDxtYXQtZGF0ZXBpY2tlciAjcGlja2VyIGRpc2FibGVkPVwiZmFsc2VcIj48L21hdC1kYXRlcGlja2VyPlxuICAgICAgICA8bWF0LWRhdGVwaWNrZXItdG9nZ2xlIG1hdFN1ZmZpeCBbZm9yXT1cInBpY2tlclwiIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+PC9tYXQtZGF0ZXBpY2tlci10b2dnbGU+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IFtjbGFzc109XCJnZXRXZWVrUGlja2VyQ3NzQ2xhc3MoKVwiICpuZ0lmPVwic2hvd1dlZWtzXCI+XG4gICAgICA8bWF0LXNlbGVjdCBwbGFjZWhvbGRlcj1cIlNlbGVjdCBXZWVrc1wiICBjbGFzcz1cImZvcm0tY29udHJvbFwiIG5hbWU9XCJ3ZWVrc1wiIChzZWxlY3Rpb25DaGFuZ2UpID1cIndlZWtTZWxlY3QoJGV2ZW50KVwiPlxuICAgICAgICA8bWF0LW9wdGlvbiAqbmdGb3I9XCJsZXQgY291bnQgb2Ygd2Vla3NcIiBbdmFsdWVdPVwiY291bnRcIj5cbiAgICAgICAgICB7e2NvdW50fX0gV2Vla3NcbiAgICAgICAgPC9tYXQtb3B0aW9uPlxuICAgICAgPC9tYXQtc2VsZWN0PlxuICAgIDwvZGl2PlxuICAgIDxkaXYgW2NsYXNzXT1cImdldFRpbWVQaWNrZXJDc3NDbGFzcygpXCIgKm5nSWY9XCJzaG93VGltZVwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3ZhbHVlXT1cInZhbHVlIHwgZGF0ZTogJ3Nob3J0VGltZSdcIiAoZm9jdXMpPVwidG9nZ2xlVGltZVBpY2tlcih0cnVlKVwiIHJlYWRvbmx5IHBsYWNlaG9sZGVyPVwiU2VsZWN0IFRpbWVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPHRpbWUtcGlja2VyICpuZ0lmPVwic2hvd1RpbWVQaWNrZXJcIiBbaW5pdFRpbWVdPVwidmFsdWVcIiBbdXNlMTJIb3VyXT1cInRydWVcIiAob25TZWxlY3RUaW1lKT1cIm9uVGltZVNlbGVjdCgkZXZlbnQpXCIgKG9uVGltZVBpY2tlckNhbmNlbCk9XCJ0b2dnbGVUaW1lUGlja2VyKCRldmVudClcIj48L3RpbWUtcGlja2VyPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbjwvZGl2PlxuXG5gLFxuICAgIHN0eWxlczogW2AjdGltZS1zZWN0aW9ue2Rpc3BsYXk6aW5saW5lLWJsb2NrfSNuZ3gtYXRwLXRpbWUtcGlja2VyLCNuZ3gtbWF0LWZvcm0tZmllbGR7d2lkdGg6MTAwJX0udXB7Ym90dG9tOjEwMCUhaW1wb3J0YW50O3RvcDphdXRvIWltcG9ydGFudH0udGltZS1idG57bWFyZ2luLXRvcDotMjBweH1gXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgeyBwcm92aWRlOiBNQVRfREFURV9GT1JNQVRTLCB1c2VWYWx1ZTogTVlfRk9STUFUUyB9LFxuICAgICAgICB7IHByb3ZpZGU6IERhdGVBZGFwdGVyLCB1c2VDbGFzczogTW9tZW50RGF0ZUFkYXB0ZXIgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudCksXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZVxuICAgICAgICB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hEYXRlVGltZVBpY2tlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuXG4gICAgLy8gcHVibGljIGRhdGUgPSBuZXcgRm9ybUNvbnRyb2wobW9tZW50KCkpO1xuICAgIHB1YmxpYyBzZWxlY3RlZFRpbWUgPSBtb21lbnQoKS5mb3JtYXQoKTtcbiAgICBwdWJsaWMgc2VsZWN0ZWREYXRlID0gbW9tZW50KCkuZm9ybWF0KCk7XG4gICAgcHVibGljIGxvYWRJbml0aWFsID0gZmFsc2U7XG4gICAgcHVibGljIHZhbHVlO1xuICAgIHB1YmxpYyBzaG93VGltZVBpY2tlciA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHdlZWtzOiBudW1iZXJbXSA9IFswLCAyLCA0LCA2LCA4LCAxMiwgMTYsIDI0XTtcbiAgICBASW5wdXQoKSBtb2RlbFZhbHVlOiBhbnk7XG4gICAgQElucHV0KCkgc2hvd1RpbWUgPSBmYWxzZTtcbiAgICBASW5wdXQoKSBzaG93V2Vla3MgPSB0cnVlO1xuICAgIEBPdXRwdXQoKSBvbkRhdGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgICBwdWJsaWMgb25DaGFuZ2U6IGFueSA9ICgpID0+IHsgfTtcbiAgICBwdWJsaWMgb25Ub3VjaGVkOiBhbnkgPSAoKSA9PiB7IH07XG4gICAgcHVibGljIG5nT25Jbml0KCkge1xuXG4gICAgfVxuXG5cbiAgICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm4pIHtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbikge1xuXG4gICAgfVxuXG4gICAgcHVibGljIG9uVGltZVNlbGVjdCgkZXZlbnQpIHtcbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIGNvbnN0IHNldFRpbWUgPSAkZXZlbnQ7XG4gICAgICAgIHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uRGF0ZVNlbGVjdCgkZXZlbnQpIHtcblxuICAgICAgICBjb25zdCBzZXREYXRlID0gbW9tZW50KCRldmVudC52YWx1ZSk7XG4gICAgICAgIGNvbnN0IHNldFRpbWUgPSB0aGlzLnNlbGVjdGVkVGltZTtcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMuc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSk7XG5cbiAgICAgICAgY29uc3Qgc2VsZWN0ZWREYXRlID0gJGV2ZW50LnZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZVN0cmluZztcblxuICAgIH1cblxuICAgIHB1YmxpYyB0b2dnbGVUaW1lUGlja2VyKHN0YXR1czogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnNob3dUaW1lUGlja2VyID0gc3RhdHVzO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgc2V0Q3VycmVudFRpbWUoKSB7XG5cbiAgICAgICAgY29uc3Qgc2V0RGF0ZSA9IG1vbWVudCh0aGlzLnNlbGVjdGVkRGF0ZSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbW9tZW50KCkuZm9ybWF0KCdISDptbTpzcycpO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKHNldERhdGUsIGN1cnJlbnRUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgd2Vla1NlbGVjdCgkZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZGF0ZVRvVXNlID0gbW9tZW50KHRoaXMudmFsdWUpLmZvcm1hdCgpO1xuICAgICAgICBjb25zdCBuZXh0V2Vla0RhdGUgPSBtb21lbnQoZGF0ZVRvVXNlKS5hZGQoJGV2ZW50LnZhbHVlLCAnd2Vla3MnKTtcbiAgICAgICAgY29uc3QgbmV4dFdlZWtUaW1lID0gZGF0ZVRvVXNlO1xuICAgICAgICB0aGlzLnNldERhdGVUaW1lKG5leHRXZWVrRGF0ZSwgbmV4dFdlZWtUaW1lKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2VsZWN0aW9uQ2hhbmdlKCRldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZygnV2VlayBzZWxlY3RlZCcsICRldmVudCk7XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgZ2V0V2Vla1BpY2tlckNzc0NsYXNzKCkge1xuICAgICAgICBpZiAodGhpcy5zaG93VGltZSkge1xuICAgICAgICAgICAgcmV0dXJuICdjb2wtc20tMiBmb3JtLWdyb3VwJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ2NvbC1zbS0zIGZvcm0tZ3JvdXAnO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXREYXRlUGlja2VyQ3NzQ2xhc3MoKSB7XG4gICAgICAgIGlmICh0aGlzLnNob3dUaW1lICYmIHRoaXMuc2hvd1dlZWtzKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS01IGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1dlZWtzID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NvbC1zbS05IGZvcm0tZ3JvdXAnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTggZm9ybS1ncm91cCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdjb2wtc20tMTIgZm9ybS1ncm91cCc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFRpbWVQaWNrZXJDc3NDbGFzcygpIHtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUgJiYgdGhpcy5zaG93V2Vla3MpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTUgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zaG93V2Vla3MgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybiAnY29sLXNtLTkgZm9ybS1ncm91cCc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdjb2wtc20tNCBmb3JtLWdyb3VwJztcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0RGF0ZVRpbWUoc2V0RGF0ZSwgc2V0VGltZSkge1xuICAgICAgICBjb25zdCBuZXdEYXRlID0gbW9tZW50KHNldERhdGUpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xuICAgICAgICBsZXQgbmV3VGltZTtcbiAgICAgICAgaWYgKHRoaXMuc2hvd1RpbWUpIHtcbiAgICAgICAgICAgIG5ld1RpbWUgPSBtb21lbnQoc2V0VGltZSkuZm9ybWF0KCdISDptbTpzcycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3VGltZSA9ICcwMDowMDowMCc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3RGF0ZVRpbWUgPSBtb21lbnQobmV3RGF0ZSArICcnICsgbmV3VGltZSwgJ0RELU1NLVlZWVkgSEg6bW06c3MnKTtcbiAgICAgICAgY29uc3QgZGF0ZVRpbWVTdHJpbmcgPSBtb21lbnQobmV3RGF0ZVRpbWUpLmZvcm1hdCgpO1xuICAgICAgICB0aGlzLnNlbGVjdGVkRGF0ZSA9IGRhdGVUaW1lU3RyaW5nO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGltZSA9IGRhdGVUaW1lU3RyaW5nO1xuICAgICAgICB0aGlzLnZhbHVlID0gZGF0ZVRpbWVTdHJpbmc7XG4gICAgICAgIHRoaXMub25DaGFuZ2UodGhpcy52YWx1ZSk7XG5cbiAgICAgICAgcmV0dXJuIGRhdGVUaW1lU3RyaW5nO1xuXG5cbiAgICB9XG59XG4iXX0=