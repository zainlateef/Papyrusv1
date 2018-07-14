import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class EditButtonService 
{
    editMode : boolean = false;
    @Output() change: EventEmitter<boolean> = new EventEmitter();

    toggle() {
        if(this.editMode)
            this.editMode=false
        else
        {
            //verify that you're on the right page (the users page) and that you are signed and authenticated
            this.editMode=true;
        }

        this.change.emit(this.editMode);
    }
    
}