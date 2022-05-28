import React from 'react'

const Filter = ({newFilter, handleFilterChange}) => {
    return (
     <form>
        <div>
            find countries <input value={newFilter} onChange={handleFilterChange} />
        </div>
     </form>
    )
}

export default Filter