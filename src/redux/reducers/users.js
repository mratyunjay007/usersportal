
export default function userReducer(state=[],action){
    switch(action.type){
        case "ADD_USERS": return action.payload.data;
        case "ADD_NEW_USER": return [action.payload].concat(state);                    
        case "UPDATE_USER":{ const newState=[...state];
             const index=newState.findIndex(user=> user.id===action.payload.id);
                                    if(index!==-1){
                                        newState.splice(index,1,action.payload);
                                    }
                                    return newState;}

        case "DELETE_USER": { const newState=[...state]; 
                            const index=newState.findIndex(user=> user.id===action.payload.id);
                                    if(index!==-1){
                                        newState.splice(index,1);
                                    }
                                    return newState;}
       default : return state;

    }
}