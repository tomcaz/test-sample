import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { getCountry } from "../../global/functions";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPencil } from '@coreui/icons';


export const User = ({data}) => {
    const country = getCountry(data.country);
    const city = country.cities.filter(c=> data.city === c.id)[0];
    return (
        <CTableRow>
            <CTableHeaderCell scope="row">{data.id}</CTableHeaderCell>
            <CTableDataCell>{data.name}</CTableDataCell>
            <CTableDataCell>{country.name}</CTableDataCell>
            <CTableDataCell>{city.name}</CTableDataCell>
            <CTableDataCell>
            <button className="btn btn-warning buttons" component="button" type="button" onClick={null} style={{marginRight: '8px'}}><CIcon icon={cilPencil} size="lg"/></button>    
            <button className="btn btn-danger buttons" component="button" type="button" onClick={null}><CIcon icon={cilTrash} size="lg"/></button>    
            </CTableDataCell>
        </CTableRow>
    )
}