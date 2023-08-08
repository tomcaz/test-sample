export const COUNTRIES = [
    {id: 0, name: 'USA', cities: [
        {id: 0, name: 'Las Vegas'},
        {id: 1, name: 'Chicago'},
    ]},
    {id: 1, name: 'CANADA', cities: [
        {id: 0, name: 'Ottawa'},
        {id: 1, name: 'Toronto'},
    ]},
]

export const FORM_STATE = {
    DEFAULT: 'DEFAULT', CREATE: 'CREATE', DELETE: 'DELETE'
}
export const FETCH_STATUS = {
    IDLE: 'IDLE',
    LOADING: 'LOADING',
    SUCCESSED: 'SUCCESSED',
    FAILED: 'FAILED'
}