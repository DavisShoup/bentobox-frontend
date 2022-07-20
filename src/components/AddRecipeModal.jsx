import { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_RECIPE } from '../mutations/recipeMutations';
import { GET_RECIPES } from "../queries/recipeQueries";
import { GET_CHEFS } from "../queries/chefQueries";

export default function AddRecipeModal() {
    const [name, setName] = useState('');
    const [steps, setSteps] = useState('');
    const [time, setTime] = useState('');
    const [chefId, setChefId] = useState('');

    const [addRecipe] = useMutation(ADD_RECIPE, {
        variables: { name, steps, time, chefId },
        update(cache, { data: { addRecipe } }) {
            const { recipes } = cache.readQuery({ query: GET_RECIPES });
            cache.writeQuery({
                query: GET_RECIPES,
                data: { recipes: recipes.concat([addRecipe])}
            });
        }
    })

    const { loading, error, data } = useQuery(GET_CHEFS);

    const onSubmit = (e) => {
        e.preventDefault();
        if (name === '' || steps === '' || time === '') {
            return alert('Please fill in all fields')
        }
        addRecipe(name, steps, time, chefId);
        setName('');
        setSteps('');
        setTime('');
        setChefId('');
    };

    if (loading) return null;
    if (error) return 'Error!';

    return (
        <>
            {!loading && !error && (
                <>
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addRecipeModal">
                        <div className="d-flex align-items-center">
                            <FaList className='icon' />
                            <div>New Recipe</div>
                        </div>
                    </button>

                    <div className="modal fade" id="addRecipeModal" aria-labelledby="addRecipeModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addRecipeModalLabel">New Recipe</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <label className='form-label'>Name</label>
                                            <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label'>Steps</label>
                                            <textarea className="form-control" id="steps" value={steps} onChange={(e) => setSteps(e.target.value)}></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label'>Cook Time</label>
                                            <input type="text" className="form-control" id="time" value={time} onChange={(e) => setTime(e.target.value)} />
                                        </div>
                                        <div className="mb-3">
                                            <label className='form-label'>Select</label>
                                            <select id="chefId" className="form-select" value={chefId} onChange={(e) => setChefId(e.target.value)}>
                                                <option value="">Select Chef</option>
                                                {data.chefs.map((chef) => (
                                                    <option key={chef.id} value={chef.id}>
                                                        {chef.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}