import React from 'react'

export default function Pagination(props) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(props.total / props.parPage); i++) {
        pageNumbers.push(i)
    }


    return (
        <nav aria-label="Page navigation">
            <ul className="pagination pagination-lg">
                {
                    
                }
                <li className="page-item disabled">
                    <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Précedent</a>
                </li>
                {pageNumbers.map(number => {
                    return (
                        <li key={number} className="page-item">
                            <a onClick={() => props.paginate(number)} className='page-link'>{number}</a>
                        </li>
                    )
                })}
                <li className="page-item">
                    <a className="page-link" href="#" tabindex="-1" aria-disabled="true">Suivant</a>
                </li>
            </ul>

        </nav>
    )
}
