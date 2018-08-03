import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class EditButtonService 
{
    editMode : boolean = false;
    isPageOwner : boolean = false;
    @Output() editValueChange: EventEmitter<boolean> = new EventEmitter();
    @Output() pageOwnerStatus: EventEmitter<boolean> = new EventEmitter();

    @Output() requestsForListOfLabels : EventEmitter<boolean> = new EventEmitter();
    @Output() listOfLabels : EventEmitter<string> = new EventEmitter();

    toggle(){
        this.editMode=!this.editMode;
        this.editValueChange.emit(this.editMode);
    }

    emitPageOwnerStatus(status)
    {
        this.isPageOwner=status
        this.pageOwnerStatus.emit(this.isPageOwner);
    }

    reset()
    {
        //console.log("reset");
        this.editMode=false;
        this.editValueChange.emit(this.editMode);
        this.isPageOwner=false
        this.emitPageOwnerStatus(this.isPageOwner);
    }
    
}