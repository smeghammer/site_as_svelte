// see https://egghead.io/blog/learn-sveltekit-part-4-form-actions
import {fail} from '@sveltejs/kit';
import {error} from "@sveltejs/kit";
/** @type {import('./$types').Actions} */ //needs to be inside comment?

/** expose the default page load data */
export async function load({params})  {
    try{
        const response = await fetch("http://localhost:8000/api/wads/details",{method:'GET'});
        const responseData = await response.json()
        return(responseData)
    }
    catch(err){
        console.error(`Error in load function for /: ${error}`);
    }
}

/** expose the action(s) that a form needs to access: */
export const actions = {

    // default : async ({request})=>{
    //     const formData = await request.formData()
    //     return {'test':'test'}
    // },
    // default : async ({request}) => {
    //     console.log('TESTING...')
    //     // get POSTed form data:
    //     const formData = await request.formData()

    //     // now extract data from the POSTed info: (TODO)
    //     console.log("form data:",formData)
    // }
    // the above is conceptually not right: I UPDATE the back-end and with the enhance, the load is RE-CALLED:
    update : async ({request}) => {
            console.log('TESTING UPDATE...',request)
            // get POSTed form data:
            const formData = await request.formData();
            console.log('TESTING UPDATE...',formData)
            let itemId = formData.get('entry');

            // and call external endpoint to get details:
            try{
                const response = await fetch("http://localhost:8000/api/edit/update",{
                    method:'POST',
                    headers:{'content-type':'application/json' },
                    body:JSON.stringify(formData) 
                });
                const responseData = await response.json()
                return(responseData)
            }
            catch(err){
                console.error(`Error in load function for /: ${error}`);
            }



            // now extract data from the POSTed info: (TODO)
            //console.log("form data:",formData)
            //return {'test2':itemId}
        },

        new : async ({request}) => {
            console.log('TESTING NEW...',request)
            // get POSTed form data:
            const formData = await request.formData()
            let itemId = formData.get('entry');

            // and call external endpoint to get details:
            try{
                const response = await fetch("http://localhost:8000/api/wad/id/"+itemId,{method:'GET'});
                const responseData = await response.json()
                return(responseData)
            }
            catch(err){
                console.error(`Error in load function for /: ${error}`);
            }



            // now extract data from the POSTed info: (TODO)
            //console.log("form data:",formData)
            //return {'test2':itemId}
        }

}