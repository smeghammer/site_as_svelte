// see https://egghead.io/blog/learn-sveltekit-part-4-form-actions
import {fail} from '@sveltejs/kit';
import {error} from "@sveltejs/kit";
/** @type {import('./$types').Actions} */ //needs to be inside comment?

/** expose the default page load data */
export async function load({params})  {
    try{
        // const response = await fetch("http://localhost:8001/api/all/details",{method:'GET'});
        const response = await fetch("http://api:8000/api/all/details",{method:'GET'});
        const responseData = await response.json()
        return(responseData)
    }
    catch(err){
        console.error(`Error in load function for /: ${error}`);
    }
}

/** expose the action(s) that a form needs to access: */
export const actions = {

    update : async ({request}) => {
       // console.log('TESTING...',request)
        // get POSTed form data:
        const formData = await request.formData();

        // This bit is key do converting to a JSON body (from BTED):
        let jsonData = Object.fromEntries(formData.entries());
        
        // don't forget our list of items is displayed as a textarea, so I need to convert back into a 
        // proper array...
        const images = formData.get('allImages')?.toString().replaceAll(/\r/g,"").split("\n"); 
        jsonData['allImages'] = images;
        const jsonBody = JSON.stringify(jsonData)
        
        // and call external endpoint to get details:
        try{
            const response = await fetch("http://api:8000/api/edit/update",{
                method:'POST',
                headers:{'Content-Type':'application/json' },
                body: jsonBody
            });
        
            const responseData = await response.json()
            if(!response.ok){
               // console.log('[server:actions:update] bad response',response.ok)
                throw new Error(`Backend response = ${result}`);
            }
        }
        catch(err){
            console.error(`Error in update function for /update: ${error}`);
        }
    },

    new : async ({request}) => {
        // get POSTed form data:
        const formData = await request.formData();

        // This bit is key do converting to a JSON body (from BTED):
        let jsonData = Object.fromEntries(formData.entries());
        
        // don't forget our list of items is displayed as a textarea, so I need to convert back into a 
        // proper array...
        const images = formData.get('allImages')?.toString().replaceAll(/\r/g,"").split("\n"); 
        jsonData['allImages'] = images;
        const jsonBody = JSON.stringify(jsonData)
        
        // and call external endpoint to get details:
        try{
            const response = await fetch("http://api:8000/api/edit/add",{
                method:'POST',
                headers:{'Content-Type':'application/json' },
                body: jsonBody
            });

            const responseData = await response.json()
            
            if(!response.ok){
                console.log('[server:actions:update] bad response',response.ok)
                throw new Error(`Backend response = ${result}`);
            }
            return(responseData);
        }
        catch(err){
            console.error(`Error in update function for /add: ${error}`);
        }   
    }
}