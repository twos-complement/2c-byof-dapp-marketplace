import React, { useState } from 'react'

import DataContext from '../contexts/data'

const withData = WrappedComponent => {
  const DataComponent = props => {
    const [data, setData] = useState()

    return (
      <DataContext.Provider value={{
        data,
        setData
      }}>
        <WrappedComponent {...props}>
          {props.children}
        </WrappedComponent>
      </DataContext.Provider>
    )
  }

  return DataComponent
}

export default withData