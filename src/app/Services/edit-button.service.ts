import { Injectable, Output, EventEmitter } from "@angular/core";

@Injectable()
export class EditButtonService 
{
    editMode : boolean = false;
    isPageOwner : boolean = false;
    @Output() editValueChange: EventEmitter<boolean> = new EventEmitter();
    @Output() pageOwnerStatus: EventEmitter<boolean> = new EventEmitter();

    toggle(){
        this.editMode=!this.editMode;
        this.editValueChange.emit(this.editMode);
    }

    reset()
    {
        console.log("reset");
        this.editMode=false;
        this.editValueChange.emit(this.editMode);
        this.isPageOwner=false
        this.emitPageOwnerStatus(this.isPageOwner);
    }

    emitPageOwnerStatus(status)
    {
        this.isPageOwner=status
        this.pageOwnerStatus.emit(this.isPageOwner);
    }
    
}