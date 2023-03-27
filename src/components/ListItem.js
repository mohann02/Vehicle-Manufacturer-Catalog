import './ListItem.css'
import axios from 'axios'

function ListItem({ car, search, carType }) {

    let isCarValid = true

    if (car['VehicleTypes'].length !== 1) {
        isCarValid = false
    } else {
        if (car['Mfr_CommonName'] === null) {
            isCarValid = false
        } else {
            // searching specific name in car names column
            let carName = `${car['Mfr_CommonName']}`.toLowerCase()
            if (carName.includes(search) && `${car['VehicleTypes'][0]["Name"]}`.includes(carType)) {
                isCarValid = true
            } else {
                isCarValid = false
            }
        }
    }

    function getDetails() {
        axios(`https://vpic.nhtsa.dot.gov/api//vehicles/GetManufacturerDetails/${car['Mfr_CommonName']}?format=json`)
            .then((res) => {
                let temp = res.data["Results"][0]
                let str = `${temp['Mfr_Name']}\n${temp['PrincipalFirstName']}\n${temp['Address']}\n${temp['StateProvince']}`
                alert(str)
            })
    }

    if (isCarValid) {
        return <tr onClick={getDetails}>
            <td>{car['Mfr_CommonName']}</td>
            <td>{car['Country']}</td>
            <td>{car['VehicleTypes'][0]["Name"]}</td>
        </tr>
    }

}

export default ListItem