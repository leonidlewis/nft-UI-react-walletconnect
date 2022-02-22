import * as React from 'react'
import { State, LatomicProviderProps } from './types'
import reducer, { initialLatomicState } from './latomic.slice'

const LatomicExecutionStateContext = React.createContext<State | undefined>(undefined)
const LatomicExecutionDispatchContext = React.createContext<any | undefined>(undefined)

export function LatomicProvider({ children }: LatomicProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, initialLatomicState)
  return (
    <LatomicExecutionStateContext.Provider value={state}>
      <LatomicExecutionDispatchContext.Provider value={dispatch}>
        {children}
      </LatomicExecutionDispatchContext.Provider>
    </LatomicExecutionStateContext.Provider>
  )
}

const validContext = (name: string, value: any) => {
  if (value === undefined) {
    throw new Error(`${name} is not initialized`)
  }
  return value
}

export const useLatomicExecutionState = () =>
  validContext(
    'LatomicExecutionStateContext',
    React.useContext(LatomicExecutionStateContext),
  )

export const useLatomicExecutionDispatch = () =>
  validContext(
    'LatomicExecutionDispatchContext',
    React.useContext(LatomicExecutionDispatchContext),
  )
