import React, {useState, useEffect} from 'react'

const Sales = ({totalRev, weeklyRev, fetchSales}) => {

    const getSales = async () => fetchSales();

    useEffect(() => {
        getSales();
    }, [])

    return (
        <div style={{display: 'block', justifyContent: 'center', alignItems:'center', width:'100%', transform: 'translateY(20vh)'}}>
            <div style={{display:'flex', textAlign:'center', justifyContent:'center'}}>
                <p>Weekly Revenue: {weeklyRev}</p>
            </div>
            <div style={{display:'flex', textAlign:'center', justifyContent:'center'}}>
                <p>Total Revenue: {totalRev}</p>
            </div>
        </div>
    )
}

export default Sales
