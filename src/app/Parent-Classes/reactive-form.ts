import { OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms'
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

export abstract class ReactiveForm implements OnInit, OnDestroy {
    
    search: FormControl;
    subscription : any;
    
    ngOnInit() {
    this.search=new FormControl();
    this.subscription=this.search.valueChanges
        .debounceTime(200)
        .distinctUntilChanged()
        .subscribe( term => {
            this.onFormChange(term);
        });
    }

    abstract onFormChange(term)

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}