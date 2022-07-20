import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { GET_RECIPE } from '../queries/recipeQueries';
import { UPDATE_RECIPE } from '../mutations/recipeMutations';

export default function EditRecipeForm({ recipe }) {
    const [name, setName] = useState(recipe.name);
    const [steps, setSteps] = useState(recipe.steps);
    const [time, setTime] = useState(recipe.time);

    const [updateRecipe] = useMutation(UPDATE_RECIPE, {
        variables: { id: recipe.id, name, steps, time},
        refetchQueries: [{ query: GET_RECIPE, variables: { id: recipe.id} }],
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if( !name || !steps || !time ) {
            return alert('Please fill in all fields')
        }

        updateRecipe(name, steps, time);
    };

    return (
        <div className='mt-5'>
            <h3>Edit Recipe</h3>
            <form onSubmit={ onSubmit }>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
