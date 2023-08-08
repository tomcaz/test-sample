import { CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import { User } from "../user/user.component";

export const Users = ({users}) => (
    <CTable>
        <CTableHead>
            <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">User Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Country</CTableHeaderCell>
            <CTableHeaderCell scope="col">City</CTableHeaderCell>
            <CTableHeaderCell scope="col">Options</CTableHeaderCell>
            </CTableRow>
        </CTableHead>
        <CTableBody>
            {users.map((user, index) => (
                <User data={user} key={user.id} index={index} />
            ))}
        </CTableBody>
    </CTable>
)