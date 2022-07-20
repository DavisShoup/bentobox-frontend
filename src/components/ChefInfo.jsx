import { FaEnvelope, FaIdBadge } from 'react-icons/fa'

export default function ChefInfo({ chef }) {
  return (
    <>
        <h5 className="mt-5">Chef Information</h5>
        <ul className="list-group">
            <li className="list-group-item">
                <FaIdBadge className="icon" /> {chef.name}
            </li>
            <li className="list-group-item">
                <FaEnvelope className="icon" /> {chef.email}
            </li>
        </ul>
    </>
  )
}
