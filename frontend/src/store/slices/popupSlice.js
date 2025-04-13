import {createSlice} from "@reduxjs/toolkit"

const popupSlice=createSlice({
    name:"popup",
    initialState:{
        readBookPopup:false,
        recordBookPopup:false,
        addBookPopup:false,
        returnBookPopup:false
    },
    reducers:{
        togglereadBookPopup(state){
            state.readBookPopup=!state.readBookPopup
        },
        togglerecordBookPopup(state){
            state.recordBookPopup=!state.recordBookPopup
        },
        toggleaddBookPopup(state){
            state.addBookPopup=!state.addBookPopup
        },
        togglereturnBookPopup(state){
            state.returnBookPopup=!state.returnBookPopup
        }
    }
})

export const { togglereadBookPopup } = popupSlice.actions;
export const { togglerecordBookPopup } = popupSlice.actions;
export const { toggleaddBookPopup } = popupSlice.actions;
export const { togglereturnBookPopup } = popupSlice.actions;
export default popupSlice.reducer;