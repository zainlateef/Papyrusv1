import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class EditButtonService 
{
    editMode : boolean = false;
    @Output() change: EventEmitter<boolean> = new EventEmitter();

    toggle(){
        this.editMode=!this.editMode;
        this.change.emit(this.editMode);
    }

    reset()
    {
        console.log("reset");
        this.editMode=false;
        this.change.emit(this.editMode);
    }
    
}