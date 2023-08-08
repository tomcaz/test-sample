import { CTableDataCell, CTableHeaderCell, CTableRow } from "@coreui/react";
import { getCountry } from "../../global/functions";
import CIcon from "@coreui/icons-react";
import { cilTrash, cilPencil } from '@coreui/icons';
import { deleteUser, editUser } from "../../reducers/user.slice";
import { useDispatch } from "react-redux";


export const User = ({data, index}) => {
    const dispatch = useDispatch()
    const country = getCountry(data.country);
    const city = country.cities.filter(c=> data.city === c.id)[0];
    const handleDelete = () => dispatch(deleteUser(data.id))
    const handleEdit = () => dispatch(editUser(data))
    return (
        <CTableRow>
            <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
            <CTableDataCell>{data.username}</CTableDataCell>
            <CTableDataCell>{country.name}</CTableDataCell>
            <CTableDataCell>{city.name}</CTableDataCell>
            <CTableDataCell>
            <button className="btn btn-warning buttons" component="button" type="button" onClick={handleEdit} style={{marginRight: '8px'}}><CIcon icon={cilPencil} size="lg"/></button>    
            <button className="btn btn-danger buttons" component="button" type="button" onClick={handleDelete}><CIcon icon={cilTrash} size="lg"/></button>    
            </CTableDataCell>
        </CTableRow>
    )
}