import { createSlice } from '@reduxjs/toolkit'
import { State } from './types'

import functions from './latomic.slice.funciton'

export const initialLatomicState: State = {
  initialized: false,
}

const LatomicSlice = createSlice({
  name: 'Latomic',
  initialState: initialLatomicState,
  reducers: functions,
})

export const LatomicActions = LatomicSlice.actions

export default LatomicSlice.reducer
