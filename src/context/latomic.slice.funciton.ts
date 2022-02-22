import { PayloadAction } from '@reduxjs/toolkit'
import { State } from './types'

const setInitialized = (state: State, action: PayloadAction<any>) => ({
  ...state,
  initialized: action.payload,
})

export default {
  setInitialized,
}
