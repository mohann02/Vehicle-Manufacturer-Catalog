import './MainPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ListItem from './ListItem'

function MainPage() {
    let [carList, setCarList] = useState([])
    let [carTypeList, setCarTypeList] = useState([])
    let [search, setSearch] = useState('')
    let [carType, setCarType] = useState('')
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('https://vpic.nhtsa.dot.gov/api//vehicles/getallmanufacturers/?format=json')
            .then(res => {
                setCarList(res.data['Results'])
                setLoading(false)
                // extract all car types
                let temp = res.data['Results'].map((item, index) => {
                    if (item['VehicleTypes'].length === 1) {
                        return item['VehicleTypes'][0]["Name"]
                    }
                })

                // make a set of cartypes, removing duplicates
                let set = new Set(temp)
                let arr = new Array(...set)
                // remove undefined value
                arr = arr.filter(item => {
                    if (item != undefined) {
                        return item
                    }
                })
                setCarTypeList([...arr])
            })
    }, [])

    return <div className="main-page">
        <div className='heading'>
            VEHICLE MANUFACTURERS
        </div>

        <div className='user-input-group'>
            <div className='search-name-bar'>
                Search:&nbsp;
                <input type='text'
                    onChange={(e) => {
                        setSearch(e.target.value.toLowerCase())
                    }} />
            </div>
            <div className='filter-bar'>
                Filter by Vehicle Type:&nbsp;
                <select onChange={(e) => {
                    if (e.target.value === 'All') {
                        setCarType('')
                    } else {
                        setCarType(e.target.value)
                    }
                }}>
                    <option>All</option>
                    {carTypeList.map((type, index) => {
                        return <option value={type}>{type}</option>
                    })}
                </select>
            </div>
        </div>

        {loading ? 'Loading, Please Wait \n (Api can be slow sometimes due to high traffic)' : <table className='info-table'>
            <thead>
                <tr>
                    <td>Name</td>
                    <td>Country</td>
                    <td>Type</td>
                </tr>
            </thead>
            <tbody>
                {carList.map((item, index) => {
                    return <ListItem key={index} car={item} search={search} carType={carType} />
                })}
            </tbody>
        </table>}


    </div>

}

export default MainPage