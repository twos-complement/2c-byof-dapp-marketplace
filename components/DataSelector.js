import { useState, useContext, useEffect } from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components'

import { DEFAULT_TRUSTED_IDENTITIES_LISTS } from '../util/IDX'
import IDXContext from './contexts/idx'
import DataContext from './contexts/data'

const Wrapper = styled.div``

const DataSelector = () => {

  const [selectedTrustedIdentities, setSelectedTrustedIdentities] = useState(`PERSONAL`)
  const [loading, setLoading] = useState(false)
  const idx = useContext(IDXContext)
  const { data, setData } = useContext(DataContext)

  async function setValue(value) {
    setSelectedTrustedIdentities(value)
    setLoading(true)
    let trustedIdentities
    if (value === "PERSONAL") {
      // Load personal trusted identities from user's IDX:
      trustedIdentities = [idx.instance.id]
    } else {
      // Load a preset community trusted identities from IDX:
      trustedIdentities = value
    }
    // Load BYOFRecords:
    const BYOFRecordsLists = await idx.loadRecords({trustedIdentities, schemaName: "BYOFRecordsList"})
    const BYOFRecords = await idx.parseBYOFRecordsLists(BYOFRecordsLists)
    setData({ ...data, BYOFRecords })
    setLoading(false)
  }

  useEffect(() => {
    setValue(`PERSONAL`)
  }, [])

  return (
    <Wrapper>
      <FormControl variant="outlined">
        <InputLabel id="data-selector-label">Trusted Identities</InputLabel>
        <Select
          labelId="data-selector-label"
          id="data-selector"
          value={selectedTrustedIdentities}
          onChange={e => setValue(e.target.value)}
          label="Trusted Identities"
        >
        <MenuItem value={`PERSONAL`}>Personal IDX</MenuItem>
        {Object.keys(DEFAULT_TRUSTED_IDENTITIES_LISTS).map(listName => 
          <MenuItem key={listName} value={DEFAULT_TRUSTED_IDENTITIES_LISTS[listName]}>{listName}</MenuItem>
        )}
        </Select>
      </FormControl>
      {loading && <CircularProgress />}
    </Wrapper>
  )
}

export default DataSelector
