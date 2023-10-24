import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allFormValues: {},
  formName: ''
}

export const cardContainer = createSlice({
  name: 'cardContainer',
  initialState,
  reducers: {
    addFormValues: (state, action) => {
      state.allFormValues = action.payload
    },

    setFormName: (state, action)  => {
      state.formName = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addFormValues, setFormName } = cardContainer.actions

export default cardContainer.reducer