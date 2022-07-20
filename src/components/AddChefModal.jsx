import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { ADD_CHEF } from '../mutations/chefMutations';
import { GET_CHEFS } from "../queries/chefQueries";

export default function AddChefModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [addChef] = useMutation(ADD_CHEF, {
        variables: { name, email },
        update(cache, { data: { addChef } } ) {
            const { chefs } = cache.readQuery({ query: GET_CHEFS });
            cache.writeQuery({
                query: GET_CHEFS,
                data: { chefs: chefs.concat([addChef])},
            });
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if(name === '' || email === '') {
            return alert('Please fill in all fields')
        }
        addChef(name, email);
        setName('');
        setEmail('');
    }

    return (
        <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addChefModal">
                <div className="d-flex align-items-center">
                    <FaUser className='icon' />
                    <div>Add Chef</div>
                </div>
            </button>

            <div className="modal fade" id="addChefModal" aria-labelledby="addChefModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addChefModalLabel">Add Chef</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmit}>
                                <div className="mb-3">
                                    <label className='form-label'>Name</label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={ (e) => setName(e.target.value)}/>
                                </div>
                                <div className="mb-3">
                                    <label className='form-label'>Email</label>
                                    <input type="text" className="form-control" id="email" value={email} onChange={ (e) => setEmail(e.target.value)}/>
                                </div>
                                <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
