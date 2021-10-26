import { USERS_LIST,DELETE_USER, SECOND_USER_API } from "../../config"
import { deleteData, getData, postData, putData } from "../../lib"

export const getUsers=(dispatch)=>((payload)=>{
   return  getData(USERS_LIST)
    .then(r=>{  console.log("resposne",r); return r.json();})
    .then(r=>{console.log("resposne",r);
        dispatch({type:"ADD_USERS", payload:r});
        return true;
    })
    .catch(e=> console.log("error"));
})

export const createUser=(dispatch)=>((payload)=>{
    return postData(USERS_LIST,payload)
    .then(r=> {console.log("response",r);
        if(r.status===201){
        window.alert("new user added");
        dispatch({type:"ADD_NEW_USER",payload});
        return true;

    }else throw "error" 
}).catch(e=> {console.log(" create user error"); window.alert("operation failed , please try again")});
})

export const updateUser=(dispatch)=>((payload)=>{ console.log("pauload",payload);
   return putData(USERS_LIST,payload)
    .then(r=>{ console.log("response",r);
        if(r.status===200){
         window.alert("user updated");
          dispatch({type:"UPDATE_USER", payload});
          return true;
        }
    }).catch(e=>{ window.alert("operation failed , please try again"); console.log("update error",e);})
})

export const deleteUser=(dispatch)=>((payload)=>{
   return deleteData(SECOND_USER_API,payload) 
        .then(r=> { console.log("response",r);
        if(r.status===204){
            window.alert("user deleted");
            dispatch({ type: "DELETE_USER", payload});
            return true;
        }else throw "error"
    }).catch(e=>{
        window.alert("error try again");
         console.log(" delete error",e);
    })
})