import React from 'react'

const LabContext = React.createContext(true);

export const LabProvider = LabContext.Provider;
export const LabConsumer = LabContext.Consumer;

export default LabContext;