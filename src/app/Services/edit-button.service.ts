import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class EditButtonService 
{
    editMode : boolean = false;
    @Output() editValueChange: EventEmitter<boolean> = new EventEmitter();

    toggle(){
        this.editMode=!this.editMode;
        this.editValueChange.emit(this.editMode);
    }

    reset()
    {
        console.log("reset");
        this.editMode=false;
        this.editValueChange.emit(this.editMode);
    }
    
}